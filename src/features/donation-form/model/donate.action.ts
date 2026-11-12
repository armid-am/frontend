"use server";
/* eslint-disable @typescript-eslint/no-unused-vars */

// Карта соответствия цифровых кодов валют к буквенным
// const currencyMap: Record<string, string> = {
//   "051": "AMD",
//   "840": "USD",
//   "978": "EUR",
//   "643": "RUB",
// };

export async function donateAction(doc: any) {
  if (!doc) {
    throw new Error("no data");
  }

  // Преобразуем числовой код валюты в буквенный
  // const currencyCode = currencyMap[doc.currency] || doc.currency;

  const code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  const res = await fetch("https://pg.inecoecom.am/payment/rest/register.do", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: process.env.INECO_USERNAME!,
      password: process.env.INECO_PASSWORD!,
      OrderNumber: `n_${code}`,
      amount: Number(doc.money) * 100,
      returnUrl: "https://www.armid.am/donation",
      description: "Donation for Identity Cultural Foundation",
      language: "hy",
      pageView: "DESKTOP",
      recurrenceType: "AUTO",
      recurrenceFrequency: "000001",
      currency: "051",
      phone: "+37433399924",
    }),
  });

  const data = await res.json();
  // Проверяем на ошибки от платежного шлюза
  if (data.errorCode === "2" || data.errorMessage) {
    console.error("Payment gateway error:", data);
    throw new Error(data.errorMessage || "Payment registration failed");
  }
  // const { currency, ...rest } = doc;

  return data.formUrl;
}
