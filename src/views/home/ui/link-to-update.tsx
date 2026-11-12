"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection } from "@/shared/ui";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useFoundationTabStore } from "@/features/foundation-tabs";

interface Props {
  className?: string;
}

export const LinkToUpdate: React.FC<Props> = (props) => {
  const { className } = props;
  const t = useTranslations("HomeUpdates");
  const { setValue } = useFoundationTabStore();
  return (
    <FadeInSection className={cn("flex justify-center", className)}>
      <Link
        onClick={() => setValue("new")}
        className="inline-flex hover:bg-[rgba(120,18,20,0.12)] uppercase rounded-[4px] justify-center items-center gap-2.5 text-center text-[14px] leading-6 border border-primary py-3 px-8 tracking-[0.04em] font-medium font-montserrat text-primary"
        href="/foundation?tab=new"
      >
        {t("linkText")}
        <ArrowRightIcon size={24} weight="bold" />
      </Link>
    </FadeInSection>
  );
};
