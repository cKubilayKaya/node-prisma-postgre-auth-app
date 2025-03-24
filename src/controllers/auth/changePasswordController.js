import { changePasswordService } from "../../services/auth/changePasswordService.js";

export const changePasswordController = async (req, res) => {
  try {
    const { code, password, rePassword, email } = req.body;
    const changePassword = await changePasswordService(code, password, rePassword, email);
    res.status(200).json({ success: true, ...changePassword });
  } catch (error) {
    let errMessage;

    if (error instanceof Error) {
      try {
        errMessage = JSON.parse(error.message);
      } catch {
        errMessage = { message: error.message };
      }
    } else {
      errMessage = { message: String(error) };
    }

    res.status(500).json({ success: false, ...errMessage });
  }
};
