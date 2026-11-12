interface SubscribeTemplateProps {
  email: string;
  phone?: string;
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const subscribeTelegramTemplate = ({
  email,
  phone,
}: SubscribeTemplateProps): string => {
  const formattedDate = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Yerevan",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return [
    `<b>🎉 New Subscriber</b>`,
    ``,
    `📧 <b>Email:</b> ${escapeHtml(email)}`,
    phone ? `📱 <b>Phone:</b> ${escapeHtml(phone)}` : null,
    `🕒 <b>Date:</b> ${formattedDate}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
};
