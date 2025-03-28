import { registerService } from "../../services/auth/registerService.js";

export const registerController = async (req, res, next) => {
  const data = req.body;
  try {
    const userRes = await registerService(data);
    res.status(201).json(userRes);
  } catch (error) {
    next(error);
  }
};
