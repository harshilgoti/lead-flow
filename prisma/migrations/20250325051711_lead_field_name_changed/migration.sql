/*
  Warnings:

  - You are about to drop the `leads` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_user_id_fkey";

-- DropTable
DROP TABLE "leads";

-- CreateTable
CREATE TABLE "Lead" (
    "id" SERIAL NOT NULL,
    "assign_user_id" INTEGER NOT NULL,
    "created_user_id" INTEGER NOT NULL,
    "full_name" VARCHAR(255),
    "title" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "mobile" VARCHAR(255),
    "lead_source" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "lead_status" VARCHAR(255) NOT NULL,
    "type" "LeadType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assign_user_id_fkey" FOREIGN KEY ("assign_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_created_user_id_fkey" FOREIGN KEY ("created_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
