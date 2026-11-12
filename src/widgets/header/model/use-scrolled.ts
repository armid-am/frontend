import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import React from "react";
import { useWindowScroll } from "react-use";

export const useScrolled = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { y } = useWindowScroll();
  React.useEffect(() => {
    if (y > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [y]);
  const pathname = usePathname();
  const locale = useLocale();
  const isHome = pathname === `/${locale}` || pathname === "/";
  const isShow = isScrolled || !isHome;
  return { isShow, isScrolled, isHome };
};
