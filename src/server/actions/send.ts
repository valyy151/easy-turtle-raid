"use server";
import nodemailer from "nodemailer";

export async function sendMail({
  raid,
  boss,
  suggestion,
}: {
  raid: string;
  boss: string;
  suggestion: string;
}) {
  const username = process.env.EMAIL_USERNAME;
  const password = process.env.EMAIL_PASSWORD;
  const myEmail = process.env.PERSONAL_EMAIL;

  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },

    auth: {
      user: username,
      pass: password,
    },
  });
  try {
    await transporter.sendMail({
      from: username,
      to: myEmail,
      subject: `Suggestion for ${raid} - ${boss}`,
      html: `<p>${suggestion}</p>`,
    });
  } catch (error) {
    console.log(error);
  }
}
