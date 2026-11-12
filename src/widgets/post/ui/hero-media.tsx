import React from "react";
import { FadeInSection } from "@ui";
import Image from "next/image";
import { getYoutubeId } from "../model/get-youtube-id";
import { VideoCard } from "@/entities/video-card";

interface Props {
  data: any;
}

export const HeroMedia: React.FC<Props> = (props) => {
  const { data } = props;
  const videoId =
    data?.url || data?.["url-youtube-vudeo"]
      ? getYoutubeId(data?.url || data?.["url-youtube-vudeo"])
      : "";
  return (
    <>
      {data?.image?.url && (
        <FadeInSection>
          <Image
            width={350}
            height={200}
            className="mb-4 rounded-3xl object-cover w-full"
            src={data?.image?.url}
            alt={data?.title}
          />
        </FadeInSection>
      )}
      {videoId && (
        <VideoCard
          className="mb-4"
          iframeBoxClassName="rounded-3xl"
          videoUrl={data?.url || data?.["url-youtube-vudeo"]}
        />
      )}
    </>
  );
};
