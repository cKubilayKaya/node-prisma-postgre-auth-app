export const emailVerificationHTML = (code) => {
  return `<div>
      <h3>Email Verification Code:</h3>
      <div style="display: flex; align-items: center">
        <p style="padding: 12px; border-radius: 8px; background-color: rgb(49 174 209); color:white; display: inline-block">
          ${code}
        </p>
      </div>
    </div>`;
};
