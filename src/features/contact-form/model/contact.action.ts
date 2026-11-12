"use server";

import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { ContactFormSchemaType } from "./contact-form.schema";
import { EmailContactTemplate } from "../ui/email-template/email-contact-template";
import { EmailContactTemplateUserEn } from "../ui/email-template/email-contact-user-template-en";
import { EmailContactTemplateUserHy } from "../ui/email-template/email-contact-user-template-hy";
import { EmailContactTemplateUserRu } from "../ui/email-template/email-contact-user-template-ru";
import { sendTelegramMessage } from "@/shared/lib/telegram";
import { ApiRouts } from "@/shared/api";
import { contacnTelegramTemplate } from "./contact-telegram-template";
import { sendEmail } from "@/shared/lib/email";
import { createRateLimit } from "@/shared/lib/rate-limit";

const userTemplates = {
  ru: EmailContactTemplateUserRu,
  en: EmailContactTemplateUserEn,
  hy: EmailContactTemplateUserHy,
};
const subjects = {
  ru: "📨 Мы получили ваше сообщение",
  en: "📨 We Have Received Your Message",
  hy: "📨 Նամակը ստացել ենք",
};

const contactRateLimit = createRateLimit(
  "contact",
  Ratelimit.slidingWindow(10, "10 m"),
);

export async function contactFormAction(
  data: ContactFormSchemaType,
  locale: "ru" | "en" | "hy",
) {
  if (
    !data.email ||
    !data.phone ||
    !data.fullName ||
    !data.theme ||
    !data.message
  ) {
    throw new Error("no data");
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const { success } = await contactRateLimit.limit(ip);
  if (!success) {
    throw new Error("Too many requests. Please try again later.");
  }

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + ApiRouts.EMAIL_MESSAGES,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        locale,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create message");
  }

  await Promise.all([
    sendEmail({
      adminData: data,
      userEmail: data.email,
      adminSubject: data.theme || "New Message — Identity Foundation",
      userSubject: subjects[locale],
      adminTemplate: EmailContactTemplate,
      userTemplate: userTemplates[locale],
    }),
    sendTelegramMessage(contacnTelegramTemplate(data)),
  ]);
}
