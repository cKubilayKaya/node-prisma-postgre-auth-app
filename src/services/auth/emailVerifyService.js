import { isUserExist } from "../../utils/isUserExist.js";
import prisma from "../../utils/prisma.js";
import bcrypt from "bcrypt";
import { verifyTimeLimit } from "../../utils/verifyTimeLimit.js";

export const emailVerifyService = async (emailVerificationCode, email) => {
  const user = await isUserExist({ key: "email", value: email }, true);

  if (!user) throw new Error("There is no such a user!");
  if (user?.isEmailVerified) throw new Error("This user is already verified!");

  verifyTimeLimit(user, "emailVerificationCreatedAt");

  const isMatch = await bcrypt.compare(emailVerificationCode, user.emailVerificationCode);
  if (!isMatch) throw new Error("Wrong Email Verification Code!");

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      isEmailVerified: true,
      emailVerificationCode: null,
      emailVerificationCreatedAt: null,
    },
  });

  const {
    id: userId,
    password,
    emailVerificationCode: userEmailVerificationCode,
    passwordResetCode,
    emailVerificationCreatedAt,
    passwordResetExpires,
    wrongLoginAttempts,
    isBlocked,
    ...filteredUser
  } = updatedUser;

  return filteredUser;
};
