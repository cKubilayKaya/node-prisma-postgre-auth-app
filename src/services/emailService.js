import nodemailer from "nodemailer";
import { emailConfig } from "../config/emailConfig.js";
import { CustomError } from "../utils/customError.js";

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: emailConfig.auth,
});

export const sendEmail = async (to, name, subject, html) => {
  try {
    const mailOptions = {
      from: {
        name: "Node Authentication App",
        address: emailConfig.auth.user,
      },
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    return info?.messageId;
  } catch (error) {
    console.error("Email couldn't be sent:", error);
    throw new CustomError("Email couldn't be sent.", 500);
  }
};
