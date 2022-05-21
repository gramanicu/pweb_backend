/*
  Warnings:

  - The values [MEDICAL_SERVICE,TRANSLATION_SERVICE] on the enum `services_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `services` MODIFY `type` ENUM('GENERIC', 'FOOD', 'CLOTHES', 'MEDICAL', 'TRANSLATION', 'LEISURE') NOT NULL;
