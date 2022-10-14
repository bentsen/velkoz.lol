/*
  Warnings:

  - Added the required column `matchId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Match` ADD COLUMN `matchId` VARCHAR(191) NOT NULL;
