"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { CheckSquareIcon, SquareIcon } from "@phosphor-icons/react";

interface Props {
  className?: string;
  checked: boolean;
  label?: string;
  setChecked: (checked: boolean) => void;
}

export const FilterCheckbox: React.FC<Props> = (props) => {
  const { className, checked, label, setChecked } = props;

  return (
    <div
      className={cn(
        "flex items-start p-4 gap-2 cursor-pointer hover:scale-114 transition-[scale] duration-300 origin-left",
        {
          "text-primary": checked,
        },
        {
          "scale-114": checked,
        },
        className,
      )}
      onClick={() => setChecked(!checked)}
    >
      <input type="checkbox" readOnly checked={checked} className="hidden" />
      {!checked && <SquareIcon weight="bold" className="w-6 h-6 shrink-0" />}
      {checked && (
        <CheckSquareIcon weight="bold" className="w-6 h-6 shrink-0" />
      )}
      {label && (
        <span
          className={cn(
            "text-[14px] font-semibold w-full pr-10 inline-block uppercase transition-all duration-300 leading-6 font-montserat tracking-[0.04em]",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
};
