"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { Link } from "@/i18n/navigation";
import { CaretRightIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

interface Props {
  className?: string;
  text?: string;
}

export const HeroLinks: React.FC<Props> = (props) => {
  const { className, text } = props;
  const t = useTranslations("");
  return (
    <div className={cn("flex items-center gap-2 text-white", className)}>
      <Link href={"/"} className="font-montserat text-[16px]">
        {t("Home")}
      </Link>
      <CaretRightIcon weight="bold" size={20} />
      <span className="text-[16px] font-montserat text-[rgb(255,255,255,.5)]">
        {text}
      </span>
    </div>
  );
};
