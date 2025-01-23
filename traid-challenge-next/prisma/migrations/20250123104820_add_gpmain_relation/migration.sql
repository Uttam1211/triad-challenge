/*
  Warnings:

  - Added the required column `gpMainId` to the `GP` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_freeSlotId_fkey";

-- CreateTable
CREATE TABLE "GPMain" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GPMain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GPMain_email_key" ON "GPMain"("email");

-- Insert a default GPMain for existing GPs
INSERT INTO "GPMain" (name, address, "phoneNumber", email, "updatedAt")
VALUES ('Default Surgery', '123 Main St', '0123456789', 'default@surgery.nhs.uk', CURRENT_TIMESTAMP);

-- AlterTable
ALTER TABLE "GP" ADD COLUMN "gpMainId" INTEGER;

-- Update existing GPs to use the default GPMain
UPDATE "GP" SET "gpMainId" = (SELECT id FROM "GPMain" LIMIT 1);

-- Now make the column required
ALTER TABLE "GP" ALTER COLUMN "gpMainId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GP" ADD CONSTRAINT "GP_gpMainId_fkey" FOREIGN KEY ("gpMainId") REFERENCES "GPMain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_freeSlotId_fkey" FOREIGN KEY ("freeSlotId") REFERENCES "FreeSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
