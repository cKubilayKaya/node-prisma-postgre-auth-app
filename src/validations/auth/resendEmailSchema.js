import Joi from "joi";
import { emailValidation } from "../index.js";

export const resendEmailSchema = Joi.object({
  email: emailValidation(),
});
