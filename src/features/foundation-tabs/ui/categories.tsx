"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { useCategoryStore } from "../model";
import { Link } from "@/i18n/navigation";
import { FadeInSection } from "@ui";

interface Props {
  className?: string;
  categories: any[];
  onClose?: (id: string) => void;
}
export const activeCategoryName = (activeCategory: string, value: string) =>
  activeCategory
    ?.toLowerCase()
    .replaceAll(" ", "-")
    .includes(value?.toLowerCase().replaceAll(" ", "-"));

export const Categories: React.FC<Props> = (props) => {
  const { className, categories, onClose } = props;
  const activeCategory = useCategoryStore((state) => state.activeCategory);

  return (
    <FadeInSection className="w-auto">
      <ul
        className={cn(
          "flex flex-col text-start border-r border-border",
          className,
        )}
      >
        {categories?.map((item) => {
          const isActive = activeCategoryName(activeCategory, item.name);
          return (
            <li
              key={item.id}
              className={cn(
                "",
                isActive && "-mr-px border-r-2 border-r-primary",
              )}
            >
              <Link
                href={`#${item.name?.toLowerCase().replaceAll(" ", "-")}`}
                onClick={(e) => {
                  if (!onClose) return;
                  e.preventDefault(); // блокируем нативный якорный скролл
                  const id = item.name?.toLowerCase().replaceAll(" ", "-");
                  onClose?.(id); // передаём id наверх
                }}
                className={cn(
                  "text-[14px] p-4 font-semibold w-full pr-10 inline-block uppercase origin-left hover:scale-110 transition-all duration-300 leading-6 font-montserat tracking-[4%]",
                  isActive && "text-primary scale-110 text-base",
                )}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </FadeInSection>
  );
};
