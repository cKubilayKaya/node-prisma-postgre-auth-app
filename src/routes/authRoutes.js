import express from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { registerSchema } from "../validations/auth/registerSchema.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { loginSchema } from "../validations/auth/loginSchema.js";
import { loginController } from "../controllers/auth/loginController.js";
import { emailVerifySchema } from "../validations/auth/emailVerifySchema.js";
import { emailVerifyController } from "../controllers/auth/emailVerifyController.js";
import { resendEmailVerifyController } from "../controllers/auth/resendEmailVerifyController.js";

const router = express.Router();

router.post("/register", validationMiddleware(registerSchema), registerController);
router.post("/login", validationMiddleware(loginSchema), loginController);
router.post("/email-verify", validationMiddleware(emailVerifySchema), emailVerifyController);
router.post("/resend-email", resendEmailVerifyController);

export default router;
