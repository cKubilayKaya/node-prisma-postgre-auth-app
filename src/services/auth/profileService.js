import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma.js";

export const profileService = async (data, token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new Error("Invalid token!");
  const id = decodedUser?.id;

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });

  const {
    id: userId,
    password: userPassword,
    emailVerificationCode: userEmailVerificationCode,
    isEmailVerified,
    emailVerificationCreatedAt,
    passwordResetCode,
    passwordResetExpires,
    wrongLoginAttempts,
    isBlocked,
    ...userObject
  } = updatedUser;

  return { userObject };
};
