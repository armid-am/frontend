import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generatePageMetadata({
  params,
  page,
}: {
  params: Promise<{ locale: string }>;
  page: "gallery" | "foundation" | "donation" | "contact" | "";
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      url: `https://www.armid.am/${locale}/${page}`,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: `https://www.armid.am/og.jpg`,
          secureUrl: `https://www.armid.am/og.jpg`,
          width: 1800,
          height: 945,
          type: "image/jpeg",
          alt: "armid.am preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`https://www.armid.am/og.jpg`],
    },
  };
}
