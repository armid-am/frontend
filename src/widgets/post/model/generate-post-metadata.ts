import { Metadata } from "next";
import { getPoster } from "@/shared/lib/youtube";
import { getPost } from "@/widgets/post/api/get-post";
import { ApiRouts } from "@/shared/api";

export async function generatePostMetadata({
  params,
  page,
  apiUrl,
}: {
  params: Promise<{ locale: string; title: string }>;
  page: "foundation/update" | "foundation/report" | "gallery/video";
  apiUrl: keyof typeof ApiRouts;
}): Promise<Metadata> {
  const { title, locale } = await params;

  const dataPost = await getPost(locale, title, apiUrl);
  const decodedTitle = title ? decodeURIComponent(title) : "";
  const thumbnailPoster =
    getPoster(dataPost?.["url"] || dataPost?.["url-youtube-vudeo"]) ||
    dataPost?.image?.url;

  return {
    title: dataPost?.title,
    description: dataPost?.description,
    openGraph: {
      title: dataPost?.title,
      description: dataPost?.description,
      url: `https://www.armid.am/${locale}/${page}/${decodedTitle}`,
      images: thumbnailPoster
        ? [
            {
              url: thumbnailPoster,
              width: 1200,
              height: 800,
              alt: dataPost?.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: dataPost?.title,
      description: dataPost?.description,
      images: thumbnailPoster ? [thumbnailPoster] : [],
    },
  };
}
