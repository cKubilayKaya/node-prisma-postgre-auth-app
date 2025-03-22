import { loginService } from "../../services/auth/loginService.js";

export const loginController = async (req, res) => {
  const data = req.body;
  try {
    const { filteredUser, token } = await loginService(data);
    res.status(201).json({ success: true, user: filteredUser, token: token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
