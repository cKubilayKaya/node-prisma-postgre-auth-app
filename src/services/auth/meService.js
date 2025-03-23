import { isUserExist } from "../../utils/isUserExist.js";
import jwt from "jsonwebtoken";

export const meService = async (token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new Error("Invalid token!");
  const user = await isUserExist({ key: "id", value: decodedUser?.id }, true);

  const { password, ...userObject } = user;

  return { userObject };
};
