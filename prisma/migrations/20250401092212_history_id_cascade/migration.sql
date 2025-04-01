-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_history_id_fkey`;

-- DropIndex
DROP INDEX `Note_history_id_fkey` ON `note`;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_history_id_fkey` FOREIGN KEY (`history_id`) REFERENCES `History`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
