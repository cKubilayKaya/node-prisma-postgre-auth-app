import Joi from "joi";
import { emailValidation, fullnameValidation, passwordSchema, usernameSchema } from "../index.js";

export const loginSchema = Joi.object({
  email: emailValidation(),
  password: passwordSchema(),
});
