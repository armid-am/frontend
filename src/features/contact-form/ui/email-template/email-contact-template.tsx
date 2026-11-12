interface EmailTemplateProps {
  email: string;
  phone: string;
  fullName: string;
  message?: string;
}

export const EmailContactTemplate = ({
  email,
  phone,
  fullName,
  message,
}: EmailTemplateProps) => `
  <table style={{ width: "100%", maxWidth: "500px", fontFamily: "Arial" }}>
    <tbody>
      <tr>
        <td>
          <h2>New Contact Message</h2>
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
          <strong>👤 Full name:</strong> ${fullName}
        </td>
      </tr>

      <tr>
        <td>
          <strong>💬 Message:</strong> ${message}
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
