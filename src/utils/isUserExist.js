import { CustomError } from "./customError.js";
import prisma from "./prisma.js";

export const isUserExist = async (field, findByEmailOrUsername = false) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      [field.key]: field.value,
    },
  });

  if (findByEmailOrUsername) {
    return existingUser;
  } else {
    if (existingUser) throw new CustomError("This user already exists.", 409);
  }
};
