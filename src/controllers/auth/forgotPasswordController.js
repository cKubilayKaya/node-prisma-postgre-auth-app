import { forgotPasswordService } from "../../services/auth/forgotPasswordService.js";
import { CustomError } from "../../utils/customError.js";

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const forgotPassword = await forgotPasswordService(email);
    res.status(200).json({ success: true, ...forgotPassword });
  } catch (error) {
    let statusCode = 500;
    let errMessage = { message: "Internal Server Error" };

    if (error instanceof CustomError) {
      statusCode = error.statusCode;
      errMessage = JSON.parse(error.message);
    } else if (error instanceof Error) {
      errMessage = { message: error.message };
    }

    res.status(statusCode).json({ success: false, ...errMessage });
  }
};
