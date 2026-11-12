export const contacnTelegramTemplate = ({
  email,
  phone,
  fullName,
  theme,
  message,
}: {
  email: string;
  phone: string;
  fullName: string;
  theme: string;
  message: string;
}): string => {
  return [
    `<b>📬 New Message</b>`,
    ``,
    `👤 <b>Name:</b> ${fullName}`,
    `📧 <b>Email:</b> ${email}`,
    `📱 <b>Phone:</b> ${phone}`,
    `💬 <b>Theme:</b> ${theme}`,
    `📝 <b>Message:</b> ${message}`,
    `🕒 <b>Date:</b> ${new Date().toLocaleString("ru-RU", {
      timeZone: "Asia/Yerevan",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    `🌐 <b>Site:</b> armid.am`,
  ].join("\n");
};
