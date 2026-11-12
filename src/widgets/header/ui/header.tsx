"use client";
import React from "react";
import { useMounted } from "@/shared/lib/hooks";
import { Button, Container, Logo, FadeInSection } from "@ui";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { LanguageDropdown } from "@/features/language-switcher";
import { useTranslations } from "next-intl";
import { Nav } from "./nav";
import { useScrolled, useMenu } from "../model";
import { cn } from "@/shared/lib/cn";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const t = useTranslations("Header");
  const { isHome, isScrolled, isShow } = useScrolled();
  const { menuOpen, setMenuOpen, ref } = useMenu();
  const mounted = useMounted();
  if (!mounted) return null;

  return (
    <header
      ref={ref}
      className={cn(
        "w-full py-2.5 lg:py-0 text-white transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 z-100",
        {
          "text-[#781214] [box-shadow:0_2px_8px_0_rgba(0,0,0,0.16)] before:absolute before:inset-0 before:backdrop-blur-sm bg-[rgba(255,255,255,0.8)]":
            isShow,
          "bg-transparent": menuOpen,
          "sticky top-0 transition-none!": !isHome,
        },
        className,
      )}
    >
      <Container
        className={cn(
          "max-w-420 relative rounded-[10px] gap-5 flex items-center justify-between",
        )}
      >
        <FadeInSection
          className={cn("sm:shrink-0 w-auto z-300!", {
            "translate-y-0": !isHome,
          })}
        >
          <Logo
            onClick={() => setMenuOpen(false)}
            className={cn("relative z-300! transition-colors gap-1 lg:gap-3", {
              "text-[#781214]": menuOpen,
            })}
          />
        </FadeInSection>
        <Nav
          isHome={isHome}
          isScrolled={isScrolled}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <FadeInSection
          className={cn("w-auto", {
            "translate-y-0": !isHome,
          })}
        >
          <div className="flex items-center w-auto lg:flex-row-reverse gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant={!isShow ? "destructive" : "default"}
                className={cn(
                  "h-9 lg:h-12.5 z-100 p-0 empty:p-0 font-semibold!",
                  !isShow ? "text-primary" : "text-white",
                  {
                    "bg-primary text-white": menuOpen,
                  },
                )}
              >
                <Link
                  prefetch={true}
                  onClick={() => setMenuOpen(false)}
                  className="w-full h-full font-semibold! uppercase leading-6 text-[10px]! min-[385px]:text-[12px]! lg:text-[14px]! tracking-[4%] flex items-center empty:px-0 justify-center px-3.5 sm:px-6"
                  href="/donation"
                >
                  {t("headerButton")}
                </Link>
              </Button>
              <button
                aria-label="open navigation mobile menu"
                className="cursor-pointer lg:hidden flex relative z-300 items-center justify-center"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? (
                  <XIcon weight="bold" className="text-primary" size={30} />
                ) : (
                  <ListIcon
                    weight="bold"
                    strokeWidth={2}
                    size={30}
                    className="text-inherit"
                  />
                )}
              </button>
              <LanguageDropdown className="text-inherit hidden lg:block cursor-pointer px-6 py-8" />
            </div>
          </div>
        </FadeInSection>
      </Container>
    </header>
  );
};
