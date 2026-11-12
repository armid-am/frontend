"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { CaretLeftIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

interface Props {
  className?: string;
}

export const BackIcon: React.FC<Props> = (props) => {
  const { className } = props;
  const t = useTranslations("");
  const router = useRouter();
  return (
    <span
      onClick={() => router.back()}
      className={cn(
        "gap-1 sticky w-fit cursor-pointer p-1 top-32 hidden xl:flex items-center text-[10px] leading-4 tracking-[0.04em]",
        className,
      )}
    >
      <CaretLeftIcon size={16} weight="bold" />
      <span>{t("back")}</span>
    </span>
  );
};
