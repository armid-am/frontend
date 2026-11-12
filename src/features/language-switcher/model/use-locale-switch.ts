import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Locale, useLocale } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

export const useLocaleSwith = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === `/${locale}` || pathname === "/";
  const router = useRouter();
  const params = useParams();
  function onSelectChange(nextLocale: string) {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: nextLocale as Locale },
    );
  }

  React.useEffect(() => {
    routing.locales.forEach((loc) => {
      if (loc !== locale) {
        router.prefetch(pathname, { locale: loc });
      }
    });
  }, [locale, pathname, router]);

  return { onSelectChange, isHome, params, pathname, routing, locale };
};
