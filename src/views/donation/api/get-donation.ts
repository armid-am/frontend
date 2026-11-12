import { fetchApi, ApiRouts } from "@/shared/api";

export const getDonation = async (locale?: string) => {
  const data = await fetchApi(ApiRouts.DONATION + `?locale=${locale}`, {
    next: { revalidate: 3600, tags: ["donation"] },
  });
  return data;
};
