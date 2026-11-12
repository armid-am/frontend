export const EmailDonorTemplateUserEn = ({
  status,
}: {
  status: "success" | "fail";
}) => `
  <div style="width: 100%; max-width: 500px; font-family: Arial;">
    ${
      status === "success"
        ? "<p>Thank you for your trust and support</p>"
        : "<p>Unfortunately, your donation could not be processed at this time. Please try again or verify the accuracy of your payment information.</p>"
    }
    ${
      status === "success"
        ? "<p>We are pleased to inform you that your donation has been successfully processed.</p>"
        : "<p>Your support will have a significant impact on the work of documenting Armenian culture.</p>"
    }
    ${
      status === "success"
        ? `<div>
             <p>It will have a significant impact on the work of documenting Armenian culture.</p>
             <p>We are grateful for joining the Identity Foundation community and creating value together.</p>
           </div>`
        : "<p>We appreciate your desire to join the Identity Foundation community.</p>"
    }
    <p>Sincerely, Identity Foundation</p>
  </div>
`;
