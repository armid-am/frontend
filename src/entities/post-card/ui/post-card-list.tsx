import React from "react";
import { cn } from "@/shared/lib/cn";
import { PostCard } from "./post-card";
import { TitleComingSoon } from "./title-coming-soon";

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  className?: string;
  post?: any;
}

export const PostCardList: React.FC<Props> = async (props) => {
  const { className, post, ...rest } = props;

  if (!post.length) return <TitleComingSoon />;

  return (
    <ul
      className={cn(
        "grid grid-cols-1 min-[992px]:grid-cols-2 gap-4 min-[992px]:gap-6",
        className,
      )}
      {...rest}
    >
      {post?.map((el: any) => (
        <li key={el?.id}>
          <PostCard post={el} />
        </li>
      ))}
    </ul>
  );
};
