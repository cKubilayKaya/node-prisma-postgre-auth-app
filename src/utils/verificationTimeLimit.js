export const verificationTimeLimit = (user) => {
  const currentTime = new Date().getTime(); // Şu anki zaman
  const verificationCreatedAt = new Date(user.emailVerificationCreatedAt).getTime(); // Kullanıcının doğrulama kodu oluşturulma zamanı
  const verificationTimeLimit = process.env.VERIFICATION_TIME_LIMIT; // Süre limiti (milisaniye cinsine çevrilmeli)

  if (currentTime - verificationCreatedAt > verificationTimeLimit) {
    throw new Error("Email verification code has expired!");
  }
};
