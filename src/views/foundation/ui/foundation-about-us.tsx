import React from "react";
import { cn } from "@/shared/lib/cn";
import { VideoCard } from "@/entities/video-card";
import "../css/foundation.css";
import { Categories } from "@/features/foundation-tabs";
import { AboutUs } from "./about-us";
import { Project } from "./project";
import { OurTasks } from "./our-tasks";
import { Topics } from "./topics";
import { Supporters } from "./supporters";
import { FadeInSection } from "@ui";
import { UsersList } from "./users-list";
interface Props {
  className?: string;
  id?: string;
  data: any;
}

export const FoundationAboutUs: React.FC<Props> = ({ className, id, data }) => {
  return (
    <FadeInSection
      threshold={0}
      id={id}
      className={cn(
        "foundation relative items-start gap-6 mb-20 md:mb-30",
        className,
      )}
    >
      <FadeInSection
        threshold={0}
        className="[grid-area:category] hidden lg:block sticky top-50 items-start"
      >
        <Categories
          className="w-full"
          categories={data["categories-links"]["category-links-title"]}
        />
      </FadeInSection>
      <FadeInSection
        threshold={0}
        className="[grid-area:content] w-full m-0 grid gap-10 md:gap-16"
      >
        <AboutUs data={data} />
        <Project data={data} />
        <OurTasks data={data} />
        <Topics data={data} />
        <UsersList
          data={data["board-of-guardians"]}
          nameActive={data["categories-links"]["category-links-title"][4].name}
          threshold={0.6}
          title={data["board-of-guardians"].title}
          users={data["board-of-guardians"]["board-guardian-users"]}
        />
        <UsersList
          data={data["team"]}
          nameActive={data["categories-links"]["category-links-title"][5].name}
          threshold={0.6}
          title={data["team"].title}
          users={data?.["team"]["team-users"]}
        />
        <Supporters data={data} />
      </FadeInSection>
      {data?.video?.["video-url"] && (
        <FadeInSection className="[grid-area:video] aspect-video hidden min-[1440px]:block sticky top-52">
          <VideoCard videoUrl={data?.video?.["video-url"] ?? ""} />
        </FadeInSection>
      )}
    </FadeInSection>
  );
};
