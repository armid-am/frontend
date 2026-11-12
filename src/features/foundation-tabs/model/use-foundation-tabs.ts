import React from "react";
import { useFoundationTabStore } from "./use-foundation-tabs.store";
import { useSearchParam } from "react-use";
import { useFilterFoundation } from "./use-filter-foundation";
import { CarouselApi } from "@/shared/ui";

export const useFoundationTabs = (data: any) => {
  const { setValue, value } = useFoundationTabStore();
  const tabParams = useSearchParam("tab");
  useFilterFoundation(value || tabParams || "about", setValue);

  const tabsTitle = [data?.title1, data?.title2, data?.title3];
  const tabValues = ["about", "new", "report"];
  const [api, setApi] = React.useState<CarouselApi>();
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      const newValue = tabValues[selectedIndex];

      if (newValue !== value) {
        setValue(newValue);
        scrollToTop();
      }
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  React.useEffect(() => {
    if (!api || !value) return;

    const index = tabValues.indexOf(value);
    if (index === -1) return;

    const forceScroll = () => {
      api.reInit(); // пересчитать размеры
      api.scrollTo(index, true); // перейти к нужному
    };

    // Ждём один кадр чтобы layout стабилизировался
    const id = requestAnimationFrame(() => {
      forceScroll();
    });

    return () => cancelAnimationFrame(id);
  }, [api]);
  const activeIndex = React.useMemo(() => {
    return tabValues.indexOf(value || "about");
  }, [value]);

  const scrollToTop = () => {
    // window
    window.scrollTo({ top: 0, behavior: "smooth" });

    // document
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });

    // ищем ближайший скроллящийся родитель
    let el = document.querySelector("[data-radix-scroll-area-viewport]");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };
  React.useEffect(() => {
    return () => {
      setValue("about");
    };
  }, []);

  return {
    tabsTitle,
    activeIndex,
    setApi,
    value,
    tabValues,
    setValue,
    scrollToTop,
  };
};
