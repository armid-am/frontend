import React from "react";
import { cn } from "@/shared/lib/cn";
import { Button, Title, FadeInSection } from "@ui";
import {
  CastleTurretIcon,
  ChurchIcon,
  MusicNotesIcon,
  ScrollIcon,
  TreeIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";
import { Link } from "@/i18n/navigation";
import { ActiveSectionWrapper } from "./active-section-wrapper";
import { getTranslations } from "next-intl/server";

interface Props {
  className?: string;
  data: any;
}
const icons = [
  <CastleTurretIcon color="#404040" width={64} height={64} key={1} />,
  <ChurchIcon color="#404040" width={64} height={64} key={2} />,
  <ScrollIcon color="#404040" width={64} height={64} key={3} />,
  <MusicNotesIcon color="#404040" width={64} height={64} key={4} />,
  <TreeIcon color="#404040" width={64} height={64} key={5} />,
  <UsersThreeIcon color="#404040" width={64} height={64} key={6} />,
];
export const Topics: React.FC<Props> = async (props) => {
  const { className, data: dataTopics } = props;
  const data = dataTopics.topics;

  const t = await getTranslations("Foundation");

  return (
    <ActiveSectionWrapper
      treshhold={0.3}
      sectionName={
        dataTopics["categories-links"]["category-links-title"][3].name
      }
      className={cn("flex flex-col", className)}
    >
      <FadeInSection>
        <Title className="mb-4" size={"f"} text={data.title} />{" "}
      </FadeInSection>

      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 mb-4">
        {data?.posts?.map((el: any, index: number) => (
          <li key={index} className="w-full max-w-55 text-center">
            <div className="flex flex-col items-center justify-start gap-2 ">
              <FadeInSection className="flex flex-col items-center justify-start gap-2">
                {icons[index]}
              </FadeInSection>
              <FadeInSection>
                <h3 className="text-[24px] font-bebas min-[992px]:text-[36px] leading-10 text-primary text-center">
                  {el.title}
                </h3>
              </FadeInSection>
              <FadeInSection className="flex flex-col items-center justify-start gap-2">
                <p className="text-base tracking-[-0.02em] font-semibold text-[#404040] leading-6 font-montserat line-clamp-2">
                  {el.text?.includes("/") ? (
                    <>
                      {el?.text.split("/")[0]}
                      <br />
                      {el?.text.split("/")[1]}
                    </>
                  ) : (
                    el?.text
                  )}
                </p>
              </FadeInSection>
            </div>
          </li>
        ))}
      </ul>

      <FadeInSection className="flex justify-center mb-4">
        <span className="text-[72px] leading-16 md:text-[144px] md:leading-30.5 -mr-6 md:-mr-10 font-montserat-en font-black text-[rgba(120,18,20,0.12)]">
          “
        </span>
        <p className="relative z-50 uppercase text-balance py-2 md:py-6 font-montserat text-[16px] max-w-165.5 sm:text-[24px] tracking-[00.03em] text-[#1E1E1E] font-semibold text-center leading-6 md:leading-8">
          {data?.["first-text"]}
        </p>
      </FadeInSection>

      <FadeInSection>
        <Link href={"/donation"}>
          <Button className="uppercase h-auto py-2 md:py-3 text-[clamp(0.75rem,0.7212rem+0.1282vw,0.875rem)] font-montserat leading-4 md:leading-6 tracking-[0.04em] w-full">
            {t("donateButton")}
          </Button>
        </Link>
      </FadeInSection>
    </ActiveSectionWrapper>
  );
};
