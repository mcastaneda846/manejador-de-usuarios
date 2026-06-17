import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWelcomeEmail(
  to: string,
  name: string,
  email: string
) {
  await transporter.sendMail({
    from: `"Sistema" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Bienvenido a la plataforma",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Hola ${name}</h2>
        <p>Tu cuenta fue creada exitosamente.</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>
    `,
  });
}