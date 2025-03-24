import prisma from "../../utils/prisma.js";
import { sendEmail } from "../emailService.js";
import bcrypt from "bcrypt";
import { generateVerificationCode } from "../../utils/generateVerificationCode.js";
import { forgotPasswordHTML } from "../../email-templates/forgotPasswordHTML.js";
import { codeTimeLimit } from "../../utils/codeTimeLimit.js";
import { CustomError } from "../../utils/customError.js";

export const forgotPasswordService = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("No user found with this email!");

  try {
    codeTimeLimit(user, "passwordResetExpires");
  } catch (error) {
    throw new CustomError(error.message, 429);
  }

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
