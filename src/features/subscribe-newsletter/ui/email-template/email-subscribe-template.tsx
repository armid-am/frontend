interface EmailTemplateProps {
  email: string;
  phone: string;
}

export const EmailSubscribeTemplate = ({
  email,
  phone,
}: EmailTemplateProps) => `
  <table style={{ width: "100%", maxWidth: "500px", fontFamily: "Arial" }}>
    <tbody>
      <tr>
        <td>
          <h2>New Subscribe Message</h2>
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
          <strong>🕒 Date:</strong>
          ${new Date().toLocaleString("ru-RU", {
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
