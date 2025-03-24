import { emailVerifyService } from "../../services/auth/emailVerifyService.js";

export const emailVerifyController = async (req, res) => {
  try {
    const { emailVerificationCode, email } = req.body;
    const updatedUser = await emailVerifyService(emailVerificationCode, email);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
