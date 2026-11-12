"use client";
import { cn } from "@/shared/lib/cn";
import { GlobeIcon } from "@phosphor-icons/react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useLocaleSwith } from "../model/use-locale-switch";
import { useOpenMenu } from "../model/use-open-menu";

interface Props {
  className?: string;
}

export const LanguageDropdown: React.FC<Props> = (props) => {
  const { className } = props;
  const { onSelectChange, routing, locale } = useLocaleSwith();
  const { open, setOpen, ref } = useOpenMenu();
  return (
    <div
      ref={ref}
      onClick={() => {
        setOpen(!open);
      }}
      className={cn(
        "flex relative font-bebas items-center gap-2 h-full",
        className,
      )}
    >
      <button
        aria-label="open menu for change language"
        className="cursor-pointer flex items-center gap-1"
      >
        <GlobeIcon className="h-4 w-4 md:w-6! md:h-6! text-inherit" />
        <CaretDownIcon
          weight="bold"
          className={cn(
            "h-4 w-4 md:w-6! md:h-6! text-inherit transition-all duration-300",
            {
              "rotate-180": open,
            },
          )}
        />
      </button>
      <ul
        className={cn(
          "absolute z-100 transition-all duration-300 ease-in-out backdrop-blur-sm overflow-hidden bg-[rgba(255,255,255,0.8)] shadow-[0px_7px_9px_1px_rgba(0,0,0,0.3)] rounded-xl top-[calc(100%+10px)] left-1/2 -translate-x-1/2 opacity-0 pointer-events-none invisible flex flex-col items-center w-[100px]",
          {
            "visible opacity-100 pointer-events-auto": open,
          },
        )}
      >
        {routing.locales.map((local) => (
          <li className="w-full" key={local}>
            <button
              className={cn(
                "hover:bg-[rgba(0,0,0,0.05)] uppercase transition-colors duration-300 w-full cursor-pointer p-1.5 text-2xl leading-[167%] tracking-[0.04em] text-primary",
                {
                  "text-[#A76062]": local === locale,
                },
              )}
              onClick={() => onSelectChange(local)}
            >
              {local === "en" ? "Eng" : local === "ru" ? "Рус" : "Հայ"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
