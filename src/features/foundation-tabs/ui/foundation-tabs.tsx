"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  TabsList,
  TabsTrigger,
  FadeInSection,
} from "@ui";
import { SidebarMenuCategories } from "./sidebar-menu-categories";
import { ListBulletsIcon, PlayIcon } from "@phosphor-icons/react";
import { FoundationModalVideo } from "./foundation-modal-video";
import { useFoundationTabs } from "../model/use-foundation-tabs";

interface Props {
  className?: string;
  data: any;
}

export const FoundationTabs: React.FC<Props> = (props) => {
  const { className, data } = props;
  const {
    tabsTitle,
    activeIndex,
    setApi,
    tabValues,
    value,
    scrollToTop,
    setValue,
  } = useFoundationTabs(data);
  return (
    <FadeInSection
      threshold={0.1}
      className={cn(
        "[scrollbar-width:none] z-10 pt-4 bg-white sticky shadow-[inset_0_-1px_0_rgba(0,0,0,0.2)] top-17.5 mb-10 border-gray",
        className,
      )}
    >
      <TabsList className="relative flex p-0 bg-transparent!  rounded-none items-end justify-start w-full">
        <FadeInSection className="hidden md:flex items-end w-auto">
          {tabsTitle?.map((tab, index) => (
            <TabsTrigger
              aria-label={"tab trigger button" + tab}
              key={tab}
              className={cn(
                "bg-transparent shadow-none p-4 m-0 rounded-none uppercase border-0 text-base leading-6 font-montserat font-medium tracking-[4%] data-[state=active]:shadow-[inset_0_-2px_0_rgb(120,18,20)] hover:text-black cursor-pointer hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-black",
                {
                  "shadow-[inset_0_-2px_0_rgb(120,18,20)]! font-bold text-primary! hover:text-primary!":
                    value === tabValues[index],
                },
              )}
              value={tabValues[index]}
              onClick={() => {
                scrollToTop();
                setValue(tabValues[index]);
              }}
            >
              {tab}
            </TabsTrigger>
          ))}
        </FadeInSection>
        <FadeInSection>
          <Carousel
            key={value}
            opts={{ startIndex: activeIndex }}
            setApi={setApi}
            className="w-full md:hidden"
          >
            <CarouselContent className="m-0">
              {tabsTitle?.map((tab, index) => (
                <CarouselItem
                  className={cn("sm:basis-[40%] min-[576px]:basis-[50%] pl-0")}
                  key={tab}
                >
                  <FadeInSection className="translate-y-5" threshold={0}>
                    <TabsTrigger
                      aria-label={"tab trigger " + tab}
                      className={cn(
                        "bg-transparent w-full shadow-none p-4 m-0 border-black rounded-none uppercase border-0 text-base leading-6 font-montserat font-medium tracking-[4%] data-[state=active]:shadow-[0_3px_0] hover:text-black cursor-pointer hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-black",
                        {
                          "border-b-3 border-primary font-bold text-primary hover:text-primary":
                            value === tabValues[index],
                        },
                      )}
                      value={value === tabValues[index] ? "" : tabValues[index]}
                      onClick={() => {
                        scrollToTop();
                        setValue(tabValues[index]);
                      }}
                    >
                      {tab}
                    </TabsTrigger>
                  </FadeInSection>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              aria-label="previous category"
              className="min-[576px]:-left-10 left-0 text-primary! bg-transparent border-none"
            />
            <CarouselNext
              aria-label="next category"
              className="min-[576px]:-right-10 right-0 text-primary! bg-transparent border-none"
            />
          </Carousel>
        </FadeInSection>
        <SidebarMenuCategories
          isShow={value !== tabValues[0]}
          categories={data?.["categories-links"]["category-links-title"] ?? []}
        >
          <ListBulletsIcon color="black" size={24} />
        </SidebarMenuCategories>
        <FoundationModalVideo
          isShow={value !== tabValues[0]}
          videoUrl={data?.video?.["video-url"] ?? ""}
        >
          <PlayIcon color="currentColor" size={24} />
        </FoundationModalVideo>
      </TabsList>
    </FadeInSection>
  );
};
