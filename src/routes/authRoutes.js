import express from "express";
import { registerController } from "../controllers/auth/registerController.js";
import { registerSchema } from "../validations/auth/registerSchema.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { loginSchema } from "../validations/auth/loginSchema.js";
import { loginController } from "../controllers/auth/loginController.js";
import { emailVerifySchema } from "../validations/auth/emailVerifySchema.js";
import { emailVerifyController } from "../controllers/auth/emailVerifyController.js";
import { resendEmailVerifyController } from "../controllers/auth/resendEmailVerifyController.js";
import { forgotPasswordController } from "../controllers/auth/forgotPasswordController.js";
import { changePasswordController } from "../controllers/auth/changePasswordController.js";
import { forgotPasswordSchema } from "../validations/auth/forgotPasswordSchema.js";
import { resendEmailSchema } from "../validations/auth/resendEmailSchema.js";
import { changePasswordSchema } from "../validations/auth/changePasswordSchema.js";
import { meController } from "../controllers/auth/meController.js";
import { authenticateUser } from "../middleware/authenticateUser.js";
import { profileController } from "../controllers/auth/profileController.js";

const router = express.Router();

router.post("/register", validationMiddleware(registerSchema), registerController);
router.post("/login", validationMiddleware(loginSchema), loginController);

router.post("/email-verify", validationMiddleware(emailVerifySchema), emailVerifyController);
router.post("/resend-email", validationMiddleware(resendEmailSchema), resendEmailVerifyController);

router.post("/forgot-password", validationMiddleware(forgotPasswordSchema), forgotPasswordController);
router.post("/change-password", validationMiddleware(changePasswordSchema), changePasswordController);

router.get("/me", authenticateUser, meController);
router.put("/profile", authenticateUser, profileController);

export default router;
