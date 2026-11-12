"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { FormProvider } from "react-hook-form";
import { Button, FormInput } from "@ui";
import { EnvelopeSimpleIcon, PhoneIcon } from "@phosphor-icons/react";
import { useSubscribeForm } from "../model/use-subscribe-form";
import { useTranslations } from "next-intl";

interface Props {
  className?: string;
}

export const SubscribeForm: React.FC<Props> = (props) => {
  const { className } = props;
  const { form, onSubmit, isPending } = useSubscribeForm();
  const t = useTranslations("");
  return (
    <FormProvider {...form}>
      <form
        className={cn("grid gap-3", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="email"
          type="email"
          placeholder={t("Contact.form.email")}
          classNameInput="pl-9 py-2 placeholder:font-montserat font-montserat"
        >
          <EnvelopeSimpleIcon
            width={24}
            height={24}
            className="w-6! h-6! text-muted-foreground"
          />
        </FormInput>
        <FormInput
          name="phone"
          type="tel"
          placeholder="+374 00 000 000"
          classNameInput="pl-9 font-montserat"
        >
          <PhoneIcon className="text-muted-foreground w-6! h-6!" />
        </FormInput>

        {/* <input type="hidden" name="token" value={token} />

        <Turnstile
          className={cn("", {
            "sr-only": token,
          })}
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onSuccess={setToken}
        /> */}
        <span>
          <Button
            disabled={isPending}
            className="w-full h-full text-white text-[14px] leading-6 font-montserat tracking-[4%] flex items-center justify-center px-2 sm:px-6"
          >
            {t("Footer.Subscribe.buttonText")}
          </Button>
        </span>
      </form>
    </FormProvider>
  );
};
