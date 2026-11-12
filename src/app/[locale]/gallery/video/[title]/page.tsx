import { breadcrumbsLinks } from "@/views/gallery";
import { Container } from "@ui";
import {
  Post,
  getPost,
  generatePostMetadata,
  buildVideoJsonLd,
} from "@/widgets/post";
import { ParamsProps } from "@/shared/lib/types";
import { JsonLd } from "@/shared/ui/json-ld";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: ParamsProps) {
  return await generatePostMetadata({
    params,
    page: "gallery/video",
    apiUrl: "VIDEO",
  });
}

export default async function GalleryVideoPage({ params }: ParamsProps) {
  const { title, locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const data = await getPost(locale, title, "VIDEO");

  const jsonLd = buildVideoJsonLd({
    data,
    locale,
    title,
    path: "gallery/video",
    orgName: t("title"),
  });

  return (
    <Container className="mb-5 max-w-420">
      <JsonLd data={jsonLd} />
      <Post breadcrumbs={breadcrumbsLinks} data={data} />
    </Container>
  );
}

// import { breadcrumbsLinks } from "@/views/gallery";
// import { Container } from "@ui";
// import { Post, getPost, generatePostMetadata } from "@/widgets/post";
// import { ParamsProps } from "@/shared/lib/types";

// export async function generateMetadata({ params }: ParamsProps) {
//   return await generatePostMetadata({
//     params,
//     page: "gallery/video",
//     apiUrl: "VIDEO",
//   });
// }

// export default async function GalleryVideoPage({ params }: ParamsProps) {
//   const { title, locale } = await params;

//   const data = await getPost(locale, title, "VIDEO");

//   return (
//     <Container className="mb-5 max-w-420">
//       <Post breadcrumbs={breadcrumbsLinks} data={data} />
//     </Container>
//   );
// }
