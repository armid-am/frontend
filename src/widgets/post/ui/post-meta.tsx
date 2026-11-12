import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection } from "@/shared/ui";
import {
  CalendarDotsIcon,
  MapPinIcon,
  VideoIcon,
} from "@phosphor-icons/react/ssr";
import { getDate } from "../model/get-date";

interface Props {
  className?: string;
  data: any;
}

export const PostMeta: React.FC<Props> = (props) => {
  const { className, data } = props;
  // const titleCategory = category?.find((el) =>
  //   el?.videoPosts?.some((el: any) => el?.id === data?.id),
  // )?.title;

  return (
    <div
      className={cn(
        "flex items-center justify-between font-montserat mb-4",
        className,
      )}
    >
      <FadeInSection className="w-auto">
        <span className="flex items-center gap-1 leading-4 text-[14px] opacity-70 mb-2">
          <CalendarDotsIcon size={16} />
          <span>{getDate(data?.date)}</span>
        </span>
      </FadeInSection>
      <div className="flex items-center justify-center gap-4">
        {(data?.province || data?.category?.name || data?.address) && (
          <FadeInSection>
            <span className="flex items-center gap-1 leading-4 text-[14px] opacity-70 mb-2">
              <MapPinIcon size={16} />
              <span className="w-full">
                {data?.province || data?.category?.name || data?.address}
              </span>
            </span>
          </FadeInSection>
        )}
        {data?.category && (
          <FadeInSection>
            <span className="flex items-center gap-1 leading-4 text-[14px] opacity-70 mb-2">
              <VideoIcon size={16} />
              <span>{"titleCategory"}</span>
            </span>
          </FadeInSection>
        )}
      </div>
    </div>
  );
};
