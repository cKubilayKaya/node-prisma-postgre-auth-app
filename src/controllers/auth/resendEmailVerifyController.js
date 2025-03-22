import { resendEmailVerifyService } from "../../services/auth/resendEmailVerifyService.js";

export const resendEmailVerifyController = async (req, res) => {
  try {
    const { email } = req.body;
    const message = await resendEmailVerifyService(email);
    res.status(200).json({ success: true, ...message });
  } catch (error) {
    const err = typeof error.message === "string" ? error.message : JSON.parse(error.message);
    res.status(500).json({ success: false, message: err });
  }
};
