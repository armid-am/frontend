"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { FormProvider } from "react-hook-form";
import { FormInput, FormTextArea, Button, FadeInSection } from "@ui";
import * as Icons from "@phosphor-icons/react";
import { useContactForm } from "../model/use-contact-form";
import { useTranslations } from "next-intl";
// import { Turnstile } from "@marsidev/react-turnstile";

interface Props {
  className?: string;
}

export const ContactForm: React.FC<Props> = (props) => {
  const { className } = props;
  const t = useTranslations("Contact.form");
  // const [token, setToken] = React.useState("");
  const { form, onSubmit } = useContactForm();

  return (
    <FormProvider {...form}>
      <FadeInSection threshold={0.2}>
        <form
          className={cn("", className)}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 font-montserat">
              <FormInput
                name="fullName"
                type="text"
                placeholder={t("fullName")}
                classNameInput="pl-9"
                width={24}
                height={24}
              >
                <Icons.UserIcon className="text-muted-foreground w-6! h-6!" />
              </FormInput>
              <FormInput
                name="email"
                type="email"
                placeholder={t("email")}
                classNameInput="pl-9"
              >
                <Icons.EnvelopeSimpleIcon
                  width={24}
                  height={24}
                  className="w-6! h-6! text-muted-foreground"
                />
              </FormInput>
              <FormInput
                name="phone"
                type="tel"
                placeholder="+374 00 000 000"
                classNameInput="pl-9"
              >
                <Icons.PhoneIcon className="text-muted-foreground w-6! h-6!" />
              </FormInput>
              <FormInput
                name="theme"
                type="text"
                placeholder={t("theme")}
                classNameInput="pl-9"
              >
                <Icons.ChatTextIcon className="text-muted-foreground w-6! h-6!" />
              </FormInput>
              <FormTextArea
                placeholder={t("message")}
                className="block mb-2"
                name="message"
                classNameTextArea="pl-9 resize-none border-muted-foreground placeholder:font-normal"
              >
                <Icons.ChatsIcon className="text-muted-foreground w-6! h-6!" />
              </FormTextArea>
              {/* <input type="hidden" name="token" value={token} /> */}

              {/* <Turnstile
                className={cn("", {
                  "sr-only": token,
                })}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={setToken}
              /> */}
              <Button
                type="submit"
                className="cursor-pointer font-montserat w-full"
              >
                {t("button")}
              </Button>
            </div>
          </div>
        </form>
      </FadeInSection>
    </FormProvider>
  );
};
