-- DropForeignKey
ALTER TABLE `lead` DROP FOREIGN KEY `Lead_created_user_id_fkey`;

-- DropIndex
DROP INDEX `Lead_created_user_id_fkey` ON `lead`;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_created_user_id_fkey` FOREIGN KEY (`created_user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
