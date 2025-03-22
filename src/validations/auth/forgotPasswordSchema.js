import Joi from "joi";
import { emailValidation } from "../index.js";

export const forgotPasswordSchema = Joi.object({
  email: emailValidation(),
});
