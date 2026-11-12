"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const BASE_URL = "https://www.armid.am";

export const useSocialLinkShare = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  const fullUrl = `${BASE_URL}/${locale}${decodeURIComponent(pathname)}${decodeURIComponent(search)}`;
  const url = encodeURIComponent(fullUrl);

  return { url, fullUrl };
};

// import { useSearchParams } from "next/navigation";
// import { usePathname } from "@/i18n/navigation";
// import { useLocale } from "next-intl";

// export const useSocialLinkShare = () => {
//   const locale = useLocale();
//   const shareUrl = usePathname();
//   const searchParams = useSearchParams();
//   const qs = searchParams;
//   const url1 = locale + decodeURIComponent(shareUrl) + (qs ? "?" + qs : "");
//   const fullUrl = "https://www.armid.am/" + url1;
//   const url = encodeURIComponent(fullUrl);
//   return { url, fullUrl };
// };
