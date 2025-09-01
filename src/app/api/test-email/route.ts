import { NextResponse, NextRequest } from "next/server";
import * as SibApiV3Sdk from "@sendinblue/client";
// import { getEmailTemplate } from "@/utils/emailUtils";

export async function POST(req: NextRequest) {
  try {
    const { toEmail, subject, templateName, templateData } = await req.json();

    // const htmlContent = getEmailTemplate(templateName, templateData);
    const client = new SibApiV3Sdk.TransactionalEmailsApi();

    client.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY as string
    );

    const emailData = {
      sender: { email: "no-reply@yourdomain.com", name: "Your Brand" },
      to: [{ email: toEmail }],
      subject: subject,
      htmlContent: `<div>Hello</div>`,
      // ... additional configuration
    };

    const response = await client.sendTransacEmail(emailData);
    return NextResponse.json({ success: true, response });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "An error occurred while sending the email" },
      { status: 500 }
    );
  }
}

// // app/api/send/route.ts
// import { NextResponse } from "next/server";
// import * as brevo from "@getbrevo/brevo";

// let apiInstance = new brevo.TransactionalEmailsApi();
// apiInstance.setApiKey(
//   brevo.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY!
// );

// export async function POST(req: Request) {
//   try {
//     const { email, name, subject, message } = await req.json();

//     let sendSmtpEmail = new brevo.SendSmtpEmail();

//     sendSmtpEmail.to = [{ email: email, name: name }];
//     sendSmtpEmail.sender = { name: "Your App", email: email }; // Can use any email initially
//     sendSmtpEmail.subject = subject || "Welcome!";
//     sendSmtpEmail.htmlContent = `
//       <div style="font-family: Arial, sans-serif;">
//         <h1>Hi ${name}!</h1>
//         <p>${message || "Welcome to our app!"}</p>
//       </div>
//     `;

//     const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("Brevo error:", error);
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }
