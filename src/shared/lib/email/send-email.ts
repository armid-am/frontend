import "server-only";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async ({
  adminData,
  userEmail,
  adminSubject = "Message for Identity Foundation",
  userSubject = "Message for Identity Foundation",
  adminTemplate,
  userTemplate,
}: {
  adminData: any;
  userEmail: string;
  adminSubject?: string;
  userSubject?: string;
  adminTemplate: (data: any) => string;
  userTemplate: (data: any) => string;
}) => {
  const [adminResult, userResult] = await Promise.allSettled([
    transporter.sendMail({
      from: `"Identity Foundation / Ինքնություն հիմնադրամ" <${process.env.GMAIL_USER}>`,
      replyTo: "info.armid.am@gmail.com",
      to: "info.armid.am@gmail.com",
      subject: adminSubject,
      html: adminTemplate(adminData),
    }),
    transporter.sendMail({
      from: `"Identity Foundation / Ինքնություն հիմնադրամ" <${process.env.GMAIL_USER}>`,
      replyTo: "info.armid.am@gmail.com",
      to: userEmail,
      subject: userSubject,
      html: userTemplate(adminData),
    }),
  ]);

  if (adminResult.status === "rejected") throw adminResult.reason;
  if (userResult.status === "rejected") {
    console.error("Failed to send confirmation email:", userResult.reason);
  }

  return adminResult.value.response;
};
