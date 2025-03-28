import jwt from "jsonwebtoken";
import prisma from "../../utils/prisma.js";
import excludeFieldsFromArray from "../../utils/excludeFieldsFromArray.js";
import { CustomError } from "../../utils/customError.js";

export const profileService = async (data, token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new CustomError("Invalid token!", 400);
  const id = decodedUser?.id;

  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });

  const excludeFileds = [
    "id",
    "password",
    "emailVerificationCode",
    "isEmailVerified",
    "emailVerificationCreatedAt",
    "passwordResetCode",
    "passwordResetExpires",
    "wrongLoginAttempts",
    "isBlocked",
  ];

  const filteredUser = excludeFieldsFromArray(excludeFileds, updatedUser);

  return { success: true, user: filteredUser };
};
