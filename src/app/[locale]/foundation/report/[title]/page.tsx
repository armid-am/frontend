import { reportsBreadcrumbs } from "@/views/foundation";
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
    page: "foundation/report",
    apiUrl: "REPORTS",
  });
}

export default async function FoundationReportPage({ params }: ParamsProps) {
  const { title, locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const data = await getPost(locale, title, "REPORTS");

  const jsonLd = buildPostJsonLd({
    data,
    locale,
    title,
    path: "foundation/report",
    type: "Report",
    orgName: t("title"),
  });

  return (
    <Container className="mb-5 max-w-420">
      <JsonLd data={jsonLd} />
      <Post breadcrumbs={reportsBreadcrumbs} data={data} />
    </Container>
  );
}
