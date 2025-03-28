import { emailVerifyService } from "../../services/auth/emailVerifyService.js";

export const emailVerifyController = async (req, res, next) => {
  try {
    const { emailVerificationCode, email } = req.body;
    const emailVerifyRes = await emailVerifyService(emailVerificationCode, email);
    res.status(200).json(emailVerifyRes);
  } catch (error) {
    next(error);
  }
};
