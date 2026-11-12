import { cn } from "@/shared/lib/cn";
import { Title, FadeInSection } from "@ui";
import { BreadCrumbs } from "./bread-crumbs";
import { ContentBlocks } from "./content-blocks";
import { PostMeta } from "./post-meta";
import { HeroMedia } from "./hero-media";
import { BackIcon } from "./back-icon";
export const dinamic = "force-dynamic";

interface Props {
  className?: string;
  breadcrumbs: Record<string, any[]>;
  data: any;
}

export function Post(props: Props) {
  const { breadcrumbs, className, data } = props;

  return (
    <>
      <BackIcon />
      <div className="grid gap-4 mb-18">
        <article
          className={cn(
            "max-w-177 w-full pt-10 xl:pt-4 mx-auto bg-white overflow-hidden",
            className,
          )}
        >
          <FadeInSection>
            <BreadCrumbs links={breadcrumbs} finishLink={data?.title} />
          </FadeInSection>
          {/* Post content */}
          <FadeInSection>
            <Title size="f" text={data?.title} className="mb-6" />
          </FadeInSection>
          <PostMeta data={data} />
          <HeroMedia data={data} />
          <FadeInSection threshold={0}>
            <p className="font-montserrat text-[clamp(0.75rem,0.1875rem+2.5vw,0.875rem)] md:text-base leading-4 md:leading-6">
              {data?.description}
            </p>
          </FadeInSection>
        </article>
        <ContentBlocks data={data} />
      </div>
    </>
  );
}
