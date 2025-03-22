import { isUserExist } from "../../utils/isUserExist.js";
import prisma from "../../utils/prisma.js";
import bcrypt from "bcrypt";
import { generateVerificationCode } from "../../utils/generateVerificationCode.js";
import { sendEmail } from "../emailService.js";
import { emailVerificationHTML } from "../../email-templates/emailVerificationHTML.js";
import { codeTimeLimit } from "../../utils/codeTimeLimit.js";

export const resendEmailVerifyService = async (email) => {
  const user = await isUserExist({ key: "email", value: email }, true);

  if (!user) throw new Error("There is no such a user!");
  if (user?.isEmailVerified) throw new Error("This user is already verified!");

  codeTimeLimit(user, "emailVerificationCreatedAt");

  const newVerificationCode = generateVerificationCode();
  const hashedVerificationCode = await bcrypt.hash(newVerificationCode, 10);

  const expirationTime = new Date(Date.now() + Number(process.env.VERIFICATION_TIME_LIMIT));
  expirationTime.setUTCHours(expirationTime.getUTCHours() + 3);

  await prisma.user.update({
    where: { email },
    data: {
      emailVerificationCode: hashedVerificationCode,
      emailVerificationCreatedAt: expirationTime,
    },
  });

  const emailResponse = await sendEmail(email, user?.fullname, "Email Verification Code", emailVerificationHTML(newVerificationCode));

  if (!emailResponse || emailResponse.error) throw new Error("Email couldn't be sent.");

  return { message: "Verification code be sent!" };
};
