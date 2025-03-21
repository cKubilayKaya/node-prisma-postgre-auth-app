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
    if (existingUser) throw new Error("This user already exists.");
  }
};
