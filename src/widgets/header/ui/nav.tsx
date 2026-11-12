"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection } from "@ui";
import { DropdownList } from "@/features/language-switcher";
import { NavLinks } from "./nav-links";
interface Props {
  className?: string;
  isScrolled: boolean;
  menuOpen: boolean;
  isHome: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Nav: React.FC<Props> = (props) => {
  const { className, menuOpen, isHome, setMenuOpen, isScrolled } = props;

  return (
    <nav
      className={cn(
        "fixed w-full rounded-b-[40px] p-4 lg:p-0 -top-full left-0 right-0 shadow-[0px_7px_9px_1px_rgba(0,0,0,0.3)] lg:shadow-none transition-[top,backdrop-filter,background-color] duration-300 flex lg:flex-row flex-col pt-20 items-center lg:static font-medium text-[14px] tracking-[0.04em]",
        {
          "top-0 backdrop-blur-sm bg-[rgba(255,255,255,0.8)]": menuOpen,
        },
        className,
      )}
    >
      <FadeInSection
        className={cn("", {
          "translate-y-0! transition-none!": !isHome,
        })}
      >
        <NavLinks
          isHome={isHome}
          isScrolled={isScrolled}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </FadeInSection>
      <DropdownList />
    </nav>
  );
};
