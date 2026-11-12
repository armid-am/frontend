import { fetchApi, ApiRouts } from "@/shared/api";

export const getDonors = async (locale?: string, limit: number = 10) => {
  const data = await fetchApi(
    ApiRouts.DONORS +
      `?locale=${locale}&limit=${limit}&where[donate][equals]=success`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );
  return data?.docs;
};
