import { loginService } from "../../services/auth/loginService.js";

export const loginController = async (req, res) => {
  const data = req.body;
  try {
    const { user, token } = await loginService(data);
    res.status(201).json({ success: true, user: user, token: token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
