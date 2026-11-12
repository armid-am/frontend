import { getLocale } from "next-intl/server";
import { getFoundation } from "../api/get-foundation";

export const getFoundationDetails = async () => {
  const locale = await getLocale();
  const data = await getFoundation(locale);
  const hero = data?.hero;
  const reports = data?.reports.map((item: any) => ({
    ...item,
    keyword: "/foundation/report/" + item.keyword.replaceAll(" ", "-"),
  }));
  const updates = data?.updates.map((item: any) => ({
    ...item,
    keyword: "/foundation/update/" + item.keyword.replaceAll(" ", "-"),
  }));
  const imgUrl =
    hero?.image && typeof hero.image !== "number"
      ? (hero.image as any).url
      : undefined;

  return {
    hero,
    reports,
    updates,
    imgUrl,
    data,
  };
};
