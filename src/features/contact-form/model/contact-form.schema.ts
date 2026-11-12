import { z } from "zod";
import { createEmailFormSchema } from "@/shared/lib/validation";

// Минимальный тип, подходит и для useTranslations, и для getTranslations
export type TranslateFn = (key: string) => string;

export const contactFormSchema = (t: TranslateFn) =>
  z.object({
    email: createEmailFormSchema(t),
    phone: z
      .string()
      .transform((v) => v.replace(/[\s\-()]/g, ""))
      .pipe(
        z
          .string()
          .min(1, { message: t("phoneRequired") })
          .regex(/^\+[0-9]{7,15}$/, { message: t("phoneInvalid") }),
      ),
    fullName: z.string().min(2, { message: t("fullNameRequired") }),
    theme: z.string().min(2, { message: t("themeRequired") }),
    message: z.string().min(2, { message: t("messageRequired") }),
  });

// Тип выводится из фабрики, поэтому t для него не нужна
export type ContactFormSchemaType = z.infer<
  ReturnType<typeof contactFormSchema>
>;
