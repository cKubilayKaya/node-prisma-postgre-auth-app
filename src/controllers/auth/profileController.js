import { meService } from "../../services/auth/meService.js";
import { profileService } from "../../services/auth/profileService.js";

export const profileController = async (req, res) => {
  try {
    const data = req.body;
    const token = req.headers.authorization;
    const { userObject } = await profileService(data, token);
    res.status(200).json({ success: true, user: userObject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
