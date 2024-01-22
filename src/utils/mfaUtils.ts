import nodemailer from "nodemailer";

import {
  SENDINBLUE_USER,
  SENDINBLUE_PASSWORD,
  SENDINBLUE_HOST,
  FROM_ADMIN_MAIL,
  USER_SUBJECT,
  SENDINBLUE_PORT,
} from "../config";

// OTP FUNCTION
export const GenerateOtp = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiry = new Date();

  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

// EMAIL FUNCTION

let transport = nodemailer.createTransport({
  host: SENDINBLUE_HOST,
  port: SENDINBLUE_PORT,
  auth: {
    user: SENDINBLUE_USER,
    pass: SENDINBLUE_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
export const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  try {
    const response = await transport.sendMail({
      from: FROM_ADMIN_MAIL,
      to,
      subject: USER_SUBJECT,
      html,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
export const emailHtml = (otp: number): string => {
  const template = `
    <div style="max-width:700px; font-size:110%; border:10px solid #ddd; padding: 50px 20px; margin: auto;">
        <h2 style = "text-transform: uppercase; text-align: center; color: lilac;">Welcome to S-Ecommerce</h2>
        <p>Hi there, your otp is ${otp}, it will expire in 30 minutes.</p>
    </div>
    `;
  return template;
};












