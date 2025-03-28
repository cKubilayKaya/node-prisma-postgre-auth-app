import { CustomError } from "./customError.js";

export const codeTimeLimit = (user, timeField) => {
  const currentTime = new Date().getTime() + 3 * 60 * 60 * 1000;
  const resetCreatedAt = new Date(user[timeField]).getTime();
  const timeDifference = currentTime - resetCreatedAt;
  const seconds = Math.round(Math.abs(timeDifference) / 1000);

  if (timeDifference < 0) {
    throw new CustomError("You must wait a while before sending a new code.", 429, { time: seconds });
  }
};
