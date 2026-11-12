"use client";

import React from "react";
import { cn } from "@/shared/lib/cn";
import { linksArray } from "../config";

interface Props {
  className?: string;
  linkClassName?: string;
  isContact?: boolean;
}

export const CompanyLinks: React.FC<Props> = (props) => {
  const { className, linkClassName, isContact } = props;

  return (
    <ul className={cn("", className)}>
      {linksArray.map((link) => (
        <li
          key={link.url}
          className="relative flex items-center gap-2.5 text-xs"
        >
          {<link.Icon weight="bold" size={24} />}
          <a
            className={cn(
              "font-semibold before:absolute before:inset-0 text-[14px]",
              linkClassName,
            )}
            target="_blank"
            href={link.url}
          >
            {isContact && link.label.includes("email")
              ? "armidfound@gmail.com"
              : link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};
