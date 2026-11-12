"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection } from "./fade-in-section";
import { Button } from "./button";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

interface Props {
  className?: string;
  length: number;
  limit: number;
  setShowAll: () => void;
  showAll: boolean;
}

export const ShowMore: React.FC<Props> = (props) => {
  const { className, length, limit, showAll, setShowAll } = props;
  const t = useTranslations("ShowMoreAndLessMoreButtons");
  return (
    <>
      {length > limit && (
        <FadeInSection className={cn("", className)}>
          <Button
            variant={"outline"}
            className="text-center py-2 md:py-3 text-[clamp(0.75rem,0.7212rem+0.1282vw,0.875rem)] uppercase rounded-lg h-auto hover:bg-[rgba(120,18,20,0.12)] w-full font-montserat hover:text-primary border leading-4 md:leading-6 tracking-[0.04em] border-primary mb-10 cursor-pointer"
            onClick={setShowAll}
          >
            {showAll ? t("closeMore") : t("showMore")}
            {showAll ? (
              <CaretUpIcon
                weight="bold"
                className="w-4! h-4! sm:w-6! sm:h-6!"
              />
            ) : (
              <CaretDownIcon
                weight="bold"
                className="w-4! h-4! sm:w-6! sm:h-6!"
              />
            )}
          </Button>
        </FadeInSection>
      )}
    </>
  );
};
