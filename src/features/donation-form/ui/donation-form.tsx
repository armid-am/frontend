"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { FormInput, Button } from "@ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { donationSendSchema } from "../model";
import { useTranslations } from "next-intl";
import { Rules } from "./rules";
import toast from "react-hot-toast";
import { donateAction } from "../model";
import { CheckboxInput } from "./checkbox-input";
import {
  EnvelopeSimpleIcon,
  MoneyIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useLocale } from "next-intl";
import {
  paymentTerms,
  privacyPolicy,
} from "@/features/donation-form/config/rules";
import { FadeInSection } from "@ui";
interface Props {
  className?: string;
}
const currencies = [
  { name: "֏ AMD", id: "AMD" },
  { name: "$ USD", id: "USD" },
  { name: "€ EUR", id: "EUR" },
  { name: "₽ RUB", id: "RUB" },
];
export const DonationForm: React.FC<Props> = (props) => {
  const { className } = props;
  const [currency, setCurrency] = React.useState("AMD");
  const [currencyChange, setCurrencyChange] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [anonimCheck, setAnonimChecked] = React.useState(false);
  const t = useTranslations("Donation");
  const tForm = useTranslations("Donation.form");
  const form = useForm({
    resolver: zodResolver(donationSendSchema(tForm)),
    defaultValues: {
      money: "",
      fullName: "",
      email: "",
      phone: "",
      currency: "AMD",
      isAnonimous: false,
    },
  });
  React.useEffect(() => {
    form.setValue("isAnonimous", anonimCheck);
  }, [anonimCheck]);
  // Обновляем currency в форме при изменении
  React.useEffect(() => {
    form.setValue("currency", currency);

    const currencyData = async () => {
      const res = await fetch(
        "https://v6.exchangerate-api.com/v6/acd3fb2ee00bbe0f8bb52a03/latest/" +
          currency,
      );
      const data = await res.json();
      setCurrencyChange(data.conversion_rates.AMD);
    };
    currencyData();
  }, [currency, form]);

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      const result = await donateAction({
        ...formData,
        date: new Date(),
        isAnonimous: formData.isAnonimous ? "yes" : "no",
        money: Math.round(currencyChange * formData.money).toString(),
      });
      if (result) {
        localStorage.setItem(
          "donor",
          JSON.stringify({
            ...formData,
            date: new Date(),
            isAnonimous: formData.isAnonimous ? "yes" : "no",
            money: Math.round(
              currencyChange * Number(formData.money),
            ).toString(),
          }),
        );
        location.href = result;
      }
    } catch (error: any) {
      console.log(error);
      toast.error(t("donatPopup.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardImages = [
    "/idram.png",
    "/arca.png",
    "/mastercard.png",
    "/visa.png",
  ];
  const locale = useLocale();

  return (
    <FormProvider {...form}>
      <FadeInSection
        className={cn(
          "shadow-[0_2px_8px_rgba(0,0,0,0.16)] rounded-[8px]",
          className,
        )}
      >
        <form
          className="grid gap-6 p-6 lg:p-10"
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4">
            <div className="flex max-[1024px]:flex-row max-[576px]:flex-col-reverse gap-4 min-[1440px]:flex-row flex-col-reverse">
              <FadeInSection className="flex-1">
                <FormInput
                  className="font-montserat text-[21px]"
                  name="money"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder={t("form.amount")}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[eE+-]/g,
                      "",
                    );
                    Number(e.currentTarget.value);
                  }}
                >
                  <MoneyIcon color="rgba(0,0,0,0.5)" size={24} />
                </FormInput>
              </FadeInSection>
              <FadeInSection className="flex-1">
                <ul className="flex gap-2 min-[1440px]:justify-between">
                  {currencies.map((cur) => (
                    <li className="grow" key={cur.id}>
                      <button
                        aria-label={"Change currency to " + cur.name}
                        type="button"
                        className={cn(
                          "w-full hover:bg-[rgba(120,18,21,0.12)] border bg-white justify-center border-black font-montserat rounded-[8px] flex gap-1 items-center p-1.5 cursor-pointer",
                          {
                            "bg-primary text-white border-primary hover:bg-primary":
                              cur.id === currency,
                          },
                        )}
                        onClick={() => setCurrency(cur.id)}
                      >
                        <span className="text-[14px] shrink-0 font-medium w-4 min-[480px]:text-base leading-4 min-[480px]:leading-6 tracking-[0.04em]">
                          {cur.name.split(" ")[0]}
                        </span>
                        <span className="text-[10px] min-[480px]:text-[14px] leading-4 min-[480px]:leading-6 tracking-[0.04em]">
                          {cur.name.split(" ")[1]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </FadeInSection>
            </div>
            <div className="flex font-montserat flex-col min-[480px]:flex-row gap-4">
              <FadeInSection>
                <FormInput
                  className="text-[21px] w-full"
                  name="fullName"
                  type="text"
                  placeholder={t("form.name")}
                >
                  <UserIcon color="rgba(0,0,0,0.5)" size={24} />
                </FormInput>
              </FadeInSection>
              <FadeInSection>
                <FormInput
                  className="text-[21px] w-full"
                  name="email"
                  type="email"
                  placeholder={t("form.email")}
                >
                  <EnvelopeSimpleIcon color="rgba(0,0,0,0.5)" size={24} />
                </FormInput>
              </FadeInSection>
            </div>
            <FadeInSection>
              <FormInput
                name="phone"
                type="tel"
                placeholder="+374 00 000 000"
                classNameInput="pl-9"
              >
                <PhoneIcon className="text-muted-foreground w-6! h-6!" />
              </FormInput>
            </FadeInSection>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <FadeInSection className="w-auto flex flex-col font-montserat flex-1 min-w-65">
              <span className="font-bold uppercase text-[14px] leading-6 tracking-[0.04em]">
                {t("cardTitle")}
              </span>
              <span className="text-[12px] leading-6 tracking-[0.04em]">
                {t("cardText")}
              </span>
            </FadeInSection>
            <FadeInSection className="w-auto">
              <ul className="flex gap-2">
                {cardImages?.map((n: any, i: number) => (
                  <li
                    className="py-2 px-3 flex items-center justify-center rounded-[8px] shadow-[2px_2px_8px_rgba(0,0,0,0.16)]"
                    key={i}
                  >
                    <img
                      width={85}
                      height={25}
                      alt=""
                      className={cn("w-auto h-auto")}
                      src={n}
                    />
                  </li>
                ))}
              </ul>
            </FadeInSection>
          </div>
          <FadeInSection className="flex flex-col gap-1 items-start">
            <CheckboxInput
              checked={anonimCheck}
              setChecked={() => setAnonimChecked(!anonimCheck)}
              rules={t("popup.anonim.description")}
            >
              <span className="flex flex-1 self-start items-center w-full gap-2.75 text-[12px]! lg:text-[14px]! text-start font-bold tracking-[0.04em] leading-6 font-montserat uppercase">
                {t("popup.anonim.title")}
              </span>
            </CheckboxInput>
            <ul className="flex min-[1050px]:flex-row flex-col gap-2 h-auto lg:gap-4 tracking-[0.03em]">
              <li className="text-sm">
                <Rules
                  items={
                    paymentTerms[locale as keyof typeof paymentTerms].rules
                  }
                  title={
                    paymentTerms[locale as keyof typeof paymentTerms].title
                  }
                >
                  <button
                    aria-label="open paymentTerms rules modal window"
                    type="button"
                    className="underline text-start text-[10px] tracking-[0.04em] leading-4 font-montserat cursor-pointer"
                  >
                    {paymentTerms[locale as keyof typeof paymentTerms].title}
                  </button>
                </Rules>
              </li>
              <li className="text-sm">
                <Rules
                  items={
                    privacyPolicy[locale as keyof typeof privacyPolicy].rules
                  }
                  title={
                    privacyPolicy[locale as keyof typeof privacyPolicy].title
                  }
                >
                  <button
                    aria-label="open privacyPolicy rules modal window"
                    type="button"
                    className="underline text-start text-[10px] tracking-[0.04em] leading-4 font-montserat cursor-pointer"
                  >
                    {privacyPolicy[locale as keyof typeof privacyPolicy].title}
                  </button>
                </Rules>
              </li>
            </ul>
          </FadeInSection>
          <FadeInSection>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 font-medium font-montserat text-[12px] sm:text-[14px] tracking-[0.04em] leading-6"
            >
              {isSubmitting ? "Processing..." : t("form.submit")}
            </Button>
          </FadeInSection>
        </form>
      </FadeInSection>
    </FormProvider>
  );
};
