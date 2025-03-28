import bcrypt from "bcrypt";
import prisma from "./prisma.js";
import { CustomError } from "./customError.js";

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
      throw new CustomError("Your account is blocked! Change your password for unblock your account.", 403);
    } else {
      await userUpdate(false, wrongLoginAttempsNumber);
      throw new CustomError(`Invalid Password! You have ${5 - wrongLoginAttempsNumber} incorrect entries left.`, 401);
    }
  }

  await userUpdate(false, 0);

  return password;
};
