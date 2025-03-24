import { resendEmailVerifyService } from "../../services/auth/resendEmailVerifyService.js";
import { CustomError } from "../../utils/customError.js";

export const resendEmailVerifyController = async (req, res) => {
  try {
    const { email } = req.body;
    const message = await resendEmailVerifyService(email);
    res.status(200).json({ success: true, ...message });
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
