import { CustomError } from "../../utils/customError.js";
import excludeFieldsFromArray from "../../utils/excludeFieldsFromArray.js";
import { isUserExist } from "../../utils/isUserExist.js";
import jwt from "jsonwebtoken";

export const meService = async (token) => {
  const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedUser?.id) throw new CustomError("Invalid token!", 400);
  const user = await isUserExist({ key: "id", value: decodedUser?.id }, true);

  const excludeFileds = ["password"];
  const filteredUser = excludeFieldsFromArray(excludeFileds, user);

  return { success: true, user: filteredUser };
};
