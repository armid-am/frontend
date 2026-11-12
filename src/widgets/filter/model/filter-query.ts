import qs from "qs";
import React from "react";
import { useRouter } from "@/i18n/navigation";

interface Filter {
  province: string;
  category: string | null;
  subCategory: Set<string>;
  disabled?: boolean;
}

export const useFilterQuery = (filter: Filter) => {
  const router = useRouter();

  React.useEffect(() => {
    const params = qs.stringify(
      {
        province: filter.disabled ? "27" : filter.province || "27",
        category: filter.category ?? undefined,
        subcategory: Array.from(filter.subCategory),
      },
      { arrayFormat: "comma", encode: false },
    );
    const currentPath = window.location.pathname;
    window.history.replaceState(null, "", `${currentPath}?${params}`);
  }, [
    filter.category,
    filter.province,
    filter.disabled,
    filter.subCategory,
    router,
  ]);
};
