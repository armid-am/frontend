// widgets/post/lib/build-post-json-ld.ts
import { getPoster } from "@/shared/lib/youtube";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://armid.am";

type PostBlock = { blockType: string; text?: string };

type PostData = {
  title?: string;
  description?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  url?: string;
  image?: { url?: string } | number | null;
  posts?: PostBlock[];
  [key: string]: unknown;
};

export type JsonLdType = "BlogPosting" | "NewsArticle" | "Article" | "Report";

type Params = {
  data: PostData;
  locale: string;
  title: string; // slug из params
  path: string; // например "foundation/update"
  type?: JsonLdType;
  orgName: string;
};

const toISO = (v?: string) => {
  const d = v ? new Date(v) : null;
  return d && !isNaN(d.getTime()) ? d.toISOString() : undefined;
};

const toAbsolute = (url: string) =>
  url.startsWith("http") ? url : `${SITE_URL}${url}`;

export function buildPostJsonLd({
  data,
  locale,
  title,
  path,
  type = "BlogPosting",
  orgName,
}: Params) {
  const imageUrl = typeof data.image === "object" ? data.image?.url : undefined;

  // обложка или постер с YouTube
  const cover: string | undefined =
    imageUrl ||
    getPoster(data.url || (data["url-youtube-vudeo"] as string | undefined)) ||
    undefined;

  const articleBody = data.posts
    ?.filter((b) => b.blockType === "text" && b.text)
    .map((b) => b.text)
    .join("\n");

  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: data.title,
    description: data.description,
    ...(cover && { image: toAbsolute(cover) }),
    datePublished: toISO(data.date) ?? toISO(data.createdAt),
    dateModified: toISO(data.updatedAt),
    inLanguage: locale,
    ...(articleBody && { articleBody }),
    author: { "@type": "Organization", name: orgName },
    publisher: {
      "@type": "Organization",
      name: orgName,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og.jpg` },
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/${path}/${title}`,
  };
}
