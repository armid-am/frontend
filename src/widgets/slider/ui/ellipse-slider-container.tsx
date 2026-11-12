"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { useSlideHeightStore } from "@/shared/lib/hooks";
import { useSliderEllipse } from "../model";
import { Slide } from "./slide";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { FadeInSection } from "@ui";

interface Props {
  className?: string;
  data: any;
}

export const EllipseSliderContainer: React.FC<Props> = (props) => {
  const { className, data } = props;
  const { slideHeight } = useSlideHeightStore();
  const [videoPlaying, setVideoPlaying] = React.useState(false);
  const slides: any = data?.heroSliderSection || {};

  const {
    containerRef,
    paginationRef,
    sliderRef,
    handleNav,
    setActiveOrder,
    activeOrder,
  } = useSliderEllipse(slides?.length || 0, videoPlaying);

  return (
    <div className={cn("slider-ellipse relative", className)} ref={sliderRef}>
      <div
        style={{ height: `${slideHeight}px` }}
        className="slider-ellipse__container mb-2 md:mb-6"
        ref={containerRef}
      >
        {slides?.map((el: any, i: number) => (
          <Slide
            isPlay={activeOrder === i}
            key={el.id}
            videoUrl={el.videoPosts?.["url-youtube-vudeo"] || ""}
            videoTitle={el.videoTitle}
            className="slider-ellipse__slide"
            onVideoPlay={() => setVideoPlaying(true)}
            onVideoStop={() => setVideoPlaying(false)}
          />
        ))}
      </div>
      <FadeInSection>
        <div className="slider-ellipse__pagination" ref={paginationRef}>
          <button
            aria-label="previous preview slide video"
            className="cursor-pointer max-[440px]:w-10 max-[440px]:h-10 p-2"
            onClick={() => handleNav("prev")}
            data-dir="prev"
          >
            <ArrowLeftIcon className="w-6 h-6 text-primary" weight="bold" />
          </button>
          {slides?.map((_: any, i: any) => (
            <button
              aria-label={"pagination slide video " + i}
              key={i}
              data-order={i}
              className={cn("slider-ellipse__pagination-button cursor-pointer")}
              onClick={() => setActiveOrder(i)}
            />
          ))}
          <button
            aria-label="next preview slide video"
            className="cursor-pointer max-[440px]:w-10 max-[440px]:h-15 p-2"
            onClick={() => handleNav("next")}
            data-dir="next"
          >
            <ArrowRightIcon className="w-6 h-6 text-primary" weight="bold" />
          </button>
        </div>
      </FadeInSection>
    </div>
  );
};
