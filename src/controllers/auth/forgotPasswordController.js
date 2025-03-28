import { forgotPasswordService } from "../../services/auth/forgotPasswordService.js";

export const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const forgotPasswordRes = await forgotPasswordService(email);
    res.status(200).json(forgotPasswordRes);
  } catch (error) {
    next(error);
  }
};
