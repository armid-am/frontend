"use client";
import React from "react";
import { useLocale } from "next-intl";
import { LogoRuSvg, LogoEnSvg, LogoHySvg } from "./";

const LOGO_BY_LOCALE = {
  ru: LogoRuSvg,
  en: LogoEnSvg,
  hy: LogoHySvg,
} as const;

interface Props {
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}

export const Logo: React.FC<Props> = (props) => {
  const { className, imgClassName, onClick } = props;
  const locale = useLocale();

  const LogoSvg = LOGO_BY_LOCALE[locale as keyof typeof LOGO_BY_LOCALE];

  return React.createElement(LogoSvg, {
    className,
    imgClassName,
    onClick,
  });
};
