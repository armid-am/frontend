"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection, ShowMore, Title } from "@/shared/ui";
import { useMedia } from "react-use";
import { useActiveSection } from "@/views/foundation/model/use-active-section";
import { UserItem } from "./user-item";

interface Props {
  className?: string;
  data: any;
  title: string;
  threshold: number;
  users: any[];
  nameActive: string;
}

export const UsersList: React.FC<Props> = (props) => {
  const { className, title, threshold, users, nameActive } = props;
  const { name, ref } = useActiveSection(nameActive, threshold);
  const [showAllUsers, setShowAllUsers] = React.useState(false);
  const isMedia = useMedia("(min-width: 768px)", true);
  const [limit, setLimit] = React.useState(6);
  React.useEffect(() => {
    if (isMedia) {
      setLimit(9);
    } else {
      setLimit(6);
    }
  }, [isMedia]);
  const limitUsers = showAllUsers ? users : users?.slice(0, limit);
  return (
    <section ref={ref} id={name} className={cn("flex flex-col", className)}>
      <FadeInSection>
        <Title className="mb-4" size="f" text={title} />
      </FadeInSection>
      <div className="flex flex-col justify-center">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 gap-y-6 py-4 md:py-6">
          {limitUsers?.map((member: any, i: number) => (
            <li key={i} className={cn("w-37 sm:w-55 text-center")}>
              <UserItem {...member} />
            </li>
          ))}
        </ul>
        <ShowMore
          length={users?.length}
          limit={limit}
          setShowAll={() => setShowAllUsers(!showAllUsers)}
          showAll={showAllUsers}
        />
      </div>
    </section>
  );
};
