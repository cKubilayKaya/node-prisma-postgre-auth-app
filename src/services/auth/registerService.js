import bcrypt from "bcrypt";
import { isUserExist } from "../../utils/isUserExist.js";
import prisma from "../../utils/prisma.js";
import { sendEmail } from "../emailService.js";
import { generateVerificationCode } from "../../utils/generateVerificationCode.js";
import { emailVerificationHTML } from "../../email-templates/emailVerificationHTML.js";
import { CustomError } from "../../utils/customError.js";
import excludeFieldsFromArray from "../../utils/excludeFieldsFromArray.js";

export const registerService = async (data) => {
  const { fullname, username, email, password } = data;

  const expirationTime = new Date(Date.now() + Number(process.env.VERIFICATION_TIME_LIMIT));
  expirationTime.setUTCHours(expirationTime.getUTCHours() + 3);

  await isUserExist({ key: "email", value: email }, false);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const emailVerificationCode = generateVerificationCode();
  const hashedEmailVerificationCode = await bcrypt.hash(emailVerificationCode, 10); // Hash'le

  const user = await prisma.user.create({
    data: {
      fullname: fullname,
      username: username,
      email: email,
      password: hashedPassword,
      emailVerificationCode: hashedEmailVerificationCode,
      emailVerificationCreatedAt: expirationTime,
    },
  });

  const emailResponse = await sendEmail(email, fullname, "Email Verification Code", emailVerificationHTML(emailVerificationCode));

  if (!emailResponse || emailResponse.error) throw new CustomError("Email couldn't be sent.", 500);

  const excludeFileds = [
    "id",
    "password",
    "emailVerificationCode",
    "isEmailVerified",
    "emailVerificationCreatedAt",
    "passwordResetCode",
    "passwordResetExpires",
    "wrongLoginAttempts",
    "isBlocked",
  ];

  const filteredUser = excludeFieldsFromArray(excludeFileds, user);

  return { success: true, user: filteredUser };
};
