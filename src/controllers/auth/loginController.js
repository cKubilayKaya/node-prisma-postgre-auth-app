import { loginService } from "../../services/auth/loginService.js";

export const loginController = async (req, res, next) => {
  const data = req.body;
  try {
    const loginRes = await loginService(data);
    res.status(200).json(loginRes);
  } catch (error) {
    next(error);
  }
};
