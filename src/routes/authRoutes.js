import express from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { registerSchema } from "../validations/auth/registerSchema.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/register", validationMiddleware(registerSchema), registerController);

export default router;
