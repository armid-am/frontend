"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import * as Sidebar from "@ui/sheet";
import { Categories } from "./categories";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { FadeInSection } from "@ui";

interface Props {
  className?: string;
  children?: React.ReactNode;
  categories: any[];
  isShow?: boolean;
}

export const SidebarMenuCategories: React.FC<Props> = (props) => {
  const { className, children, categories, isShow } = props;
  const [open, setOpen] = React.useState(false);

  const scrollTargetRef = React.useRef<string | null>(null);

  const handleClose = (id: string) => {
    scrollTargetRef.current = id;
    setOpen(false);
  };
  return (
    <Sidebar.Sheet open={open} onOpenChange={setOpen}>
      <FadeInSection className="w-10 lg:hidden absolute z-100 top-20 left-4">
        <Sidebar.SheetTrigger
          aria-label="open menu categories"
          className={cn(
            "p-2 outline outline-black cursor-pointer bg-white rounded-[8px]",
            {
              hidden: isShow,
            },
          )}
        >
          {children}
        </Sidebar.SheetTrigger>
      </FadeInSection>
      <Sidebar.SheetContent
        showCloseButton={false}
        side="left"
        className={cn("pl-4 top-21 flex flex-col", className)}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          if (scrollTargetRef.current) {
            const el = document.getElementById(scrollTargetRef.current);
            el?.scrollIntoView({ behavior: "smooth" });
            scrollTargetRef.current = null;
          }
        }}
      >
        <Sidebar.SheetTitle hidden />
        <Sidebar.SheetClose className="p-2 self-end">
          <ArrowLeftIcon color="rgb(120,18,20)" size={24} />
        </Sidebar.SheetClose>
        <Categories onClose={handleClose} categories={categories} />
      </Sidebar.SheetContent>
      <Sidebar.SheetOverlay className="top-21" />
    </Sidebar.Sheet>
  );
};
