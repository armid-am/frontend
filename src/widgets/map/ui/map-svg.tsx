"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { options } from "../config/map";
import { useActiveProvince } from "../model/active-province";

interface Props {
  className?: string;
  setSelectedProvince: (id: number) => void;
}

export const MapSvg: React.FC<Props> = (props) => {
  const { className, setSelectedProvince } = props;

  const { isActiveProvince } = useActiveProvince();

  return (
    <svg
      viewBox="0 0 708 708"
      className={cn(
        "min-[576px]:w-full self-start w-[60vw] justify-self-end",
        className,
      )}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {options.map((el, index) => (
        <path
          key={index}
          id={el.id?.toString() || "20"}
          d={el.d || ""}
          fillRule="evenodd"
          clipRule="evenodd"
          fill={isActiveProvince(el)}
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
          onClick={() => setSelectedProvince(el.id || 20)}
          className={cn(
            "duration-300 cursor-pointer hover:h-[110%] hover:w-[110%]",
          )}
        />
      ))}
    </svg>
  );
};
