-- AlterTable
ALTER TABLE "User" ALTER COLUMN "emailVerificationCode" DROP NOT NULL,
ALTER COLUMN "emailVerificationCreatedAt" DROP NOT NULL;
