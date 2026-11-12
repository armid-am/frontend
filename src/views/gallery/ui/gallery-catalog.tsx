"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { VideoCard } from "@/entities/video-card";
import { ShowMore, FadeInSection } from "@ui";
import { useTranslations } from "next-intl";
import { useVisibleCountUsers } from "../model/use-visible-count-users";
import { filterGallery } from "../model/filter-gallery";
import { useProvinceQuery } from "@/shared/lib/hooks";

interface Props {
  className?: string;
  isLoading?: boolean;
  data?: any[];
}

export const GalleryCatalog: React.FC<Props> = (props) => {
  const { className, isLoading, data } = props;
  const t = useTranslations("Gallery");

  const { filteredGallery: items } = filterGallery(data);
  const { setVisibleCount, visibleCount, visibleDonates } =
    useVisibleCountUsers(items);
  useProvinceQuery(27);

  return (
    <>
      {visibleDonates.length > 0 && (
        <FadeInSection className="animate-marquee" threshold={0}>
          <ul
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
              className,
            )}
          >
            {visibleDonates.map((el: any) => (
              <li className="relative" key={el.id + "video" + el.title}>
                <FadeInSection className="overflow-hidden" threshold={0.1}>
                  <VideoCard
                    isPost
                    keyword={el.keyword}
                    place={el.address}
                    title={el.title}
                    videoUrl={el["url-youtube-vudeo"]}
                  />
                </FadeInSection>
              </li>
            ))}
          </ul>
        </FadeInSection>
      )}
      {visibleDonates.length === 0 && !isLoading && (
        <FadeInSection>
          <h2 className="my-10 text-[12px] animate-marquee md:text-base lg:max-w-1/2 text-start">
            {t("noData")}
          </h2>
        </FadeInSection>
      )}
      <ShowMore
        className="animate-marquee"
        length={items.length}
        limit={visibleCount}
        showAll={visibleCount === items.length}
        setShowAll={() => setVisibleCount(items.length)}
      />
    </>
  );
};
