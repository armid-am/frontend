import { fetchApi, ApiRouts } from "@/shared/api";

export const getContact = async (locale?: string) => {
  const data = await fetchApi(ApiRouts.CONTACT_US + `?locale=${locale}`, {
    next: { revalidate: 3600, tags: ["contact"] },
  });
  return data;
};
