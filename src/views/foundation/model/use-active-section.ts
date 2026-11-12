"use client";

import { useCategoryStore } from "@/features/foundation-tabs";
import React from "react";
import { useIntersection } from "react-use";

export const useActiveSection = (name: string, treshhold: number = 1) => {
  const intersectionRef = React.useRef<HTMLDivElement | null>(null);
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
    {
      threshold: treshhold,
    },
  );

  const setActiveCategory = useCategoryStore(
    (state) => state.setActiveCategory,
  );

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategory(name);
    }
  }, [intersection?.isIntersecting]);

  return {
    name: name?.toLowerCase().replaceAll(" ", "-"),
    ref: intersectionRef,
  };
};
