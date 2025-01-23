/*
  Warnings:

  - You are about to drop the column `gpId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_gpId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gpId",
ADD COLUMN     "gpMainId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gpMainId_fkey" FOREIGN KEY ("gpMainId") REFERENCES "GPMain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
