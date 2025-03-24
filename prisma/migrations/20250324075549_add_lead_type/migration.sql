-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('WARM', 'HOT', 'HOLD');

-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "type" "LeadType" NOT NULL DEFAULT 'WARM';
