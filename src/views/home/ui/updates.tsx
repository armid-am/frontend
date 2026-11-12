import React from "react";
import { cn } from "@/shared/lib/cn";
import { Container, Title, FadeInSection } from "@ui";
import { PostCardList } from "@/entities/post-card";
import { LinkToUpdate } from "./link-to-update";

interface Props {
  className?: string;
  data: any;
}

export const Updates: React.FC<Props> = (props) => {
  const { className, data } = props;
  const dataUpdates = data?.updates?.slice(0, 2).map((item: any) => ({
    ...item,
    keyword: "/foundation/update/" + item.keyword.replaceAll(" ", "-"),
  }));
  return (
    <section
      className={cn("mb-[clamp(2.5rem,1.3462rem+5.1282vw,7.5rem)]", className)}
    >
      <Container>
        <FadeInSection>
          <Title
            className="border-0 text-center text-primary mb-6"
            size="n"
            text={data?.title}
          />
        </FadeInSection>
        <FadeInSection>
          <p className="text-[14px] md:text-[18px] text-center font-montserat leading-6 mb-15">
            {data?.text}
          </p>
        </FadeInSection>
        <PostCardList className="mb-10!" post={dataUpdates} />
        <LinkToUpdate />
      </Container>
    </section>
  );
};
