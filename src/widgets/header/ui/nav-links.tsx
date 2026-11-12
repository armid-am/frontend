import React from "react";
import { cn } from "@/shared/lib/cn";
import { navLinks } from "../config/nav-links";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useLocaleSwith } from "@/features/language-switcher";

interface Props {
  className?: string;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHome: boolean;
  isScrolled: boolean;
}

export const NavLinks: React.FC<Props> = (props) => {
  const { className, menuOpen, isHome, isScrolled, setMenuOpen } = props;
  const t = useTranslations("Header");
  const { pathname } = useLocaleSwith();
  return (
    <ul
      className={cn(
        "flex w-full justify-center lg:flex-row flex-col items-center font-medium text-[14px] tracking-[0.04em]",
        className,
      )}
    >
      {navLinks.map((el, i) => (
        <li key={el.href} className="w-full lg:w-fit text-center">
          <Link
            prefetch={true}
            aria-label={"Go to " + t(`navItem${i + 1}`) + " page"}
            data-active={pathname?.includes(el.href.slice(1))}
            onClick={() => {
              if (menuOpen) {
                setMenuOpen(false);
              }
            }}
            href={el.href}
            className={cn(
              "p-6 py-2 lg:py-6.75 font-bebas! data-[active=true]:text-[#A76062] lg:hover:bg-[rgba(120,18,21,0.05)]! data-[active=true]:lg:text-primary data-[active=true]:lg:[box-shadow:inset_0_-2px_0_0_rgb(120,18,21)] w-full lg:text-inherit text-primary leading-10 block transition-colors text-2xl md:text-[26px]",
              {
                "lg:hover:[box-shadow:inset_0_-2px_0_0_rgb(255,255,255,0.4)]! lg:hover:bg-transparent!":
                  isHome && !isScrolled,
              },
            )}
          >
            {t(`navItem${i + 1}`)}
          </Link>
        </li>
      ))}
    </ul>
  );
};
