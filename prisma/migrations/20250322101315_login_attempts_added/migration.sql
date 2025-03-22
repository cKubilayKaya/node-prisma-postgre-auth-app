-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wrongLoginAttempts" INTEGER NOT NULL DEFAULT 0;
