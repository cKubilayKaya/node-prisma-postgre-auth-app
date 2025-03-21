import crypto from "crypto";

export const generateVerificationCode = (number) => {
  return crypto.randomBytes(number).toString("hex"); // 6 haneli hexadecimal
};
