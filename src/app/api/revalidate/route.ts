import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
//
// "max"     -> stale-while-revalidate. Первый запрос после ревалидации может ещё
//              показать старый контент; следующий будет свежий.
// "instant" -> следующий запрос блокируется и возвращает свежий контент сразу.
type Profile = "max" | "instant";

type Body = {
  tags?: string[];
  paths?: { path: string; type?: "page" | "layout" }[];
  profile?: Profile;
};

function isAuthorized(secret: string | null) {
  return (
    !!process.env.REVALIDATE_SECRET && secret === process.env.REVALIDATE_SECRET
  );
}

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: "unauthorized" },
    { status: 401 },
  );
}

function applyTag(tag: string, profile: Profile) {
  if (profile === "instant") {
    revalidateTag(tag, { expire: 0 });
  } else {
    revalidateTag(tag, "max");
  }
}

// GET /api/revalidate?secret=...&tag=home&profile=instant
// GET /api/revalidate?secret=...&path=/en/foundation
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  if (!isAuthorized(url.searchParams.get("secret"))) return unauthorized();

  const tag = url.searchParams.get("tag");
  const path = url.searchParams.get("path");
  const profile = (url.searchParams.get("profile") as Profile) ?? "instant";

  if (tag) applyTag(tag, profile);
  if (path) revalidatePath(path, "page");

  console.log(`[revalidate:GET] tag=${tag} path=${path} profile=${profile}`);
  return NextResponse.json({ ok: true, tag, path, profile });
}

// POST /api/revalidate
// headers: x-revalidate-secret: <secret>
// body:    { tags?, paths?, profile? }
export async function POST(req: NextRequest) {
  if (!isAuthorized(req.headers.get("x-revalidate-secret"))) {
    return unauthorized();
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid json" },
      { status: 400 },
    );
  }

  const profile = body.profile ?? "instant";
  const tags = (body.tags ?? []).filter((t) => typeof t === "string" && t);
  const paths = (body.paths ?? []).filter((p) => p?.path);

  tags.forEach((tag) => applyTag(tag, profile));
  paths.forEach(({ path, type }) => revalidatePath(path, type ?? "page"));

  console.log(
    `[revalidate:POST] profile=${profile} tags=[${tags.join(",")}] paths=[${paths.map((p) => p.path).join(",")}]`,
  );
  // 1
  return NextResponse.json({
    ok: true,
    profile,
    revalidatedTags: tags,
    revalidatedPaths: paths.map((p) => p.path),
  });
}
