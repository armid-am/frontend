"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { linksArray } from "../config";

interface Props {
  className?: string;
  weight?: "bold" | "regular" | "fill" | "duotone" | "light" | "thin";
  size?: number;
  children?: React.ReactNode;
  shareUrl?: string;
}

export const SocialLinks: React.FC<Props> = (props) => {
  const { className, weight = "bold", size = 24 } = props;
  const classNameIcon = "text-[#781214]";
  const classNameLink =
    "inline-flex items-center justify-center [border-width:0.14em]! border-[#781214] rounded-[8px] hover:bg-[rgba(120,18,20,0.12)] focus-visible:ring-ring focus-visible:ring-[3px] min-[440px]:p-1.5 min-[480px]:p-2";
  return (
    <ul
      className={cn(
        "flex gap-3 bg-white mt-2 justify-center min-[440px]:justify-start",
        className,
      )}
    >
      {linksArray.map((el, i) => (
        <li key={i}>
          <a
            rel="noopener noreferrer"
            aria-label={el.ariaLabel}
            className={cn("block p-2", classNameLink)}
            target="_blank"
            href={el.url}
          >
            <el.Icon className={classNameIcon} size={size} weight={weight} />
          </a>
        </li>
      ))}
    </ul>
  );
};
