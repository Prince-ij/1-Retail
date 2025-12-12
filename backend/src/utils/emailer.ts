import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export interface MAILOPTIONS {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const sendMail = async (mailOptions: MAILOPTIONS) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error("Problem sending mail", err as Error);
  }
};

export default sendMail;
