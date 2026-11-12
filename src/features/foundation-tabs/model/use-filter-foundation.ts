import qs from "qs";
import React from "react";
import { useRouter } from "@/i18n/navigation";

export const useFilterFoundation = (
  value: string | null,
  setValue: (value: string) => void,
) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!value) return;
    const params = qs.stringify(
      {
        tab: value || "about",
      },
      { arrayFormat: "comma", encode: false },
    );
    setValue(value || "about");
    router.push(`?${params}`, { scroll: false });
  }, [value]);
};
