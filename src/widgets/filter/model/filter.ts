import { useProvinceStore } from "@/shared/lib/hooks";
import { useFilterQuery } from "./filter-query";
import { useFilterStore } from "./use-filter.store";
import { useSearchParam } from "react-use";

export const useFilter = (data: any[]) => {
  const searchParamsCategory = useSearchParam("category");
  const { activeProvince } = useProvinceStore();
  const province = String(activeProvince);
  const {
    setCategory,
    setSubCategory,
    subCategory,
    category,
    toggleSubCategory,
    resetSubCategory,
  } = useFilterStore();
  const disabled = data.find(
    (el: any) => el.id === Number(category || searchParamsCategory || 0),
  )?.disabled;
  const isKnownSubCategory = (name: string) =>
    data.some((cat) => cat.item.some((item: any) => item.title === name));

  const setActiveCategory = (value: string | null) => {
    const items = data.find((cat) => cat.id === Number(value))?.item ?? [];

    setCategory(value);
    setSubCategory(new Set(items.map((item: any) => String(item.id))));
  };
  useFilterQuery({ province, category, subCategory, disabled });

  return {
    data,
    category,
    subCategory,
    disabled,
    province,
    toggleSubCategory,
    isKnownSubCategory,
    setActiveCategory,
    resetSubCategory,
  };
};
