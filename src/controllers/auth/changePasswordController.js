import { changePasswordService } from "../../services/auth/changePasswordService.js";

export const changePasswordController = async (req, res, next) => {
  try {
    const { code, password, rePassword, email } = req.body;
    const changePasswordRes = await changePasswordService(code, password, rePassword, email);
    res.status(200).json(changePasswordRes);
  } catch (error) {
    next(error);
  }
};
