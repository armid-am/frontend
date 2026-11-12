"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { Accordion, AccordionItem } from "@ui";
import { FilterCategory } from "./filter-category";
import { FilterSubCategories } from "./filter-sub-categories";

interface Props {
  className?: string;
  data: any[];
  category: string | null;
  setCategory: (value: string | null) => void;
  subCategory: Set<string>;
  setSubCategory: (id: string) => void;
  isSubCategory: (name: string) => boolean;
}

export const FilterCheckboxGroup: React.FC<Props> = (props) => {
  const {
    className,
    data,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    isSubCategory,
  } = props;

  return (
    <Accordion
      type="single"
      collapsible
      value={category ?? ""}
      onValueChange={(value) => setCategory(value || null)}
      className="max-w-lg"
    >
      {data?.map((el) => (
        <AccordionItem
          key={el.id}
          value={el.id.toString()}
          className={cn(
            "border-b-0",
            category === el.id.toString() && "border-r-2 border-primary",
            className,
          )}
        >
          <FilterCategory
            iconClassName={isSubCategory(el.name) ? "hidden" : ""}
            item={el}
            activeCategory={category}
            setActiveCategory={setCategory}
          />

          {!isSubCategory(el.name) && (
            <FilterSubCategories
              selected={subCategory}
              setSelected={setSubCategory}
              el={el}
            />
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
