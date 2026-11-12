import { fetchApi, ApiRouts } from "@/shared/api";

export const getGallery = async (locale?: string) => {
  const data = await fetchApi(ApiRouts.GALLERY + `?locale=${locale}&depth=4`, {
    next: { revalidate: 3600, tags: ["gallery"] },
  });
  return data;
};
