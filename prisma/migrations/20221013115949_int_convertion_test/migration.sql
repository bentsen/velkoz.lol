/*
  Warnings:

  - You are about to alter the column `gameDuration` on the `Info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `gameEndTimestamp` on the `Info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `gameId` on the `Info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `gameStartTimestamp` on the `Info` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Info` MODIFY `gameDuration` INTEGER NOT NULL,
    MODIFY `gameEndTimestamp` INTEGER NOT NULL,
    MODIFY `gameId` INTEGER NOT NULL,
    MODIFY `gameStartTimestamp` INTEGER NOT NULL;
