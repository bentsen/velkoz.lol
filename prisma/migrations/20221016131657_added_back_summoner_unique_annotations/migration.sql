/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Summoner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Summoner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[puuid]` on the table `Summoner` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Summoner_id_accountId_puuid_key";

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_id_key" ON "Summoner"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_accountId_key" ON "Summoner"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_puuid_key" ON "Summoner"("puuid");
