interface EmailTemplateProps {
  email: string;
  phone: string;
  fullName: string;
  money: string;
  date: Date;
  currency: string;
  donate: string;
}

export const EmailDonorTemplate = ({
  email,
  phone,
  fullName,
  money,
  date,
  currency,
  donate,
}: EmailTemplateProps) => `
  <table style={{ width: "100%", maxWidth: "500px", fontFamily: "Arial" }}>
    <tbody>
      <tr>
        <td>
          <h2>New Donor Message</h2>
        </td>
      </tr>
      <tr>
        <td>
          <strong>👤 Full name:</strong> ${fullName}
        </td>
      </tr>

      <tr>
        <td>
          <strong>📧 Email:</strong> ${email}
        </td>
      </tr>

      <tr>
        <td>
          <strong>📱 Phone:</strong> ${phone}
        </td>
      </tr>

      <tr>
        <td>
          <strong>💰 Amount:</strong> ${money} ${currency}
        </td>
      </tr>

      <tr>
        <td>
          <strong>📊 Status:</strong> ${donate}
        </td>
      </tr>

      <tr>
        <td>
          <strong>🕒 Date:</strong>
          ${new Date(date).toLocaleString("ru-RU", {
            timeZone: "Asia/Yerevan",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>
      </tr>
    </tbody>
  </table>
`;
