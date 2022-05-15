/*
  Warnings:

  - A unique constraint covering the columns `[id_loc]` on the table `Refugees` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `refugees` DROP FOREIGN KEY `Refugees_id_country_fkey`;

-- DropForeignKey
ALTER TABLE `refugees` DROP FOREIGN KEY `Refugees_id_language_fkey`;

-- CreateTable
CREATE TABLE `Owner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth0_id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Owner_auth0_id_key`(`auth0_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provider` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth0_id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Provider_auth0_id_key`(`auth0_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `price` INTEGER NOT NULL DEFAULT 0,
    `max_adults` INTEGER NOT NULL DEFAULT 1,
    `max_children` INTEGER NOT NULL DEFAULT 0,
    `id_owner` INTEGER NOT NULL,

    UNIQUE INDEX `Location_address_key`(`address`),
    PRIMARY KEY (`id`, `id_owner`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` INTEGER NOT NULL DEFAULT 0,
    `max_adults` INTEGER NOT NULL DEFAULT 1,
    `max_children` INTEGER NOT NULL DEFAULT 0,
    `id_loc` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `id_provider` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `id_loc`, `type`, `id_provider`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccomodationRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_refugee` INTEGER NOT NULL,
    `approved` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `AccomodationRequest_id_refugee_key`(`id_refugee`),
    PRIMARY KEY (`id`, `id_refugee`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Refugees_id_loc_key` ON `Refugees`(`id_loc`);

-- AddForeignKey
ALTER TABLE `Refugees` ADD CONSTRAINT `Refugees_id_country_fkey` FOREIGN KEY (`id_country`) REFERENCES `Country`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refugees` ADD CONSTRAINT `Refugees_id_language_fkey` FOREIGN KEY (`id_language`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refugees` ADD CONSTRAINT `Refugees_id_loc_fkey` FOREIGN KEY (`id_loc`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `Location_id_owner_fkey` FOREIGN KEY (`id_owner`) REFERENCES `Owner`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_id_provider_fkey` FOREIGN KEY (`id_provider`) REFERENCES `Provider`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_id_loc_fkey` FOREIGN KEY (`id_loc`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccomodationRequest` ADD CONSTRAINT `AccomodationRequest_id_refugee_fkey` FOREIGN KEY (`id_refugee`) REFERENCES `Refugees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
