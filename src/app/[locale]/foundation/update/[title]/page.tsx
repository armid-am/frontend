import { updatesBreadcrumbs } from "@/views/foundation";
import { Container } from "@ui";
import {
  Post,
  getPost,
  generatePostMetadata,
  buildPostJsonLd,
} from "@/widgets/post";
import { ParamsProps } from "@/shared/lib/types";
import { JsonLd } from "@/shared/ui/json-ld";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: ParamsProps) {
  return await generatePostMetadata({
    params,
    page: "foundation/update",
    apiUrl: "UPDATES",
  });
}

export default async function FoundationUpdatePage({ params }: ParamsProps) {
  const { title, locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const data = await getPost(locale, title, "UPDATES");

  const jsonLd = buildPostJsonLd({
    data,
    locale,
    title,
    path: "foundation/update",
    type: "BlogPosting",
    orgName: t("title"),
  });

  return (
    <Container className="mb-5 max-w-420">
      <JsonLd data={jsonLd} />
      <Post breadcrumbs={updatesBreadcrumbs} data={data} />
    </Container>
  );
}
