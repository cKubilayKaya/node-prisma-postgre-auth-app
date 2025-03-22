export const resendCodeTimeLimit = (user, timeField) => {
  const currentTime = new Date().getTime() + 3 * 60 * 60 * 1000;
  const resetCreatedAt = new Date(user[timeField]).getTime();
  const timeDifference = currentTime - resetCreatedAt;
  const seconds = Math.round(Math.abs(timeDifference) / 1000);

  const error = {
    message: "You must wait a while before sending a new code.",
    time: seconds,
  };

  if (timeDifference < 0) {
    throw new Error(JSON.stringify(error));
  }
};
