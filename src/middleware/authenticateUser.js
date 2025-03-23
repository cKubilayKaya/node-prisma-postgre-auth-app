import jwt from "jsonwebtoken";
import { isUserExist } from "../utils/isUserExist.js";

export const authenticateUser = async (req, res, next) => {
  const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");

  if (!token) {
    return res.status(401).json({ success: false, message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded?.id) throw new Error("Invalid token!");

    const id = decoded?.id;
    const user = await isUserExist({ key: "id", value: id }, true);

    if (!user) throw new Error("User doesnt exist!");
    if (!user?.isEmailVerified) throw new Error("This user's email is not verified!");
    if (user?.isBlocked) throw new Error("This user is blocked! Please change your password for unblock your account.");

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
