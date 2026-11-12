"use client";
import { cn } from "@/shared/lib/cn";
import { FadeInSection, ShowMore } from "@ui";
import { useTranslations } from "next-intl";
import React from "react";
import { useDonors } from "../model/use-donors";
import { useResponseCode } from "../model/use-response-code";

interface Props {
  className?: string;
  locale: string;
}
const currencyIcons = { AMD: "֏", USD: "$", EUR: "€", RUB: "₽" };

export const DonorsList: React.FC<Props> = (props) => {
  const { className, locale } = props;

  useResponseCode();
  const t = useTranslations("Donation");
  const {
    INITIAL_COUNT,
    STEP,
    visibleDonates,
    hasMore,
    setVisibleCount,
    donors,
  } = useDonors(locale);
  return (
    <div className={cn("grid gap-4", className)}>
      <table style={{ borderSpacing: "8px 0px", borderCollapse: "separate" }}>
        <caption className="font-bold mb-4 text-start uppercase font-montserat text-base leading-6 tracking-[0.04em]">
          <FadeInSection>{t("donationTexts.supporter")}</FadeInSection>
        </caption>
        {visibleDonates.map((item, i) => (
          <tbody key={i}>
            <tr>
              <td className="text-base leading-6 font-montserat py-2 h-min align-top border-b border-gray-100">
                <FadeInSection>
                  {item.isAnonimous === "yes" ? t("anonimous") : item.fullName}
                </FadeInSection>
              </td>
              <td className="text-[14px] min-[480px]:text-base leading-6 font-montserat py-2 h-min align-top border-b border-gray-100 whitespace-nowrap">
                <FadeInSection>
                  {Number(item.money).toLocaleString("ru-RU")}{" "}
                  {currencyIcons[item.currency as keyof typeof currencyIcons] ??
                    item.currency}
                </FadeInSection>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <ShowMore
        length={donors.length}
        limit={INITIAL_COUNT}
        setShowAll={() =>
          setVisibleCount((prev) => (hasMore ? prev + STEP : INITIAL_COUNT))
        }
        showAll={!hasMore}
      />

      {/* {donors.length > INITIAL_COUNT && (
        <Button
          variant="outline"
          className="text-center py-2 md:py-3 text-[clamp(0.75rem,0.7212rem+0.1282vw,0.875rem)] uppercase rounded-lg h-auto mt-5 hover:bg-[rgba(120,18,20,0.12)] w-full font-montserat hover:text-primary border leading-4 md:leading-6 tracking-[0.04em] border-primary mb-10 cursor-pointer"
          onClick={() =>
            setVisibleCount((prev) => (hasMore ? prev + STEP : INITIAL_COUNT))
          }
        >
          {hasMore ? t("Foundation.showMore") : t("Foundation.closeMore")}
          {hasMore ? (
            <CaretDownIcon
              weight="bold"
              className="w-4! h-4! sm:w-6! sm:h-6!"
            />
          ) : (
            <CaretUpIcon weight="bold" className="w-4! h-4! sm:w-6! sm:h-6!" />
          )}
        </Button>
      )} */}
    </div>
  );
};
