/*
  Warnings:

  - Made the column `email` on table `leads` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lead_status` on table `leads` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "leads_user_id_key";

-- AlterTable
ALTER TABLE "leads" ALTER COLUMN "full_name" DROP NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "lead_status" SET NOT NULL;
