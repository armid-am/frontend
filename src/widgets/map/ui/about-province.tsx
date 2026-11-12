"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { VideoCard } from "@/entities/video-card";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useElementHeightStore } from "@/shared/lib/hooks";
import {
  ChartPieSliceIcon,
  MapPinAreaIcon,
  UsersFourIcon,
} from "@phosphor-icons/react";
import { Button, Title, FadeInSection } from "@ui";

interface Props {
  className?: string;
  data: any;
  selectedProvince: number;
}

export const AboutProvince: React.FC<Props> = (props) => {
  const { className, data, selectedProvince } = props;

  const [showMore, setShowMore] = React.useState(false);
  const t = useTranslations("Map");
  const { elementHeight } = useElementHeightStore();
  const prevRef = React.useRef(null);
  const nextRef = React.useRef(null);
  const locale = useLocale();

  const foundProvinceItem = data?.find(
    (el: any) => typeof el === "object" && el?.id === selectedProvince,
  );

  const activeProvince = foundProvinceItem
    ? (foundProvinceItem as any)
    : undefined;

  if (!activeProvince) {
    return null;
  }

  return (
    <div className={cn("space-y-4 font-montserrat", className)}>
      <div
        className={cn("-mt-18 min-[576px]:mt-10 min-[992px]:mt-16", {
          "max-[576px]:-mt-12!": locale === "ru",
        })}
      >
        <FadeInSection className="mb-4">
          <Title
            size={"m"}
            text={activeProvince?.["section-title"]}
            className="text-left text-primary text-[32px] md:text-[36px] leading-[120%]"
          />
        </FadeInSection>
        <div className="flex items-center justify-start gap-4 text-[20px] mb-4 sm:text-2xl font-semibold">
          <FadeInSection className="w-fit">
            <Title
              size={"m"}
              text={String(activeProvince?.["number-of-monuments"])}
              className="text-primary font-normal text-start leading-[120%]"
            />
          </FadeInSection>
          <FadeInSection className="grow w-full">
            <p className="text-[16px] min-[800px]:text-2xl leading-[120%] font-semibold lowercase font-montserat">
              {activeProvince?.["monuments-text"]}
            </p>
          </FadeInSection>
        </div>
        <FadeInSection>
          <div className="flex justify-between gap-3 mb-4 py-0.75 max-[429px]:text-[10px] min-[430px]:text-[12px] min-[576px]:text-[10px] md:text-[14px] sm:gap-6 items-center">
            <FadeInSection className="flex! justify-center w-fit gap-2 items-center">
              <ChartPieSliceIcon
                className="w-6 h-6 lg:w-10 lg:h-10"
                weight="bold"
              />
              <span className="md:font-extrabold w-fit whitespace-nowrap font-bold leading-[135%] tracking-[0.04em]">
                {activeProvince.Area} {t("km")}
              </span>
            </FadeInSection>
            <FadeInSection className="flex! justify-center w-fit gap-2 items-center">
              <UsersFourIcon
                className="w-6 h-6 lg:w-10 lg:h-10"
                weight="bold"
              />
              <span className="md:font-extrabold w-fit font-bold font-montserat leading-[135%] tracking-[0.04em]">
                {activeProvince.population}
              </span>
            </FadeInSection>
            <FadeInSection className="flex! justify-center w-fit gap-2 items-center">
              <MapPinAreaIcon
                className="w-6 h-6 shrink-0 lg:w-10 lg:h-10"
                weight="bold"
              />
              <span className="md:font-extrabold font-bold font-montserat line-clamp-2 leading-[135%] tracking-[0.04em]">
                {activeProvince.id === 26
                  ? t("country")
                  : `${activeProvince.cities} ${t("city")}, ${activeProvince.villages} ${t("villages")}`}
              </span>
            </FadeInSection>
          </div>
        </FadeInSection>
        <div>
          <FadeInSection>
            <p
              className={cn(
                "leading-4 inline font-montserat text-[clamp(0.75rem,0.1875rem+2.5vw,0.875rem)] md:leading-6",
                {
                  "line-clamp-3": !showMore,
                },
              )}
            >
              {activeProvince.text
                ?.split("/")
                ?.map((part: any, index: number) => (
                  <span key={index}>
                    {part}
                    {index !== activeProvince.text?.split("/")?.length - 1 && (
                      <br />
                    )}
                  </span>
                ))}
              {showMore ? " " : " ... "}
            </p>
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[#4F4F4F] inline underline cursor-pointer leading-4 font-montserat text-[12px] md:text-[16px]"
            >
              {showMore ? t("closeMore") : t("showMore")}
            </button>
          </FadeInSection>
        </div>
      </div>
      <FadeInSection
        threshold={0}
        className="min-[576px]:col-span-2 flex flex-col w-full gap-6 items-start"
      >
        <div className={cn("flex flex-col w-full gap-6 items-start")}>
          <div className="w-full overflow-auto">
            <Swiper
              slidesPerView={1}
              loop={true}
              spaceBetween={"16px"}
              breakpoints={{
                480: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: "24px",
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: "24px",
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: "24px",
                },
              }}
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              className={
                "mySwiper aboutProvince relative h-full w-full overflow-auto"
              }
            >
              <button
                aria-label="previuos video slide"
                className={`absolute cursor-pointer left-0 z-100 bottom-auto`}
                style={{ top: `calc(${elementHeight}px / 2 - 20px)` }}
                ref={prevRef}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-[440px]:w-full max-[440px]:h-full"
                >
                  <g filter="url(#filter0_d_570_1297)">
                    <path
                      d="M47.3877 56.1122C48.0217 56.7462 48.3779 57.6062 48.3779 58.5028C48.3779 59.3995 48.0217 60.2594 47.3877 60.8934C46.7536 61.5275 45.8937 61.8837 44.9971 61.8837C44.1004 61.8837 43.2405 61.5275 42.6064 60.8934L20.1064 38.3934C19.7918 38.0799 19.5421 37.7073 19.3718 37.2971C19.2015 36.8868 19.1138 36.447 19.1138 36.0028C19.1138 35.5586 19.2015 35.1188 19.3718 34.7086C19.5421 34.2983 19.7918 33.9257 20.1064 33.6122L42.6064 11.1122C43.2405 10.4782 44.1004 10.122 44.9971 10.122C45.8937 10.122 46.7536 10.4782 47.3877 11.1122C48.0217 11.7462 48.3779 12.6062 48.3779 13.5028C48.3779 14.3995 48.0217 15.2594 47.3877 15.8934L27.2811 36L47.3877 56.1122Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_570_1297"
                      x="-8"
                      y="-8"
                      width="88"
                      height="88"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_570_1297"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_570_1297"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </button>
              <button
                aria-label="next video slide"
                className="absolute cursor-pointer right-0 z-100 "
                style={{ top: `calc(${elementHeight}px / 2 - 20px)` }}
                ref={nextRef}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 72 72"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-[440px]:w-full max-[440px]:h-full"
                >
                  <g filter="url(#filter0_d_565_1242)">
                    <path
                      d="M51.8877 38.3878L29.3877 60.8878C28.7537 61.5218 27.8937 61.878 26.9971 61.878C26.1004 61.878 25.2405 61.5218 24.6064 60.8878C23.9724 60.2538 23.6162 59.3938 23.6162 58.4972C23.6162 57.6005 23.9724 56.7406 24.6064 56.1066L44.7186 36L24.6121 15.8878C24.2981 15.5739 24.0491 15.2012 23.8792 14.791C23.7093 14.3808 23.6218 13.9412 23.6218 13.4972C23.6218 13.0532 23.7093 12.6136 23.8792 12.2034C24.0491 11.7932 24.2981 11.4205 24.6121 11.1066C24.926 10.7926 25.2987 10.5436 25.7089 10.3737C26.1191 10.2038 26.5587 10.1163 27.0027 10.1163C27.4467 10.1163 27.8863 10.2038 28.2965 10.3737C28.7067 10.5436 29.0794 10.7926 29.3933 11.1066L51.8933 33.6066C52.2076 33.9205 52.4568 34.2934 52.6267 34.7038C52.7965 35.1142 52.8837 35.5542 52.8832 35.9984C52.8826 36.4426 52.7944 36.8823 52.6236 37.2923C52.4528 37.7024 52.2027 38.0746 51.8877 38.3878Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_565_1242"
                      x="-8"
                      y="-8"
                      width="88"
                      height="88"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset />
                      <feGaussianBlur stdDeviation="4" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_565_1242"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_565_1242"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </button>
              {activeProvince.videoPosts?.map((el: any, i: number) => (
                <SwiperSlide key={i} className="flex! flex-col">
                  <VideoCard
                    isPost
                    keyword={el.keyword}
                    videoClassName="w-full"
                    iframeBoxClassName="min-h-full w-full"
                    {...el}
                    videoUrl={el["url-youtube-vudeo"]}
                    place={el.address}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <FadeInSection>
            <Button
              className="group text-[12px] hover:text-primary! hover:bg-[rgba(120,18,20,0.12)] md:text-[14px] leading-6 relative uppercase px-8! h-auto py-3! border font-montserat tracking-[0.04em] border-primary flex items-center"
              variant={"destructive"}
            >
              <Link
                aria-label="go to gallery page"
                className="absolute inset-0"
                href={`/gallery?province=${selectedProvince}`}
              />
              {t("buttonText")}
              <ArrowRightIcon className="text-[#781214] w-6! h-6! mb-[1.5px]" />
            </Button>
          </FadeInSection>
        </div>
      </FadeInSection>
    </div>
  );
};
