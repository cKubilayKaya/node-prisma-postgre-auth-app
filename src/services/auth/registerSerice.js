import bcrypt from "bcrypt";
import { isUserExist } from "../../utils/isUserExist.js";
import prisma from "../../utils/prisma.js";

export const registerService = async (data) => {
  const { fullname, username, email, password } = data;
  await isUserExist(email, username);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return await prisma.user.create({
    data: {
      fullname: fullname,
      username: username,
      email: email,
      password: hashedPassword,
    },
  });
};
