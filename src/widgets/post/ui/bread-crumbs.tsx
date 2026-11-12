"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { useLocale } from "next-intl";
import { CaretRightIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { useFoundationTabStore } from "@/features/foundation-tabs";
interface Props {
  className?: string;
  links: Record<string, Array<{ name: string; link: string }>>;
  finishLink: string;
}

export const BreadCrumbs: React.FC<Props> = (props) => {
  const { className, links, finishLink } = props;
  const locale = useLocale();
  const dataLinks = links?.[locale || "en"];
  const { setValue } = useFoundationTabStore();

  return (
    <ol className={cn("flex items-center mb-2", className)}>
      {dataLinks?.map((item: any, index: number) => (
        <li className="flex items-center" key={index}>
          <Link
            onClick={() => {
              if (index === 1) {
                setValue(item.query);
              }
            }}
            className="text-[10px] underline leading-4 tracking-[0.04em] p-1"
            href={index === 0 ? "/" : item.link}
          >
            {item.name}
          </Link>
          <span className="shrink-0 p-1.5">
            <CaretRightIcon size={12} className="shrink-0" />
          </span>
        </li>
      ))}
      <li className="flex items-center">
        <span className="text-[10px] text-black/70 leading-4 tracking-[0.04em] pl-1 line-clamp-1">
          {finishLink}
        </span>
      </li>
    </ol>
  );
};
