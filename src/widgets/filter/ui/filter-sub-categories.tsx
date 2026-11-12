"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { AccordionContent } from "@ui";
import { FilterCheckbox } from "./filter-checkbox";

interface Props {
  className?: string;
  el: any;
  setSelected: (id: string) => void;
  selected: Set<string>;
}

export const FilterSubCategories: React.FC<Props> = ({
  className,
  el,
  setSelected,
  selected,
}) => {
  return (
    <AccordionContent className={cn("pl-4", className)}>
      {el.item.map((item: any) => (
        <FilterCheckbox
          key={item.id}
          checked={selected.has(String(item.id))} // ← фикс: был new Set()
          setChecked={() => setSelected(String(item.id))}
          label={item.title}
          {...item}
        />
      ))}
    </AccordionContent>
  );
};
