/*
  Warnings:

  - Added the required column `locationId` to the `accommodationRequests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId_owner` to the `accommodationRequests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `accommodationRequests` ADD COLUMN `locationId` INTEGER NOT NULL,
    ADD COLUMN `locationId_owner` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `accommodationRequests` ADD CONSTRAINT `accommodationRequests_locationId_locationId_owner_fkey` FOREIGN KEY (`locationId`, `locationId_owner`) REFERENCES `locations`(`id`, `id_owner`) ON DELETE RESTRICT ON UPDATE CASCADE;
