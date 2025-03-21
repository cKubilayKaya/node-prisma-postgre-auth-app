import Joi from "joi";
import { emailValidation, fullnameValidation, passwordSchema, usernameSchema } from "../index.js";

export const registerSchema = Joi.object({
  fullname: fullnameValidation(),
  email: emailValidation(),
  username: usernameSchema(),
  password: passwordSchema(),
});
