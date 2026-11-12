"use server";

import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { EmailSubscribeTemplate } from "../ui/email-template/email-subscribe-template";
import { EmailSubscribeTemplateUserEn } from "../ui/email-template/email-subscribe-user-template-en";
import { EmailSubscribeTemplateUserHy } from "../ui/email-template/email-subscribe-user-template-hy";
import { EmailSubscribeTemplateUserRu } from "../ui/email-template/email-subscribe-user-template-ru";
import { sendTelegramMessage } from "@/shared/lib/telegram";
import { ApiRouts, fetchApi } from "@/shared/api";
import { z } from "zod";
import { EmailSubscribeShemaType } from "./schema";
import { sendEmail } from "@/shared/lib/email";
import { createRateLimit } from "@/shared/lib/rate-limit";

const userTemplates = {
  ru: EmailSubscribeTemplateUserRu,
  en: EmailSubscribeTemplateUserEn,
  hy: EmailSubscribeTemplateUserHy,
};
const subjects = {
  ru: "📩 Вы подписались на рассылку фонда «Идентичность»",
  en: "📩 You Have Joined the Identity Foundation Newsletter",
  hy: "📩 Դուք միացաք «Ինքնություն» հիմնադրամի տեղեկագրին",
};

const errors = {
  ru: "Ваша подписка не удалась. Пожалуйста, попробуйте ещё раз",
  en: "Your subscription failed. please try again",
  hy: "Ձեր բաժանորդագրությունը չի հաջողվել։ Խնդրում ենք փորձել կրկին",
};

const exist = {
  ru: "Вы уже подписаны на нашу рассылку",
  en: "You are already subscribed to our newsletter",
  hy: "Ձեր բաժանորդագրությունը առկա հաջողվել է",
};

const subscribeSchema = z.object({
  email: z.email(),
  phone: z.string().min(6),
});

const subscribeRateLimit = createRateLimit(
  "subscribe",
  Ratelimit.slidingWindow(10, "10 m"),
);

export async function subscribeAction(
  formData: EmailSubscribeShemaType,
  locale: "ru" | "en" | "hy",
): Promise<{
  ok: boolean;
  error?: string;
  returnUrl?: string;
  telegramLink?: string;
}> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const { success } = await subscribeRateLimit.limit(ip);

  if (!success) {
    throw new Error("Too many requests. Please try again later.");
  }

  const email = formData.email as string;
  const phone = formData.phone as string;

  const data = subscribeSchema.parse({
    email,
    phone,
  });

  const currentSubscribe = await fetchApi(ApiRouts.EMAIL_SUBSCRIBE);

  const isSubscribe =
    currentSubscribe.docs.some((item: any) => item.email === data.email) &&
    currentSubscribe.docs.some((item: any) => item.phone === data.phone);

  if (isSubscribe) {
    return { ok: false, error: exist[locale] };
  }

  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + ApiRouts.EMAIL_SUBSCRIBE,
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
    return { ok: false, error: errors[locale] };
  }

  await sendEmail({
    adminData: data,
    userEmail: data.email,
    adminSubject: "New Subscribe — Identity Foundation",
    userSubject: subjects[locale],
    adminTemplate: EmailSubscribeTemplate,
    userTemplate: userTemplates[locale],
  });
  // sendTelegramMessage(subscribeTelegramTemplate(data));
  await sendTelegramMessage(`
    <b>🎉 New Subscribe</b>
    📧 Email: ${data.email}
    📱  Phone: ${data.phone}
    🕒 Date:  ${new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Yerevan",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
  `);

  return {
    ok: true,
    returnUrl: "https://t.me/armenianid",
    telegramLink: "https://t.me/@ArmidNotifyBot",
  };
}
