import prisma from "./prisma.js";

export const isUserExist = async (email, username) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  if (existingUser) throw new Error("This user already exists.");

  return existingUser;
};
