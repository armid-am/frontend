"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { AccordionTrigger } from "@ui";
import { CaretDownIcon } from "@phosphor-icons/react";
import { FadeInSection } from "@ui";

interface Props {
  className?: string;
  iconClassName?: string;
  item: any;
  activeCategory: any;
  setActiveCategory: any;
}

export const FilterCategory: React.FC<Props> = (props) => {
  const { className, iconClassName, item, setActiveCategory, activeCategory } =
    props;
  return (
    <AccordionTrigger
      className={cn(
        "p-4 uppercase group no-underline! cursor-pointer hover:bg-black/4 rounded-none text-[14px] leading-6 tracking-[0.04em]",
        className,
      )}
      onClick={() => setActiveCategory(item.id.toString())}
    >
      <FadeInSection threshold={0} className="w-full inline-flex">
        <span
          className={cn(
            "transition-all text-[14px] font-semibold w-full pr-10 inline-block uppercase origin-left group-hover:scale-110 duration-300",
            Number(activeCategory) === item.id && "text-primary scale-110",
          )}
        >
          {item.name}
        </span>
        <CaretDownIcon
          size={24}
          weight="bold"
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            Number(activeCategory) === item.id && "rotate-180 text-primary",
            iconClassName,
          )}
        />
      </FadeInSection>
    </AccordionTrigger>
  );
};
