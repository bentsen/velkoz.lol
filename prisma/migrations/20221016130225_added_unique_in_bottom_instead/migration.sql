-- CreateTable
CREATE TABLE "Summoner" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summonerLevel" INTEGER NOT NULL,
    "profileIconId" INTEGER NOT NULL,
    "revisionDate" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Summoner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metadata" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "dataVersion" TEXT NOT NULL,

    CONSTRAINT "Metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaParticipant" (
    "id" TEXT NOT NULL,
    "metaParticipant" TEXT NOT NULL,
    "metadataId" TEXT NOT NULL,

    CONSTRAINT "MetaParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Info" (
    "id" TEXT NOT NULL,
    "gameCreation" TEXT NOT NULL,
    "gameDuration" TEXT NOT NULL,
    "gameEndTimestamp" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameMode" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "gameStartTimestamp" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "gameVersion" TEXT NOT NULL,
    "mapId" INTEGER NOT NULL,
    "platformId" TEXT NOT NULL,
    "queueId" INTEGER NOT NULL,
    "tournamentCode" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "assists" INTEGER NOT NULL,
    "baronKills" INTEGER NOT NULL,
    "bountyLevel" INTEGER NOT NULL,
    "champExperience" INTEGER NOT NULL,
    "champLevel" INTEGER NOT NULL,
    "championId" INTEGER NOT NULL,
    "championName" TEXT NOT NULL,
    "championTransform" INTEGER NOT NULL,
    "consumablesPurchased" INTEGER NOT NULL,
    "damageDealtToBuildings" INTEGER NOT NULL,
    "damageDealtToObjectives" INTEGER NOT NULL,
    "damageDealtToTurrets" INTEGER NOT NULL,
    "damageSelfMitigated" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "detectorWardsPlaced" INTEGER NOT NULL,
    "doubleKills" INTEGER NOT NULL,
    "dragonKills" INTEGER NOT NULL,
    "firstBloodAssist" BOOLEAN NOT NULL,
    "firstBloodKill" BOOLEAN NOT NULL,
    "firstTowerAssist" BOOLEAN NOT NULL,
    "firstTowerKill" BOOLEAN NOT NULL,
    "gameEndedInEarlySurrender" BOOLEAN NOT NULL,
    "gameEndedInSurrender" BOOLEAN NOT NULL,
    "goldEarned" INTEGER NOT NULL,
    "goldSpent" INTEGER NOT NULL,
    "individualPosition" TEXT NOT NULL,
    "inhibitorKills" INTEGER NOT NULL,
    "inhibitorTakedowns" INTEGER NOT NULL,
    "inhibitorsLost" INTEGER NOT NULL,
    "item0" INTEGER NOT NULL,
    "item1" INTEGER NOT NULL,
    "item2" INTEGER NOT NULL,
    "item3" INTEGER NOT NULL,
    "item4" INTEGER NOT NULL,
    "item5" INTEGER NOT NULL,
    "item6" INTEGER NOT NULL,
    "itemsPurchased" INTEGER NOT NULL,
    "killingSprees" INTEGER NOT NULL,
    "kills" INTEGER NOT NULL,
    "lane" TEXT NOT NULL,
    "largestCriticalStrike" INTEGER NOT NULL,
    "largestKillingSpree" INTEGER NOT NULL,
    "largestMultiKill" INTEGER NOT NULL,
    "longestTimeSpentLiving" INTEGER NOT NULL,
    "magicDamageDealt" INTEGER NOT NULL,
    "magicDamageDealtToChampions" INTEGER NOT NULL,
    "magicDamageTaken" INTEGER NOT NULL,
    "neutralMinionsKilled" INTEGER NOT NULL,
    "nexusKills" INTEGER NOT NULL,
    "nexusTakedowns" INTEGER NOT NULL,
    "nexusLost" INTEGER NOT NULL,
    "objectivesStolen" INTEGER NOT NULL,
    "objectivesStolenAssists" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "pentaKills" INTEGER NOT NULL,
    "physicalDamageDealt" INTEGER NOT NULL,
    "physicalDamageDealtToChampions" INTEGER NOT NULL,
    "physicalDamageTaken" INTEGER NOT NULL,
    "profileIcon" INTEGER NOT NULL,
    "puuid" TEXT NOT NULL,
    "quadraKills" INTEGER NOT NULL,
    "riotIdName" TEXT NOT NULL,
    "riotIdTagline" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "sightWardsBoughtInGame" INTEGER NOT NULL,
    "spell1Casts" INTEGER NOT NULL,
    "spell2Casts" INTEGER NOT NULL,
    "spell3Casts" INTEGER NOT NULL,
    "spell4Casts" INTEGER NOT NULL,
    "summoner1Casts" INTEGER NOT NULL,
    "summoner1Id" INTEGER NOT NULL,
    "summoner2Casts" INTEGER NOT NULL,
    "summoner2Id" INTEGER NOT NULL,
    "summonerId" TEXT NOT NULL,
    "summonerLevel" INTEGER NOT NULL,
    "summonerName" TEXT NOT NULL,
    "teamEarlySurrendered" BOOLEAN NOT NULL,
    "teamId" INTEGER NOT NULL,
    "teamPosition" TEXT NOT NULL,
    "timeCCingOthers" INTEGER NOT NULL,
    "timePlayed" INTEGER NOT NULL,
    "totalDamageDealt" INTEGER NOT NULL,
    "totalDamageDealtToChampions" INTEGER NOT NULL,
    "totalDamageShieldedOnTeammates" INTEGER NOT NULL,
    "totalDamageTaken" INTEGER NOT NULL,
    "totalHeal" INTEGER NOT NULL,
    "totalHealsOnTeammates" INTEGER NOT NULL,
    "totalMinionsKilled" INTEGER NOT NULL,
    "totalTimeCCDealt" INTEGER NOT NULL,
    "totalTimeSpentDead" INTEGER NOT NULL,
    "totalUnitsHealed" INTEGER NOT NULL,
    "tripleKills" INTEGER NOT NULL,
    "trueDamageDealt" INTEGER NOT NULL,
    "trueDamageDealtToChampions" INTEGER NOT NULL,
    "trueDamageTaken" INTEGER NOT NULL,
    "turretKills" INTEGER NOT NULL,
    "turretTakedowns" INTEGER NOT NULL,
    "turretsLost" INTEGER NOT NULL,
    "unrealKills" INTEGER NOT NULL,
    "visionScore" INTEGER NOT NULL,
    "visionWardsBoughtInGame" INTEGER NOT NULL,
    "wardsKilled" INTEGER NOT NULL,
    "wardsPlaced" INTEGER NOT NULL,
    "win" BOOLEAN NOT NULL,
    "infoId" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perks" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    CONSTRAINT "Perks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerkStats" (
    "id" TEXT NOT NULL,
    "defense" INTEGER NOT NULL,
    "flex" INTEGER NOT NULL,
    "offense" INTEGER NOT NULL,
    "perksId" TEXT NOT NULL,

    CONSTRAINT "PerkStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerkStyle" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "style" INTEGER NOT NULL,
    "perksId" TEXT NOT NULL,

    CONSTRAINT "PerkStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerkStyleSelection" (
    "id" TEXT NOT NULL,
    "perk" INTEGER NOT NULL,
    "var1" INTEGER NOT NULL,
    "var2" INTEGER NOT NULL,
    "var3" INTEGER NOT NULL,
    "perkStyleId" TEXT NOT NULL,

    CONSTRAINT "PerkStyleSelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,
    "win" BOOLEAN NOT NULL,
    "infoId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ban" (
    "id" TEXT NOT NULL,
    "championId" INTEGER NOT NULL,
    "pickTurn" INTEGER NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Ban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objectives" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Objectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Objective" (
    "id" TEXT NOT NULL,
    "first" BOOLEAN NOT NULL,
    "kills" INTEGER NOT NULL,
    "baronId" TEXT,
    "championId" TEXT,
    "dragonId" TEXT,
    "inhibitorId" TEXT,
    "riftHeraldId" TEXT,
    "towerId" TEXT,

    CONSTRAINT "Objective_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Summoner_id_accountId_puuid_key" ON "Summoner"("id", "accountId", "puuid");

-- CreateIndex
CREATE UNIQUE INDEX "Match_id_key" ON "Match"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_id_key" ON "Metadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Metadata_gameId_key" ON "Metadata"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "MetaParticipant_id_key" ON "MetaParticipant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Info_id_key" ON "Info"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Info_matchId_key" ON "Info"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_id_key" ON "Participant"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Perks_id_key" ON "Perks"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Perks_participantId_key" ON "Perks"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "PerkStats_id_key" ON "PerkStats"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PerkStats_perksId_key" ON "PerkStats"("perksId");

-- CreateIndex
CREATE UNIQUE INDEX "PerkStyle_id_key" ON "PerkStyle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PerkStyleSelection_id_key" ON "PerkStyleSelection"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ban_id_key" ON "Ban"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Objectives_teamId_key" ON "Objectives"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_id_key" ON "Objective"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_baronId_key" ON "Objective"("baronId");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_championId_key" ON "Objective"("championId");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_dragonId_key" ON "Objective"("dragonId");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_inhibitorId_key" ON "Objective"("inhibitorId");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_riftHeraldId_key" ON "Objective"("riftHeraldId");

-- CreateIndex
CREATE UNIQUE INDEX "Objective_towerId_key" ON "Objective"("towerId");
