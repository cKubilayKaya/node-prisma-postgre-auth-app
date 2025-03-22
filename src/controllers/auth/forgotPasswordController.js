import { forgotPasswordService } from "../../services/auth/resetPasswordService.js";

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const forgotPassword = await forgotPasswordService(email);
    res.status(200).json({ success: true, ...forgotPassword });
  } catch (error) {
    res.status(500).json({ success: false, message: JSON.parse(error.message) });
  }
};
