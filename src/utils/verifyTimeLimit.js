export const verifyTimeLimit = (user, timeField) => {
  const currentTime = new Date().getTime() + 3 * 60 * 60 * 1000;
  const resetCreatedAt = new Date(user[timeField]).getTime();
  const timeDifference = currentTime - resetCreatedAt;

  if (timeDifference > 0) {
    throw new Error("This code has expired.");
  }
};
