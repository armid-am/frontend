"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { Link } from "@/i18n/navigation";
import { FoundationLink } from "../model/types";

interface Props {
  className?: string;
  data: FoundationLink[];
}

export const FoundationLinks: React.FC<Props> = (props) => {
  const { className, data } = props;
  return (
    <ul className={cn("grid gap-2 md:gap-4", className)}>
      {data?.map((el: any, idx: number) => (
        <li key={idx}>
          <Link
            prefetch={true}
            className="uppercase font-montserat text-[12px] min-[440px]:text-[14px] font-semibold tracking-[4%] leading-5"
            href={`/foundation#${el.name?.toLowerCase().replaceAll(" ", "-")}`}
          >
            {el.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
