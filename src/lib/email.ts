import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: Number(process.env.SMTP_PORT) === 465,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

type InquiryEmailData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  property?: string;
};

export async function sendInquiryAdminEmail(inquiry: InquiryEmailData) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM;

  if (!adminEmail) {
    throw new Error("ADMIN_NOTIFICATION_EMAIL is not configured");
  }

  if (!from) {
    throw new Error("EMAIL_FROM is not configured");
  }

  await transporter.sendMail({
    from,

    to: adminEmail,

    // Clicking Reply sends the response to the customer
    replyTo: inquiry.email,

    subject: `New inquiry from ${inquiry.name}`,

    text: `
A new inquiry has been received.

Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || "Not provided"}
Property: ${inquiry.property || "General inquiry"}

Message:

${inquiry.message}
    `.trim(),
  });
}
