import { isUserExist } from "../../utils/isUserExist.js";
import prisma from "../../utils/prisma.js";

export const emailVerifyService = async (emailVerificationCode, id) => {
  if (!emailVerificationCode || !id) {
    throw new Error("Both emailVerificationCode and id are required!");
  }

  const user = await isUserExist({ key: "id", value: id }, true);

  if (!user) throw new Error("There is no such a user!");
  if (user?.isEmailVerified) throw new Error("This user is already verified!");
  if (user?.emailVerificationCode !== emailVerificationCode) throw new Error("Wrong Email Verification Code!");

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { isEmailVerified: true },
  });

  const { id: userId, password, ...filteredUser } = updatedUser;

  return filteredUser;
};
