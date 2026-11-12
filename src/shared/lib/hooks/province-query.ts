"use client";
import React from "react";
import { useProvinceStore } from "@/shared/lib/hooks";
import qs from "qs";
import { useSearchParam } from "react-use";

export const useProvinceQuery = (currentProvince: number) => {
  const searchParams = useSearchParam("province");
  const { activeProvince, setActiveProvince } = useProvinceStore();

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    const province = searchParams ? Number(searchParams) : currentProvince;

    setActiveProvince(province);
  }, [searchParams]);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = { province: activeProvince };
    const query = qs.stringify(params, { arrayFormat: "comma", encode: false });

    const currentPath = window.location.pathname;
    window.history.replaceState(null, "", `${currentPath}?${query}`);
  }, [activeProvince]);
  React.useEffect(() => {
    setActiveProvince(currentProvince);
    return () => {
      setActiveProvince(currentProvince);
    };
  }, []);
  return {
    selectedProvince: activeProvince,
    setSelectedProvince: setActiveProvince,
  };
};
