import Joi from "joi";
import { emailValidation, verificationCode } from "../index.js";

export const emailVerifySchema = Joi.object({
  email: emailValidation(),
  emailVerificationCode: verificationCode(),
});
