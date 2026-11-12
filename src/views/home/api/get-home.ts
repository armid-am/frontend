import { fetchApi, ApiRouts } from "@/shared/api";
import { HomeDTO } from "../model/types";
import { getLocale } from "next-intl/server";

export const getHome = async (): Promise<HomeDTO> => {
  const locale = await getLocale();
  const data = await fetchApi(ApiRouts.HOME + `?locale=${locale}&depth=2`, {
    next: { revalidate: 3600, tags: ["home"] },
  });

  return data;
};
