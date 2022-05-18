/*
  Warnings:

  - You are about to drop the column `approved` on the `accommodationrequests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `accommodationrequests` DROP COLUMN `approved`,
    ADD COLUMN `status` ENUM('UNANSWERED', 'ACCEPTED', 'DECLINED') NOT NULL DEFAULT 'UNANSWERED';
