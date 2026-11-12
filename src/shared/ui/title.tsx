import { cn } from "@/shared/lib/cn";
import React from "react";

type TitleSizees = "l" | "m" | "s" | "n" | "f" | "p";

interface Props {
  className?: string;
  size: TitleSizees;
  text: string;
}

export const Title: React.FC<Props> = (props) => {
  const { className, size, text } = props;

  const setMapTag = {
    l: "h1",
    m: "h2",
    s: "h3",
    n: "h2",
    f: "h2",
    p: "h3",
  };

  const setMapSize = {
    l: "text-[64px]",
    m: "md:text-[48px] text-[36px] font-bebas leading-[120%]",
    s: "text-[36px]",
    p: "text-[clamp(1.625rem,1.4808rem+0.641vw,2.25rem)] leading-[120%] font-bebas border-b border-[rgba(120,18,20,0.12)] text-primary text-start",
    n: "text-[clamp(2.25rem,1.8462rem+1.7949vw,4rem)] font-bebas leading-[120%]",
    f: "font-bebas text-[clamp(1.75rem,0.625rem+5vw,2rem)] min-[445px]:text-[40px] md:text-[48px] border-b border-[rgba(120,18,20,0.12)] leading-[120%] text-primary text-start",
  };

  return React.createElement(
    setMapTag[size],
    { className: cn(setMapSize[size], className) },
    text,
  );
};
