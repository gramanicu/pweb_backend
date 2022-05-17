/*
  Warnings:

  - The primary key for the `service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `type` on the `service` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum("service_type")`.

*/
-- AlterTable
ALTER TABLE `service` DROP PRIMARY KEY,
    MODIFY `type` ENUM('GENERIC', 'FOOD', 'CLOTHES', 'MEDICAL_SERVICE', 'TRANSLATION_SERVICE', 'LEISURE') NOT NULL,
    ADD PRIMARY KEY (`id`, `id_loc`, `type`, `id_provider`);
