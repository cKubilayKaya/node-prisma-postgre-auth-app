import prisma from "../../utils/prisma.js";
import { sendEmail } from "../emailService.js";
import bcrypt from "bcrypt";
import { changePasswordHTML } from "../../email-templates/changePasswordHTML.js";
import { isUserExist } from "../../utils/isUserExist.js";
import { verifyTimeLimit } from "../../utils/verifyTimeLimit.js";

export const changePasswordService = async (code, password, rePassword, email) => {
  const user = await isUserExist({ key: "email", value: email }, true);
  if (!user) throw new Error("No user found with this email!");

  verifyTimeLimit(user, "passwordResetExpires");

  const isCodeValid = await bcrypt.compare(code, user.passwordResetCode);
  if (!isCodeValid) throw new Error("Invalid reset code.");

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      passwordResetCode: null,
      passwordResetExpires: null,
      isBlocked: false,
      wrongLoginAttempts: 0,
    },
  });

  const emailResponse = await sendEmail(email, user.fullname, "Password Reset Confirmation!", changePasswordHTML());

  if (!emailResponse || emailResponse.error) throw new Error("Email couldn't be sent.");

  return { message: "Password updated successfully!" };
};
