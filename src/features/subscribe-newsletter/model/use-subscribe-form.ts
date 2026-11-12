"use client";
import { subscribeAction } from "./subscribe.action";
import { emailSubscribeShema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMedia } from "react-use";

export type TranslateFn = (key: string) => string;
export const useSubscribeForm = () => {
  const [isPending, startTransition] = useTransition();
  const _locale = useLocale();
  const locale = (_locale ?? "en") as "ru" | "en" | "hy";
  const t = useTranslations("Subscribe");
  const tForm = useTranslations("Footer.Subscribe.form");
  const isMobile = useMedia("(min-width: 768px)", true);
  const form = useForm({
    resolver: zodResolver(emailSubscribeShema(tForm)),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      try {
        const res = await subscribeAction(data, locale);

        if (!res.ok) {
          toast.error(res?.error || t("messagePopup.fail"), {
            position: "bottom-right",
          });
          return; // форму не сбрасываем, чтобы пользователь мог исправить данные
        }
        toast.success(t("messagePopup.success"), {
          position: !isMobile ? "bottom-center" : "bottom-right",
          icon: "🎉",
          style: {
            paddingInline: "16px",
            paddingBlock: "8px",
            maxWidth: !isMobile ? "100%" : "350px",
          },
          duration: 8000,
        });

        setTimeout(() => {
          window.open(res.returnUrl, "_blank");
        }, 3000);
      } catch (e: any) {
        console.log(e);
        toast.error(t("messagePopup.fail"), { position: "bottom-right" });
      } finally {
        form.reset();
      }
    });
  };

  return { form, onSubmit, isPending };
};
