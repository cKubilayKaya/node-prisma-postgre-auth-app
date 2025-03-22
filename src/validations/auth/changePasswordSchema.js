import Joi from "joi";
import { emailValidation, passwordSchema, rePasswordSchema, verificationCode } from "../index.js";

export const changePasswordSchema = Joi.object({
  email: emailValidation(),
  code: verificationCode(),
  password: passwordSchema(),
  rePassword: rePasswordSchema(Joi.ref("password")),
});
