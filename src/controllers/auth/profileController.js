import { profileService } from "../../services/auth/profileService.js";

export const profileController = async (req, res, next) => {
  try {
    const data = req.body;
    const token = req?.header("Authorization")?.includes(" ") ? req?.header("Authorization")?.split(" ")[1] : req?.header("Authorization");
    const profileRes = await profileService(data, token);
    res.status(200).json(profileRes);
  } catch (error) {
    next(error);
  }
};
