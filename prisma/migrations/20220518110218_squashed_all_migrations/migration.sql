-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `countries_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `languages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `languages_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth0_id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `owners_auth0_id_key`(`auth0_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `providers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth0_id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `providers_auth0_id_key`(`auth0_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refugees` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `auth0_id` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `id_country` INTEGER NOT NULL,
    `id_language` INTEGER NOT NULL,
    `no_adults` INTEGER NULL DEFAULT 1,
    `no_children` INTEGER NULL DEFAULT 0,
    `notes` VARCHAR(255) NOT NULL,
    `id_loc` INTEGER NULL,

    UNIQUE INDEX `refugees_auth0_id_key`(`auth0_id`),
    UNIQUE INDEX `refugees_id_loc_key`(`id_loc`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `id_owner` INTEGER NOT NULL,

    UNIQUE INDEX `locations_address_key`(`address`),
    PRIMARY KEY (`id`, `id_owner`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_loc` INTEGER NOT NULL,
    `type` ENUM('GENERIC', 'FOOD', 'CLOTHES', 'MEDICAL_SERVICE', 'TRANSLATION_SERVICE', 'LEISURE') NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `id_provider` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `id_loc`, `type`, `id_provider`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accommodationRequests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_refugee` INTEGER NOT NULL,
    `approved` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `accommodationRequests_id_refugee_key`(`id_refugee`),
    PRIMARY KEY (`id`, `id_refugee`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refugees` ADD CONSTRAINT `refugees_id_country_fkey` FOREIGN KEY (`id_country`) REFERENCES `countries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refugees` ADD CONSTRAINT `refugees_id_language_fkey` FOREIGN KEY (`id_language`) REFERENCES `languages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refugees` ADD CONSTRAINT `refugees_id_loc_fkey` FOREIGN KEY (`id_loc`) REFERENCES `locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `locations` ADD CONSTRAINT `locations_id_owner_fkey` FOREIGN KEY (`id_owner`) REFERENCES `owners`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_id_provider_fkey` FOREIGN KEY (`id_provider`) REFERENCES `providers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `services` ADD CONSTRAINT `services_id_loc_fkey` FOREIGN KEY (`id_loc`) REFERENCES `locations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accommodationRequests` ADD CONSTRAINT `accommodationrequests_id_refugee_fkey` FOREIGN KEY (`id_refugee`) REFERENCES `refugees`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
