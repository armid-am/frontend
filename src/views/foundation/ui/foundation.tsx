import React from "react";
import { cn } from "@/shared/lib/cn";
import { Container, TabsContent, Hero } from "@ui";
import { TabsWrapper } from "./tabs-wrapper";
import { FoundationTabs } from "@/features/foundation-tabs";
import { PostCardList } from "@/entities/post-card";
import { getFoundationDetails } from "../model/get-foundation-details";
import { FoundationAboutUs } from "./foundation-about-us";

interface Props {
  className?: string;
}

export const Foundation: React.FC<Props> = async (props) => {
  const { className } = props;
  const { data, imgUrl, hero, reports, updates } = await getFoundationDetails();

  return (
    <>
      <Hero
        position={hero?.position}
        // isLoading={false}
        imgUrl={imgUrl}
        title={hero?.title as string}
      />
      <Container
        className={cn(
          "min-[576px]:mx-[clamp(2.5rem,-0.8333rem+6.9444vw,7.5rem)]",
          className,
        )}
      >
        <TabsWrapper>
          {data.hero && <FoundationTabs data={data} />}
          <TabsContent value="about">
            <FoundationAboutUs data={data} id={data?.title1} />
          </TabsContent>
          <TabsContent value="new">
            <PostCardList
              className="mb-14 md:mb-20"
              id={data?.title2}
              post={updates}
            />
          </TabsContent>
          <TabsContent value="report">
            <PostCardList
              className="mb-14 md:mb-20"
              id={data?.title3}
              post={reports}
            />
          </TabsContent>
        </TabsWrapper>
      </Container>
    </>
  );
};
