"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { TabButtons } from "@/features/tab-buttons";
import { useFilter } from "@/widgets/filter";

interface Props {
  className?: string;
  data: any;
}

export const GalleryTabButtons: React.FC<Props> = (props) => {
  const { className, data } = props;
  const filter = useFilter(data?.galleryCategory || []);
  return (
    <TabButtons
      className={cn(className)}
      isDisabled={filter.disabled}
      currentProvince={Number(filter.province)}
      data={
        data.topCategory.map((el: any) => ({
          ...el,
          id: el.provinceName,
        })) || []
      }
    />
  );
};
