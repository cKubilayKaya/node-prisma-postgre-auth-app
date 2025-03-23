import { meService } from "../../services/auth/meService.js";

export const meController = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { userObject } = await meService(token);
    res.status(200).json({ success: true, user: userObject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
