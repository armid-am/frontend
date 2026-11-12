"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { useTranslations } from "next-intl";
import qs from "qs";
interface Props {
  className?: string;
  resetSubCategory?: () => void;
  resetCategory?: () => void;
  category?: string | null;
  province?: string | null;
}

export const FilterResetButton: React.FC<Props> = ({
  className,
  resetSubCategory,
  resetCategory,
  category,
  province,
}) => {
  const t = useTranslations("Gallery");
  const resetFilter = () => {
    resetSubCategory?.();
    resetCategory?.();
    // Сначала сбрасываем стор — аккордион закроется реактивно
    const params = qs.stringify(
      { province },
      { arrayFormat: "comma", encode: false, skipNulls: true },
    );
    const currentPath = window.location.pathname;
    window.history.replaceState(null, "", `${currentPath}?${params}`);
  };

  return (
    <button
      onClick={resetFilter}
      className={cn(
        "w-full text-start transition-all group text-[14px] font-semibold pr-10 inline-block uppercase leading-6 font-montserat tracking-[0.04em] p-4 cursor-pointer hover:bg-black/4",
        { "border-r-2 border-primary": !category },
        className,
      )}
    >
      <span
        className={cn(
          "block origin-left group-hover:scale-114 transition-all duration-300",
          { "text-primary scale-114": !category },
        )}
      >
        {t("allFilms")}
      </span>
    </button>
  );
};
