import nodemailer from 'nodemailer';

export async function sendAdminNotification(subject: string, htmlBody: string) {
  try {
    // We expect an SMTP connection string or test credentials
    // For this demonstration, if not provided we log the email
    const transporter = nodemailer.createTransport(
      process.env.EMAIL_SERVER || {
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "test@ethereal.email",
          pass: "testpass",
        },
      }
    );

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"TinyStrophic Web Studio" <noreply@tinystrophic.co.za>',
      to: process.env.ADMIN_EMAIL || 'admin@tinystrophic.co.za', // Admin's email
      subject: subject,
      html: htmlBody,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email", error);
  }
}
