"use client";
import React from "react";
import { AnimationLogoEn } from "./animation-logo-en";
import { AnimationLogoRu } from "./animation-logo-ru";
import { AnimationLogoHy } from "./animation-logo-hy";
import { useLocale } from "next-intl";

interface Props {
  className?: string;
}
const logo = {
  en: <AnimationLogoEn />,
  ru: <AnimationLogoRu />,
  hy: <AnimationLogoHy />,
};

export const AnimationLogo: React.FC<Props> = () => {
  const locale = useLocale();
  return <>{logo[locale as keyof typeof logo]}</>;
};
