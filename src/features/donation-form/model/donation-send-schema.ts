import { z } from "zod";
import { createEmailFormSchema } from "@/shared/lib/validation";
export type TranslateFn = (key: string) => string;
export const donationSendSchema = (t: TranslateFn) =>
  z.object({
    money: z.coerce.number().min(1, { message: t("moneyRequired") }),
    fullName: z
      .string()
      .min(2, { message: t("fullNameRequired") })
      .max(100),
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
    currency: z.string().min(1, { message: t("currencyRequired") }),
    isAnonimous: z.boolean().optional(),
  });

export type DonationSendSchemaType = z.infer<
  ReturnType<typeof donationSendSchema>
>;
