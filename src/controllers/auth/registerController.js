import { registerService } from "../../services/auth/registerSerice.js";

export const registerController = async (req, res) => {
  const data = req.body;
  try {
    const user = await registerService(data);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
