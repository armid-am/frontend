"use server";

import { sendTelegramMessage } from "@/shared/lib/telegram";
import { EmailDonorTemplate } from "../ui/email-template/email-donor-template";
import { ApiRouts } from "@/shared/api";
import { EmailDonorTemplateUserEn } from "../ui/email-template/email-donor-user-template-en";
import { EmailDonorTemplateUserRu } from "../ui/email-template/email-donor-user-template-ru";
import { EmailDonorTemplateUserHy } from "../ui/email-template/email-donor-user-template-hy";
import { donorTelegramTemplate } from "./donor-telegram-template";
import { sendEmail } from "@/shared/lib/email";
const userTemplates = (status: "success" | "fail") => ({
  ru: () => EmailDonorTemplateUserRu({ status }),
  en: () => EmailDonorTemplateUserEn({ status }),
  hy: () => EmailDonorTemplateUserHy({ status }),
});

const subjects = (status: "success" | "fail") => ({
  ru:
    status === "success"
      ? "✅ Успешное пожертвование"
      : "❌ Ошибка при пожертвовании",
  en: status === "success" ? "✅ Successful Donation" : "❌ Failed Donation",
  hy:
    status === "success"
      ? "✅ Հաջողված նվիրաբերություն"
      : "❌ Ձախողված նվիրաբերություն",
});

export async function handleDonorAction(
  donor: any,
  status: "success" | "fail",
  locale: "ru" | "en" | "hy",
) {
  const response = await fetch(
    (process.env.NEXT_PUBLIC_API_URL as string) + ApiRouts.DONORS,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...donor,
        donate: status,
        locale,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create donor");
  }

  await sendEmail({
    adminData: { ...donor, donate: status },
    userEmail: donor.email,
    adminSubject: `New Donor — ${status}`,
    userSubject: subjects(status)[locale],
    adminTemplate: EmailDonorTemplate,
    userTemplate: () => userTemplates(status)[locale](),
  });

  await sendTelegramMessage(
    donorTelegramTemplate({
      email: donor.email,
      phone: donor.phone,
      fullName: donor.fullName,
      money: donor.money,
      date: donor.date,
      currency: donor.currency,
      donate: status,
    }),
  );
}
