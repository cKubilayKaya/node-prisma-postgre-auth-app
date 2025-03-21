import bcrypt from "bcrypt";

export const validatePassword = async (unHashedPassword, hashedPassword) => {
  const password = await bcrypt.compare(unHashedPassword, hashedPassword);

  if (!password) {
    throw new Error("Invalid password");
  }

  return password;
};
