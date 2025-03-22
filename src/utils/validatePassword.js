import bcrypt from "bcrypt";
import prisma from "./prisma.js";

export const validatePassword = async (unHashedPassword, user) => {
  const userUpdate = async (block, number) => {
    return await prisma.user.update({
      where: { id: user?.id },
      data: {
        isBlocked: block,
        wrongLoginAttempts: number,
      },
    });
  };

  const password = await bcrypt.compare(unHashedPassword, user?.password);
  const wrongLoginAttempsNumber = user?.wrongLoginAttempts + 1;

  if (!password) {
    if (wrongLoginAttempsNumber === 5) {
      await userUpdate(true, wrongLoginAttempsNumber);
      throw new Error("Your account is blocked! Change your password for unblock your account.");
    } else {
      await userUpdate(false, wrongLoginAttempsNumber);
      throw new Error(`Invalid Password! You have ${5 - wrongLoginAttempsNumber} incorrect entries left.`);
    }
  }

  await userUpdate(false, 0);

  return password;
};
