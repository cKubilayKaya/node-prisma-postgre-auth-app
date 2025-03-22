import prisma from "../../utils/prisma.js";
import { sendEmail } from "../emailService.js";
import bcrypt from "bcrypt";
import { generateVerificationCode } from "../../utils/generateVerificationCode.js";
import { forgotPasswordHTML } from "../../email-templates/forgotPasswordHTML.js";
import { resendCodeTimeLimit } from "../../utils/resendVerificationTimeLimit.js";

export const forgotPasswordService = async (email) => {
  if (!email) throw new Error("Email is required!");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("No user found with this email!");

  resendCodeTimeLimit(user, "passwordResetExpires");

  const resetCode = generateVerificationCode();
  const hashedCode = await bcrypt.hash(resetCode, 10);

  const expirationTime = new Date(Date.now() + Number(process.env.VERIFICATION_TIME_LIMIT));
  expirationTime.setUTCHours(expirationTime.getUTCHours() + 3);

  await prisma.user.update({
    where: { email },
    data: {
      passwordResetCode: hashedCode,
      passwordResetExpires: expirationTime,
    },
  });

  const emailResponse = await sendEmail(email, user.fullname, "Password Reset Code", forgotPasswordHTML(resetCode));

  if (!emailResponse || emailResponse.error) throw new Error("Email couldn't be sent.");

  return { message: "Password reset code sent successfully!" };
};
