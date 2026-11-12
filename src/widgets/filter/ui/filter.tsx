"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { FilterCheckboxGroup } from "./filter-checkbox-group";
import { FilterResetButton } from "./filter-reset-button";
import { FadeInSection } from "@ui";
import { useFilter } from "../model/filter";
interface Props {
  className?: string;
  data: any[];
}

export const Filter: React.FC<Props> = ({ className, data }) => {
  const filter = useFilter(data);

  return (
    <FadeInSection
      threshold={0}
      className={cn(
        "lg:shadow-[inset_-1px_0px_0_rgba(0,0,0,0.2)] sticky top-25 overflow-auto! [scrollbar-width:none]",
        className,
      )}
    >
      <FadeInSection>
        <FilterResetButton
          category={filter.category}
          province={filter.province}
          resetSubCategory={filter.resetSubCategory}
          resetCategory={() => filter.setActiveCategory(null)}
        />
      </FadeInSection>
      <FilterCheckboxGroup
        data={data}
        isSubCategory={filter.isKnownSubCategory}
        subCategory={filter.subCategory}
        setSubCategory={filter.toggleSubCategory}
        category={filter.category}
        setCategory={filter.setActiveCategory}
      />
    </FadeInSection>
  );
};
