import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection } from "@/shared/ui";
import Image from "next/image";
import { paymentCodes } from "../config/payment-codes";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

interface Props {
  className?: string;
  locale: Locale;
}

export const LiveBroadcasts: React.FC<Props> = async (props) => {
  const { className, locale } = props;

  const t = await getTranslations({
    namespace: "Donation",
    locale,
  });
  return (
    <div className={cn("grid gap-4", className)}>
      <FadeInSection>
        <h3 className="font-bold uppercase font-montserat text-base leading-6 tracking-[0.04em]">
          {t("donationTexts.transfer")}
        </h3>
      </FadeInSection>
      <div className="flex items-center justify-center lg:justify-normal gap-6 md:flex-row flex-col">
        <FadeInSection>
          <Image src="/ineco.png" alt="Ineco bank" width={275} height={80} />
        </FadeInSection>
        <FadeInSection>
          <p className="text-base font-montserat font-medium leading-6 tracking-[0.04em]">
            {t("donationTexts.recipient")}
          </p>
          <ul>
            {paymentCodes.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-1 font-montserat text-base font-medium leading-6 tracking-[0.04em]"
              >
                <span>{item.title}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </FadeInSection>
      </div>
    </div>
  );
};
