"use client";
import React from "react";
import { FadeInSection } from "@ui";
import { AboutProvince } from "./about-province";
import { MapSvg } from "./map-svg";
import { useProvinceQuery } from "@/shared/lib/hooks";
import { cn } from "@/shared/lib/cn";

interface Props {
  className?: string;
  data: any;
}

export const MapContainer: React.FC<Props> = (props) => {
  const { className, data } = props;
  const { selectedProvince, setSelectedProvince } = useProvinceQuery(20);
  return (
    <div
      className={cn(
        "grid items-start grid-cols-1! min-[576px]:grid-cols-2! gap-6 w-full mx-auto max-w-360",
        className,
      )}
    >
      <div>
        <FadeInSection
          threshold={0.1}
          className="flex justify-end translate-y-20"
        >
          <MapSvg setSelectedProvince={setSelectedProvince} />
        </FadeInSection>
      </div>
      <AboutProvince
        selectedProvince={selectedProvince}
        data={data.provinceNames}
        className="min-[992px]:block contents"
      />
    </div>
  );
};
