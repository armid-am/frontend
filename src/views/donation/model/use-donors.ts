import React from "react";
import { getDonors } from "../api/get-donors";
const INITIAL_COUNT = 10;
const STEP = 10;
export const useDonors = (locale: string) => {
  const [donors, setDonors] = React.useState<any[]>([]);

  const [visibleCount, setVisibleCount] = React.useState(INITIAL_COUNT);
  const visibleDonates = donors.slice(0, visibleCount);
  const hasMore = visibleCount < donors.length;
  React.useEffect(() => {
    async function fetchData() {
      const donors = await getDonors(locale, visibleCount + STEP);
      if (donors) {
        setDonors(donors);
      }
    }
    fetchData();
  }, [visibleCount]);

  return {
    visibleDonates,
    hasMore,
    setVisibleCount,
    donors,
    visibleCount,
    STEP,
    INITIAL_COUNT,
  };
};
