import { isUserExist } from "../../utils/isUserExist.js";
import { validatePassword } from "../../utils/validatePassword.js";
import jwt from "jsonwebtoken";

export const loginService = async (data) => {
  const { email, password } = data;
  const user = await isUserExist({ key: "email", value: email }, true);

  if (!user) throw new Error("Email or password is not correct!");
  if (user?.isBlocked) throw new Error("This user is blocked! Please change your password for unblock your account.");
  if (!user?.isEmailVerified) throw new Error("This user's email is not verified!");

  await validatePassword(password, user);

  const userObject = { id: user.id, email: user.email, username: user?.username, fullname: user?.fullname };

  const token = jwt.sign(userObject, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return { token, userObject };
};
