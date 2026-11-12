import React from "react";
import { useMedia } from "react-use";

const INITIAL_COUNT = 7;
const STEP = 7;

export const useVisibleCountUsers = (items: any[]) => {
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_COUNT);
  const [step, setStep] = React.useState(STEP);
  const visibleDonates = items?.slice(0, visibleCount);
  const hasMore = visibleCount < items?.length;
  const isDesctop = useMedia("(min-width: 1024px)", true);
  const isTablet = useMedia("(min-width: 640px)", false);

  React.useEffect(() => {
    setVisibleCount(isDesctop ? 21 : isTablet ? 14 : INITIAL_COUNT);
  }, [isTablet, isDesctop]);

  React.useEffect(() => {
    setStep(isTablet ? 14 : isDesctop ? 21 : STEP);
  }, [isTablet, isDesctop]);
  return { visibleCount, setVisibleCount, visibleDonates };
};
