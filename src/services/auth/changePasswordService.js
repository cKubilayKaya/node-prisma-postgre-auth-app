import prisma from "../../utils/prisma.js";
import { sendEmail } from "../emailService.js";
import bcrypt from "bcrypt";
import { changePasswordHTML } from "../../email-templates/changePasswordHTML.js";
import { isUserExist } from "../../utils/isUserExist.js";
import { verifyTimeLimit } from "../../utils/verifyTimeLimit.js";
import { CustomError } from "../../utils/customError.js";

export const changePasswordService = async (code, password, rePassword, email) => {
  const user = await isUserExist({ key: "email", value: email }, true);
  if (!user) throw new CustomError("No user found with this email!", 404);

  verifyTimeLimit(user, "passwordResetExpires");

  const isCodeValid = await bcrypt.compare(code, user.passwordResetCode);
  if (!isCodeValid) throw new CustomError("Invalid reset code.", 400);

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
  if (!emailResponse || emailResponse.error) throw new CustomError("Email couldn't be sent.", 500);

  return { success: true, message: "Password updated successfully!" };
};
