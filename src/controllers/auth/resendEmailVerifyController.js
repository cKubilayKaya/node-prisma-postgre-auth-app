import { resendEmailVerifyService } from "../../services/auth/resendEmailVerifyService.js";

export const resendEmailVerifyController = async (req, res) => {
  try {
    const { email } = req.body;
    const message = await resendEmailVerifyService(email);
    res.status(200).json({ success: true, ...message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
