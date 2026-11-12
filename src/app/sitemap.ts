import { MetadataRoute } from "next";
import { ApiRouts, fetchApi } from "@/shared/api";

const DOMAIN = "https://www.armid.am";
const locales = ["hy", "ru", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];

  const staticPages = ["", "/foundation", "/gallery", "/contact", "/donation"];

  // =====================
  // STATIC PAGES
  // =====================
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${DOMAIN}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  // =====================
  // GALLERY DATA
  // =====================

  try {
    const data = await fetchApi(ApiRouts.VIDEO + "?locale=all");
    data?.docs?.forEach((item: any) => {
      locales.forEach((locale) => {
        sitemap.push({
          url: `${DOMAIN}/${locale}/gallery/video/${item.keyword
            .replaceAll(" ", "-")
            .toLowerCase()}`,
          lastModified: new Date(item.updatedAt || Date.now()),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    });
  } catch (error) {
    console.error(error);
  }

  // =====================
  // FOUNDATION DATA
  // =====================
  try {
    const data = await fetchApi(ApiRouts.FOUNDATION + "?locale=all");

    // UPDATES
    data?.updates?.forEach((item: any) => {
      if (!item?.keyword) return;

      locales.forEach((locale) => {
        sitemap.push({
          url: `${DOMAIN}/${locale}/foundation/update/${item.keyword
            .replaceAll(" ", "-")
            .toLowerCase()}`,
          lastModified: new Date(item.updatedAt || Date.now()),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    });

    // REPORTS
    data?.reports?.forEach((item: any) => {
      if (!item?.keyword) return;

      locales.forEach((locale) => {
        sitemap.push({
          url: `${DOMAIN}/${locale}/foundation/report/${item.keyword
            .replaceAll(" ", "-")
            .toLowerCase()}`,
          lastModified: new Date(item.updatedAt || Date.now()),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      });
    });
  } catch (e) {
    console.error("Foundation sitemap error:", e);
  }

  return sitemap;
}
