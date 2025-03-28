import jwt from "jsonwebtoken";
import { isUserExist } from "../utils/isUserExist.js";
import { CustomError } from "../utils/customError.js";

export const authenticateUser = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");

  if (!token) return next(new CustomError("Token is missing.", 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded?.id) return next(new CustomError("Invalid token!", 400));

    const id = decoded?.id;
    const user = await isUserExist({ key: "id", value: id }, true);

    if (!user) return next(new CustomError("User doesn't exist!", 404));
    if (!user?.isEmailVerified) return next(new CustomError("This user's email is not verified!", 403));
    if (user?.isBlocked) return next(new CustomError("This user is blocked! Please change your password for unblock your account.", 403));

    req.user = decoded;
    next();
  } catch (error) {
    next(new CustomError("Invalid or expired token.", 401));
  }
};
