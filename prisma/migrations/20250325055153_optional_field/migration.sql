-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_assign_user_id_fkey";

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "assign_user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assign_user_id_fkey" FOREIGN KEY ("assign_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
