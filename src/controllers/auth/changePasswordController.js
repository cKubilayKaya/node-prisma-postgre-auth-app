import { changePasswordService } from "../../services/auth/changePasswordService.js";

export const changePasswordController = async (req, res) => {
  try {
    const { code, password, rePassword, email } = req.body;
    const changePassword = await changePasswordService(code, password, rePassword, email);
    res.status(200).json({ success: true, ...changePassword });
  } catch (error) {
    const err = typeof error.message === "string" ? error.message : JSON.parse(error.message);
    res.status(500).json({ success: false, message: err });
  }
};
