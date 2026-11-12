"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { ModalVideo } from "@/entities/modal-video";

interface Props {
  className?: string;
  children?: React.ReactNode;
  videoUrl?: string;
  isShow?: boolean;
}

export const FoundationModalVideo: React.FC<Props> = ({
  isShow,
  children,
  ...rest
}) => (
  <ModalVideo
    {...rest}
    triggerParentClassName={cn(
      "w-10 p-2 min-[1440px]:hidden text-black hover:text-[rgb(120,18,20)] hover:outline-[rgb(120,18,20)] absolute z-100 top-20 hover:bg-[rgba(120,18,20,0.12)] right-0 outline outline-black cursor-pointer bg-white rounded-[8px]",
      { hidden: isShow },
    )}
    triggerClassName="min-[1440px]:hidden text-inherit"
  >
    {children}
  </ModalVideo>
);
