/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Summoner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Summoner_id_key" ON "Summoner"("id");
