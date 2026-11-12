import { fetchApi, ApiRouts } from "@/shared/api";
import { FooterDTO } from "../model/types";
import { getLocale } from "next-intl/server";

export const getFooter = async (): Promise<FooterDTO> => {
  const locale = getLocale();
  const data = await fetchApi(ApiRouts.FOOTER + `?locale=${locale}`, {
    next: { revalidate: 3600, tags: ["footer"] },
  });
  return data;
};
