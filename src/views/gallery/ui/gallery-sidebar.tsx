"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import * as Sidebar from "@ui/sheet";
import { Filter } from "@/widgets/filter";
import { FadeInSection } from "@ui";

interface Props {
  className?: string;
  children?: React.ReactNode;
  data: any[];
}

export const GallerySidebar: React.FC<Props> = (props) => {
  const { className, children, data } = props;
  return (
    <Sidebar.Sheet>
      <FadeInSection className="mb-4 w-auto ">
        <Sidebar.SheetTrigger
          className="lg:hidden p-2 outline outline-black cursor-pointer bg-white rounded-[8px]"
          aria-label="open menu categories"
        >
          {children}
        </Sidebar.SheetTrigger>
      </FadeInSection>
      <Sidebar.SheetContent
        id="gallery-filter"
        showCloseButton={false}
        side="left"
        className={cn(
          "pl-4 top-21 flex flex-col overflow-auto! z-101",
          className,
        )}
      >
        <div className=" flex flex-col grow pb-10">
          <Sidebar.SheetClose className="p-2 self-end">
            <ArrowLeftIcon color="rgb(120,18,20)" size={24} />
          </Sidebar.SheetClose>
          <Sidebar.SheetTitle hidden />
          <Filter data={data} className="grow" />
        </div>
      </Sidebar.SheetContent>
      <Sidebar.SheetOverlay className="top-21 pointer-events-none" />
    </Sidebar.Sheet>
  );
};
