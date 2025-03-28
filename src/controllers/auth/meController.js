import { meService } from "../../services/auth/meService.js";

export const meController = async (req, res, next) => {
  try {
    const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
    const meRes = await meService(token);
    res.status(200).json(meRes);
  } catch (error) {
    next(error);
  }
};
