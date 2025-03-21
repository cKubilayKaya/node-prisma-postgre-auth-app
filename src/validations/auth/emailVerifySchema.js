import Joi from "joi";
import { emailVerificationCode } from "../index.js";

export const emailVerifySchema = Joi.object({
  emailVerificationCode: emailVerificationCode(),
});
