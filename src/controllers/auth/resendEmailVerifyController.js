import { resendEmailVerifyService } from "../../services/auth/resendEmailVerifyService.js";
import { CustomError } from "../../utils/customError.js";

export const resendEmailVerifyController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const resendEmailVerifyRes = await resendEmailVerifyService(email);
    res.status(200).json(resendEmailVerifyRes);
  } catch (error) {
    next(error);
  }
};
