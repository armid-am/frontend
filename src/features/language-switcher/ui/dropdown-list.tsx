import React from "react";
import { cn } from "@/shared/lib/cn";
import { useLocaleSwith } from "../model/use-locale-switch";

interface Props {
  className?: string;
}

export const DropdownList: React.FC<Props> = (props) => {
  const { className } = props;

  const { onSelectChange, params, routing } = useLocaleSwith();

  return (
    <ul
      className={cn(
        "flex border-t lg:hidden border-primary w-full justify-center",
        className,
      )}
    >
      {routing.locales.map((locale) => (
        <li className="cursor-pointer" key={locale}>
          <button
            aria-label={"change language to " + locale}
            onClick={() => onSelectChange(locale)}
            className={cn(
              "py-2 pt-4 font-bebas px-4 leading-10 text-2xl text-primary",
              {
                "text-[#A76062]": locale === params?.locale,
              },
            )}
          >
            {locale === "en" ? "Eng" : locale === "ru" ? "Рус" : "Հայ"}
          </button>
        </li>
      ))}
    </ul>
  );
};
