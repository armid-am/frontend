import { fetchApi, ApiRouts } from "@/shared/api";

export const getPost = async (
  locale: string,
  keyword: string,
  api: keyof typeof ApiRouts,
) => {
  const data = await fetchApi(
    ApiRouts[api] +
      `?locale=${locale}&where[keyword][equals]=${keyword?.replaceAll("-", " ")}`,
    {
      next: { revalidate: 3600, tags: ["foundation"] },
    },
  );
  return data.docs[0];
};
