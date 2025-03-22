import Joi from "joi";
import { uuidSchema, verificationCode } from "../index.js";

export const emailVerifySchema = Joi.object({
  id: uuidSchema(),
  emailVerificationCode: verificationCode(),
});
