import React from "react";
import { cn } from "@/shared/lib/cn";
import { ArrowRightIcon, CalendarDotsIcon } from "@phosphor-icons/react/ssr";
import { Link } from "@/i18n/navigation";
import { FadeInSection } from "@ui";
import { getPoster } from "@/shared/lib/youtube";
interface Props {
  className?: string;
  post: any;
}

export const PostCard: React.FC<Props> = (props) => {
  const { className, post } = props;
  const thumbnailPoster = post.url ? getPoster(post?.url) : post.image.url;

  // const url = qs
  //   .stringify(
  //     {
  //       "": post?.keyword,
  //     },
  //     {
  //       encode: false,
  //       arrayFormat: "comma",
  //     },
  //   )
  //   .slice(1)
  //   .split(" ")
  //   .join("-");

  return (
    <FadeInSection>
      <article
        className={cn(
          "relative flex gap-4 min-[992px]:gap-6 group font-montserrat h-fit shadow-[0_2px_8px_rgba(0,0,0,0.16)] p-3 rounded-[16px] overflow-hidden",
          className,
        )}
      >
        <Link
          aria-label={"link to " + post?.title + " post page"}
          prefetch={true}
          className="absolute inset-0 z-10"
          href={post.keyword}
        />
        <div className="relative basis-1/2 rounded-[8px] overflow-hidden">
          <img
            className="absolute inset-0! group-hover:scale-110 transition-[scale] duration-300 object-cover h-full w-full"
            src={thumbnailPoster}
            alt=""
          />
        </div>
        <div className="h-fit w-full pt-2">
          <span className="flex items-center gap-1 leading-4 text-[14px] opacity-70 mb-2">
            <CalendarDotsIcon size={16} />
            <span>
              {post?.date
                ?.split("T")[0]
                .replaceAll("-", " | ")
                .split(" | ")
                .reverse()
                .join(" | ")}
            </span>
          </span>
          <h3 className="font-semibold font-montserrat! text-base leading-6 mb-1 line-clamp-1 break-all">
            {post?.title}
          </h3>
          <p className="text-[14px] leading-6 line-clamp-1 sm:line-clamp-2 mb-1 pr-2 break-all">
            {post?.description}
            {/* Հանգանակություններն օգտագործվել են գնելու համար ներքոնշյալ տեխնիկական
            օգտագործվել են գնելու ․․․ */}
          </p>
          <div className="flex justify-end">
            <button
              aria-label="animation arrow button"
              className="p-2 ml-auto transition-transform group-hover:translate-x-1"
            >
              <ArrowRightIcon color="#781214" size={24} />
            </button>
          </div>
        </div>
      </article>
    </FadeInSection>
  );
};
