import { CustomError } from "../../utils/customError.js";
import { isUserExist } from "../../utils/isUserExist.js";
import { validatePassword } from "../../utils/validatePassword.js";
import jwt from "jsonwebtoken";

export const loginService = async (data) => {
  const { email, password } = data;
  const user = await isUserExist({ key: "email", value: email }, true);

  if (!user) throw new CustomError("Email or password is not correct!", 401);
  if (user?.isBlocked) throw new CustomError("This user is blocked! Please reset your password to unblock your account.", 403);
  if (!user?.isEmailVerified) throw new CustomError("This user's email is not verified!", 403);

  await validatePassword(password, user);

  const userObject = { id: user.id, email: user.email, username: user?.username, fullname: user?.fullname };

  const token = jwt.sign(userObject, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return { success: true, token, user: userObject };
};
