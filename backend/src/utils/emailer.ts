import dotenv from "dotenv";
dotenv.config();
import logger from "./logger.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// Verify SMTP connection at startup
transporter.verify((error) => {
  if (error) {
    logger.error("1-Retail SMTP connection failed", error);
  } else {
    logger.info("1-Retail SMTP server ready");
  }
});

export const sendVerifyMail = async (
  email: string,
  link: string,
  name: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"1-Retail" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Verify your 1-Retail account",
      text: `Hello ${name},

Welcome to 1-Retail.

Please verify your email address using the link below:
${link}

If you did not create a 1-Retail account, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2>Hello ${name},</h2>
          <p>Welcome to <strong>1-Retail</strong>.</p>
          <p>Please verify your email address by clicking the button below:</p>
          <a href="${link}"
             style="display:inline-block;padding:12px 18px;background:#2563eb;color:#ffffff;text-decoration:none;border-radius:6px;">
            Verify Email
          </a>
          <p style="margin-top:16px;">
            If you did not create a 1-Retail account, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    logger.info(`1-Retail verification email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error("1-Retail verification email failed", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendResetMail = async (email: string, link: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"1-Retail" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Reset your 1-Retail password",
      text: `You requested a password reset for your 1-Retail account.

Reset your password using the link below:
${link}

If you did not request this, ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6;">
          <h2>Password Reset</h2>
          <p>You requested to reset your <strong>1-Retail</strong> password.</p>
          <a href="${link}"
             style="display:inline-block;padding:12px 18px;background:#dc2626;color:#ffffff;text-decoration:none;border-radius:6px;">
            Reset Password
          </a>
          <p style="margin-top:16px;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    });

    logger.info(`1-Retail password reset email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error("1-Retail password reset email failed", error);
    throw new Error("Failed to send reset email");
  }
};

