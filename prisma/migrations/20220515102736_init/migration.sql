-- CreateTable
CREATE TABLE `Refugees` (
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

    UNIQUE INDEX `Refugees_auth0_id_key`(`auth0_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Refugees` ADD CONSTRAINT `Refugees_id_country_fkey` FOREIGN KEY (`id_country`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Refugees` ADD CONSTRAINT `Refugees_id_language_fkey` FOREIGN KEY (`id_language`) REFERENCES `Language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
