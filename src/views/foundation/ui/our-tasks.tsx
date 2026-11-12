import React from "react";
import { cn } from "@/shared/lib/cn";
import { Title, FadeInSection } from "@ui";
import Image from "next/image";
import { ActiveSectionWrapper } from "./active-section-wrapper";

interface Props {
  className?: string;
  data: any;
}

export const OurTasks: React.FC<Props> = (props) => {
  const { className, data } = props;

  return (
    <ActiveSectionWrapper
      treshhold={0.3}
      sectionName={data["categories-links"]["category-links-title"][2].name}
      className={cn("flex flex-col gap-3", className)}
    >
      <FadeInSection>
        <Title size={"f"} text={data?.["our-activity"]?.title} />
      </FadeInSection>

      <div className="bg-[rgba(239,239,239,0.2)] space-y-8 py-5">
        <FadeInSection>
          <div className="flex gap-2 ">
            <svg
              className="shrink-0 md:w-12 md:h-12 w-8 h-8"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4.33006L43.6699 24L24 43.6699L4.33007 24L24 4.33006ZM24 0L0 24L24 48L48 24L24 0Z"
                fill="#781214"
                fillOpacity="0.2"
              />
              <path
                d="M28.4927 18.0416L28.4946 19.5073L28.4927 19.5092V22.5687H25.4312V19.5073V16.6429V14.4214L24 12.9883L22.5688 14.4195V16.6448L19.5054 16.6429V13.1528L24 8.6582L28.4927 13.1528V16.6429V18.0416Z"
                fill="#781214"
                fillOpacity="0.2"
              />
              <path
                d="M25.4312 25.4313H28.4926L31.357 25.4332L33.5785 25.4313L35.0116 24L33.5785 22.5688L31.357 22.5707V19.5073H33.3451H34.8471L39.3398 24L34.8471 28.4927H34.2864H31.357H28.4945L28.4926 28.4946L25.4312 28.4927V25.4313Z"
                fill="#781214"
                fillOpacity="0.2"
              />
              <path
                d="M19.5054 28.4945L19.5073 28.4926L19.5054 25.4312L22.5688 25.4331V28.4926V31.3551V33.5804L24 35.0116L25.4312 33.5785V31.357H28.4927V34.8471L24 39.3417L19.5054 34.8471V31.357V28.4945Z"
                fill="#781214"
                fillOpacity="0.2"
              />
              <path
                d="M13.1509 19.5073H16.5415L16.6429 19.5092H19.5054L19.5073 19.5073H22.5687V22.5669L19.5054 22.5688H16.6429L14.4214 22.5669L12.9883 24L14.4214 25.4332L16.6429 25.4313V28.4946L13.1509 28.4927L8.6582 24L13.1509 19.5073Z"
                fill="#781214"
                fillOpacity="0.2"
              />
            </svg>

            <p className="font-medium font-montserat text-[#404040] leading-6 md:leading-10 text-base md:text-[18px] sm:text-2xl text-start">
              {data?.["our-activity"]?.["first-text"]}
            </p>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="flex gap-2 ">
            <svg
              className="shrink-0 md:w-12 md:h-12 w-8 h-8"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 4.33006L43.6699 24L24 43.6699L4.33007 24L24 4.33006ZM24 0L0 24L24 48L48 24L24 0Z"
                fill="#781214"
                fillOpacity="0.2"
              />
              <path
                d="M28.4927 18.0416L28.4946 19.5073L28.4927 19.5092V22.5687H25.4312V19.5073V16.6429V14.4214L24 12.9883L22.5688 14.4195V16.6448L19.5054 16.6429V13.1528L24 8.6582L28.4927 13.1528V16.6429V18.0416Z"
                fill="#781214"
                fillOpacity="0.2"
              />
              <path
                d="M25.4312 25.4313H28.4926L31.357 25.4332L33.5785 25.4313L35.0116 24L33.5785 22.5688L31.357 22.5707V19.5073H33.3451H34.8471L39.3398 24L34.8471 28.4927H34.2864H31.357H28.4945L28.4926 28.4946L25.4312 28.4927V25.4313Z"
                fill="#781214"
                fillOpacity="0.2"
              />
              <path
                d="M19.5054 28.4945L19.5073 28.4926L19.5054 25.4312L22.5688 25.4331V28.4926V31.3551V33.5804L24 35.0116L25.4312 33.5785V31.357H28.4927V34.8471L24 39.3417L19.5054 34.8471V31.357V28.4945Z"
                fill="#781214"
                fillOpacity="0.2"
              />
              <path
                d="M13.1509 19.5073H16.5415L16.6429 19.5092H19.5054L19.5073 19.5073H22.5687V22.5669L19.5054 22.5688H16.6429L14.4214 22.5669L12.9883 24L14.4214 25.4332L16.6429 25.4313V28.4946L13.1509 28.4927L8.6582 24L13.1509 19.5073Z"
                fill="#781214"
                fillOpacity="0.2"
              />
            </svg>

            <p className="font-medium font-montserat text-[#404040] leading-6 md:leading-10 text-base md:text-[18px] sm:text-2xl text-start">
              {data?.["our-activity"]?.["second-text"]}
            </p>
          </div>
        </FadeInSection>
      </div>

      <FadeInSection>
        <div className="our-activity-grid gap-4 sm:gap-6">
          <FadeInSection className="[grid-area:image-first]">
            <Image
              width={385}
              height={217}
              className="aspect-video object-cover h-full w-full rounded-2xl [grid-area:image-first]"
              src={data?.["our-activity"]?.["image-first"]?.url}
              alt="we"
            />
          </FadeInSection>

          <FadeInSection className="[grid-area:image-second]">
            <Image
              width={385}
              height={217}
              className="aspect-video object-cover w-full h-full rounded-2xl [grid-area:image-second]"
              src={data?.["our-activity"]?.["image-second"]?.url}
              alt="we"
            />
          </FadeInSection>

          <FadeInSection className="[grid-area:image-third]">
            <Image
              width={365}
              height={457}
              className="aspect-4/5 object-cover h-full rounded-2xl [grid-area:image-third]"
              src={data?.["our-activity"]?.["image-third"]?.url}
              alt="we"
            />
          </FadeInSection>
        </div>
      </FadeInSection>
    </ActiveSectionWrapper>
  );
};
