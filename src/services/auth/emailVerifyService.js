import { isUserExist } from "../../utils/isUserExist.js";
import prisma from "../../utils/prisma.js";
import bcrypt from "bcrypt";

export const emailVerifyService = async (emailVerificationCode, id) => {
  if (!emailVerificationCode || !id) {
    throw new Error("Both emailVerificationCode and id are required!");
  }

  const user = await isUserExist({ key: "id", value: id }, true);

  if (!user) throw new Error("There is no such a user!");
  if (user?.isEmailVerified) throw new Error("This user is already verified!");

  const isMatch = await bcrypt.compare(emailVerificationCode, user.emailVerificationCode);
  if (!isMatch) throw new Error("Wrong Email Verification Code!");

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { isEmailVerified: true },
  });

  const { id: userId, password, ...filteredUser } = updatedUser;

  return filteredUser;
};
