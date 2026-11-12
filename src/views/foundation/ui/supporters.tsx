"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { Button, ShowMore, Title } from "@ui";
import { FadeInSection } from "../../../shared/ui/fade-in-section";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useActiveSection } from "@/views/foundation/model/use-active-section";
import { useMedia } from "react-use";
import Image from "next/image";
import { UserItem } from "./user-item";

interface Props {
  className?: string;
  data: any;
}

export const Supporters: React.FC<Props> = ({
  className,
  data: dataSupporters,
}) => {
  const data = dataSupporters?.supporters;

  const { name, ref } = useActiveSection(
    dataSupporters?.["categories-links"]?.["category-links-title"]?.[6]?.name ??
      "",
    0.2,
  );
  const t = useTranslations("Foundation");

  const [showAllUsers, setShowAllUsers] = React.useState(false);
  const [showAllCompanies, setShowAllCompanies] = React.useState(false);
  const [limitUsers, setLimitUsers] = React.useState(6);
  const [limitCompanies, setLimitCompanies] = React.useState(12);
  const isMedia = useMedia("(min-width: 768px)", true);

  React.useEffect(() => {
    if (isMedia) {
      setLimitUsers(6);
      setLimitCompanies(12);
    } else {
      setLimitUsers(4);
      setLimitCompanies(9);
    }
  }, [isMedia]);

  const supporters = showAllUsers
    ? data?.["supporters-users"]
    : (data?.["supporters-users"]?.slice(0, limitUsers) ?? []);
  const supporterCompanies = showAllCompanies
    ? data?.["supporters-companies"]
    : (data?.["supporters-companies"]?.slice(0, limitCompanies) ?? []);

  const supportersComment = data?.["supporter-author-post"];

  return (
    <section ref={ref} id={name} className={cn("", className)}>
      <FadeInSection>
        <Title className="mb-4" size="f" text={data?.title} />
      </FadeInSection>
      <FadeInSection>
        <span className="text-primary text-base sm:text-[20px] uppercase font-semibold text-[20px] leading-7 mb-2">
          {t("supporters.companiesTitle")}
        </span>
      </FadeInSection>

      <ul className="flex flex-wrap items-start justify-center gap-6 py-4 md:py-6 mb-4">
        {supporterCompanies?.map((el: any, i: number) => {
          if (!el?.image?.url) return null;
          return (
            <li
              key={`company-${i}`}
              className="flex flex-col items-center text-center"
            >
              <FadeInSection>
                <div className="w-24.5 rounded-3xl overflow-hidden aspect-square flex items-center justify-center bg-white [box-shadow:2px_2px_8px_0_rgba(0,0,0,0.5)] mb-2">
                  <Image
                    className="object-cover w-fit"
                    src={el.image.url}
                    alt={el.text ?? ""}
                    width={98}
                    height={98}
                  />
                </div>
              </FadeInSection>
            </li>
          );
        })}
      </ul>
      <ShowMore
        length={data?.["supporters-companies"]?.length ?? 0}
        limit={limitCompanies}
        showAll={showAllCompanies}
        setShowAll={() => setShowAllCompanies(!showAllCompanies)}
      />
      <FadeInSection>
        <span className="text-primary text-base sm:text-[20px] font-montserat font-semibold uppercase text-[20px] leading-7 mb-2">
          {t("supporters.usersTitle")}
        </span>
      </FadeInSection>
      <ul className="flex flex-wrap justify-center gap-6 py-4 md:py-6 mb-10">
        {supporters.map((el: any, i: number) => {
          return (
            <li key={`person-${i}`} className="text-center w-36 sm:w-55">
              <UserItem {...el} className="text-black" />
            </li>
          );
        })}
      </ul>
      <ShowMore
        length={data?.["supporters-users"]?.length ?? 0}
        limit={limitUsers}
        showAll={showAllUsers}
        setShowAll={() => setShowAllUsers(!showAllUsers)}
      />
      <FadeInSection>
        <hr className="my-10" />
      </FadeInSection>
      {supportersComment && (
        <FadeInSection>
          <div className="flex flex-col min-[576px]:flex-row mb-8 min-[576px]:items-start items-center gap-4">
            {supportersComment?.["author-image"]?.url && (
              <FadeInSection className="w-auto">
                <Image
                  width={120}
                  height={120}
                  className="w-30 h-30 rounded-4xl shrink-0"
                  src={supportersComment["author-image"].url}
                  alt="supporter"
                />
              </FadeInSection>
            )}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <FadeInSection className="font-semibold uppercase text-base sm:text-[20px] font-montserat leading-7">
                {supportersComment?.["author-fullName"]}
              </FadeInSection>
              <FadeInSection className="font-montserrat text-[clamp(0.75rem,0.1875rem+2.5vw,0.875rem)] md:text-base leading-4 md:leading-6">
                {supportersComment?.["author-top-text"]}
                <span></span>
              </FadeInSection>
            </div>
          </div>
        </FadeInSection>
      )}
      <FadeInSection>
        <Link href={"/donation"}>
          <Button className="uppercase w-full py-2 md:py-3 text-[clamp(0.75rem,0.7212rem+0.1282vw,0.875rem)] font-montserat font-medium leading-4 md:leading-6 h-auto tracking-[0.04em] ">
            {t("supporterButton")}
          </Button>
        </Link>
      </FadeInSection>
    </section>
  );
};
