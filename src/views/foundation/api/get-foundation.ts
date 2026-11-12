import { fetchApi, ApiRouts } from "@/shared/api";

export const getFoundation = async (locale?: string) => {
  const data = await fetchApi(ApiRouts.FOUNDATION + `?locale=${locale}`, {
    next: { revalidate: 3600, tags: ["foundation"] },
  });
  return data;
};
