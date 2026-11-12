"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { CheckSquareIcon, InfoIcon, SquareIcon } from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger, Checkbox } from "@ui";

interface Props {
  className?: string;
  children?: React.ReactNode;
  label?: string;
  rules?: string;
  checked?: boolean;
  setChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CheckboxInput: React.FC<Props> = (props) => {
  const { className, label, children, rules, checked, setChecked } = props;
  return (
    <div className={cn("flex gap-2.5 justify-between w-full", className)}>
      <div
        className="flex items-start gap-2 cursor-default"
        onClick={() => setChecked?.(!checked)}
      >
        <Checkbox className="hidden" />
        {!checked && (
          <SquareIcon
            weight="bold"
            className="w-6 h-6 shrink-0"
            onClick={() => setChecked?.(!checked)}
          />
        )}
        {checked && (
          <CheckSquareIcon
            weight="bold"
            className="w-6 h-6 shrink-0"
            onClick={() => setChecked?.(!checked)}
          />
        )}
        {label && <span className="text-sm flex-1">{label}</span>}
        {children}
      </div>
      <Tooltip>
        <TooltipTrigger
          aria-label="open tooltip popup info"
          type="button"
          className="relative group mt-1"
        >
          <InfoIcon
            className="cursor-pointer shrink-0"
            size={16}
            weight="bold"
          />
        </TooltipTrigger>
        <TooltipContent
          side="top"
          color="black"
          className="flex w-60 flex-col py-3 bg-white gap-0.5 border-[rgba(120,18,20,0.12)] border-2 text-black text-[12px] leading-4 tracking-[0.04em] font-montserat"
        >
          {rules}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
