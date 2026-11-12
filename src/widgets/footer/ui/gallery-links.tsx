"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { Link } from "@/i18n/navigation";
import { FoundationLink, GalleryCategory } from "../model/types";

interface Props {
  className?: string;
  data: GalleryCategory[];
}

export const GalleryLinks: React.FC<Props> = (props) => {
  const { className, data } = props;
  return (
    <ul className={cn("grid gap-2 md:gap-4", className)}>
      {data?.map((el: any, index: number) => (
        <li key={index}>
          <Link
            prefetch={true}
            className="uppercase font-montserat font-semibold text-[12px] min-[440px]:text-[14px] tracking-[4%] leading-5"
            href={
              el.id !== 8
                ? `/gallery?province=1&category=${el.id}&subcategory=${el.item.map((g: any) => g.id).join(",")}`
                : "/gallery"
            }
          >
            {el.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
