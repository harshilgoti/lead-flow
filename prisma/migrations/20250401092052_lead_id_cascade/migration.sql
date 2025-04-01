-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `History_lead_id_fkey`;

-- DropIndex
DROP INDEX `History_lead_id_fkey` ON `history`;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_lead_id_fkey` FOREIGN KEY (`lead_id`) REFERENCES `Lead`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
