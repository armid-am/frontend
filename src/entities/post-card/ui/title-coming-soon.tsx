"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { useTranslations } from "next-intl";
import { FadeInSection } from "@/shared/ui";

interface Props {
  className?: string;
}

export const TitleComingSoon: React.FC<Props> = (props) => {
  const { className } = props;
  const t = useTranslations("Foundation");
  return (
    <FadeInSection className={cn("mb-10", className)}>
      <h2 className="text-3xl text-primary text-center">{t("comingSoon")}</h2>
    </FadeInSection>
  );
};
