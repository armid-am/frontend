import { createEmailFormSchema } from "@/shared/lib/validation";
import z from "zod";
export type TranslateFn = (key: string) => string;
export const emailSubscribeShema = (t: TranslateFn) =>
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
  });

export type EmailSubscribeShemaType = z.infer<
  ReturnType<typeof emailSubscribeShema>
>;
