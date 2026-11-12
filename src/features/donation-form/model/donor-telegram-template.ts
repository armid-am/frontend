interface EmailTemplateProps {
  email: string;
  phone: string;
  fullName: string;
  money: string;
  date: Date;
  currency: string;
  donate: string;
}

export const donorTelegramTemplate = ({
  email,
  phone,
  fullName,
  money,
  date,
  currency,
  donate,
}: EmailTemplateProps): string => {
  const formattedDate = new Date(date).toLocaleString("ru-RU", {
    timeZone: "Asia/Yerevan",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return [
    `<b>🎉 New Donor</b>`,
    ``,
    `👤 <b>Name:</b> ${fullName}`,
    `📧 <b>Email:</b> ${email}`,
    `📱 <b>Phone:</b> ${phone}`,
    `💰 <b>Amount:</b> ${money} ${currency}`,
    `📊 <b>Status:</b> ${donate}`,
    `🕒 <b>Date:</b> ${formattedDate}`,
  ].join("\n");
};
