/*
  Warnings:

  - You are about to drop the column `max_adults` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `max_children` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `max_adults` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `max_children` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `accomodationrequest` DROP FOREIGN KEY `AccomodationRequest_id_refugee_fkey`;

-- DropForeignKey
ALTER TABLE `location` DROP FOREIGN KEY `Location_id_owner_fkey`;

-- DropForeignKey
ALTER TABLE `refugees` DROP FOREIGN KEY `Refugees_id_country_fkey`;

-- DropForeignKey
ALTER TABLE `refugees` DROP FOREIGN KEY `Refugees_id_language_fkey`;

-- DropForeignKey
ALTER TABLE `refugees` DROP FOREIGN KEY `Refugees_id_loc_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_id_loc_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_id_provider_fkey`;

-- AlterTable
ALTER TABLE `location` DROP COLUMN `max_adults`,
    DROP COLUMN `max_children`,
    DROP COLUMN `price`;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `max_adults`,
    DROP COLUMN `max_children`,
    DROP COLUMN `price`;

-- AddForeignKey
ALTER TABLE `refugees` ADD CONSTRAINT `refugees_id_country_fkey` FOREIGN KEY (`id_country`) REFERENCES `country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refugees` ADD CONSTRAINT `refugees_id_language_fkey` FOREIGN KEY (`id_language`) REFERENCES `language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refugees` ADD CONSTRAINT `refugees_id_loc_fkey` FOREIGN KEY (`id_loc`) REFERENCES `location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_id_owner_fkey` FOREIGN KEY (`id_owner`) REFERENCES `owner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_id_provider_fkey` FOREIGN KEY (`id_provider`) REFERENCES `provider`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_id_loc_fkey` FOREIGN KEY (`id_loc`) REFERENCES `location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accomodationRequest` ADD CONSTRAINT `accomodationRequest_id_refugee_fkey` FOREIGN KEY (`id_refugee`) REFERENCES `refugees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `accomodationrequest` RENAME INDEX `AccomodationRequest_id_refugee_key` TO `accomodationRequest_id_refugee_key`;

-- RenameIndex
ALTER TABLE `country` RENAME INDEX `Country_name_key` TO `country_name_key`;

-- RenameIndex
ALTER TABLE `language` RENAME INDEX `Language_name_key` TO `language_name_key`;

-- RenameIndex
ALTER TABLE `location` RENAME INDEX `Location_address_key` TO `location_address_key`;

-- RenameIndex
ALTER TABLE `owner` RENAME INDEX `Owner_auth0_id_key` TO `owner_auth0_id_key`;

-- RenameIndex
ALTER TABLE `provider` RENAME INDEX `Provider_auth0_id_key` TO `provider_auth0_id_key`;

-- RenameIndex
ALTER TABLE `refugees` RENAME INDEX `Refugees_auth0_id_key` TO `refugees_auth0_id_key`;

-- RenameIndex
ALTER TABLE `refugees` RENAME INDEX `Refugees_id_loc_key` TO `refugees_id_loc_key`;
