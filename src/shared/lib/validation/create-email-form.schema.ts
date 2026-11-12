import z from "zod";

export type TranslateFn = (key: string) => string;

// Метка домена: буквы/цифры, дефис только внутри (my-company, e-mail)
const LABEL = "[a-z0-9]+(?:-[a-z0-9]+)*";

// Домен: одна или больше меток через точку + TLD от 2 букв
const DOMAIN_REGEX = new RegExp(`^(?:${LABEL}\\.)+[a-z]{2,}$`, "i");

export const createEmailFormSchema = (t: TranslateFn) =>
  z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: t("emailRequired") })
    .max(254, { message: t("emailInvalid") })
    .pipe(z.email({ message: t("emailInvalid") }))
    .refine(
      (email) => {
        const domain = email.split("@").pop() ?? "";
        return DOMAIN_REGEX.test(domain);
      },
      { message: t("emailInvalid") },
    );
