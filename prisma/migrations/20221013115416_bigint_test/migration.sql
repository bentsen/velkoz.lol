/*
  Warnings:

  - You are about to alter the column `gameCreation` on the `Info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `Info` MODIFY `gameCreation` BIGINT NOT NULL;
