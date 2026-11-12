"use client";
import {
  contactFormSchema,
  ContactFormSchemaType,
} from "./contact-form.schema";
import { contactFormAction } from "./contact.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMedia } from "react-use";

export const useContactForm = () => {
  const _locale = useLocale();
  const locale = (_locale ?? "en") as "ru" | "en" | "hy";
  const t = useTranslations("Contact");
  const tForm = useTranslations("Contact.form");
  const form = useForm({
    resolver: zodResolver(contactFormSchema(tForm)),
    defaultValues: {
      email: "",
      phone: "",
      fullName: "",
      theme: "",
      message: "",
    },
  });
  const isMobile = useMedia("(min-width: 768px)", true);

  const onSubmit = async (data: ContactFormSchemaType) => {
    try {
      await contactFormAction({ ...data }, locale);
      toast.success(t("messagePopup.success"), {
        style: {
          paddingInline: "16px",
          paddingBlock: "8px",
          maxWidth: !isMobile ? "100%" : "350px",
        },
        icon: "🎉",
        duration: 8000,
      });
    } catch (error: any) {
      console.log(error);
      toast.error(t("messagePopup.fail"));
    } finally {
      form.reset();
    }
  };

  return { form, onSubmit };
};
