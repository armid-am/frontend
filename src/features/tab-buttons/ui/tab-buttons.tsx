"use client";
import React from "react";
import { Button, FadeInSection } from "@ui";
import { useProvinceQuery } from "@/shared/lib/hooks";
import { cn } from "@/shared/lib/cn";

interface Props {
  className?: string;
  data: any[];
  currentProvince: number;
  isDisabled?: boolean;
}

export const TabButtons: React.FC<Props> = ({
  className,
  data,
  currentProvince,
  isDisabled,
}) => {
  const { selectedProvince, setSelectedProvince } =
    useProvinceQuery(currentProvince);

  // Защита от пустого массива
  if (!data?.length) return null;

  const firstTab = data[0];

  return (
    <FadeInSection threshold={0}>
      <ul className={cn("flex gap-2 flex-wrap", className)}>
        <li key="all">
          <FadeInSection>
            <Button
              aria-label={"show tab " + firstTab?.name}
              onClick={() => setSelectedProvince(firstTab.id)}
              className={cn(
                "border empty:hidden text-balance rounded-[4px]! cursor-pointer hover:bg-[rgba(120,18,21,0.12)] hover:text-black font-medium! font-montserat! text-[clamp(0.625rem,0.0625rem+2.5vw,0.75rem)] leading-4 min-[445px]:text-[14px] min-[440px]:tracking-[00.03rem] border-black focus:border-primary py-1 px-2 md:px-4",
                selectedProvince === firstTab.id || isDisabled
                  ? "text-white border-primary hover:bg-primary bg-primary hover:text-white"
                  : "text-black",
              )}
              variant={
                selectedProvince === firstTab.id || isDisabled
                  ? "default"
                  : "destructive"
              }
            >
              {firstTab.name}
            </Button>
          </FadeInSection>
        </li>

        {data.slice(1).map((el: any, i: number) => (
          <li key={el.id || i + 1}>
            <FadeInSection>
              <Button
                disabled={isDisabled}
                aria-label={"show tab " + el.name}
                onClick={() => setSelectedProvince(el.id)}
                className={cn(
                  "border rounded-[4px]! cursor-pointer hover:bg-[rgba(120,18,21,0.12)] hover:text-black font-medium! font-montserat! text-[clamp(0.625rem,0.0625rem+2.5vw,0.75rem)] leading-4 min-[445px]:text-[14px] min-[440px]:tracking-[00.03rem] border-black focus:border-primary py-1 px-2 md:px-4",
                  selectedProvince === el.id && !isDisabled
                    ? "text-white border-primary hover:bg-primary bg-primary hover:text-white"
                    : "text-black",
                )}
                variant={
                  selectedProvince === el.id && !isDisabled
                    ? "default"
                    : "destructive"
                }
              >
                {el.name}
              </Button>
            </FadeInSection>
          </li>
        ))}
      </ul>
    </FadeInSection>
  );
};
