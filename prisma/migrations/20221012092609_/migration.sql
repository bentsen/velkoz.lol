-- CreateTable
CREATE TABLE `Summoner` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `puuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `summonerLevel` INTEGER NOT NULL,
    `profileIconId` INTEGER NOT NULL,
    `revisionDate` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Summoner_id_key`(`id`),
    UNIQUE INDEX `Summoner_accountId_key`(`accountId`),
    UNIQUE INDEX `Summoner_puuid_key`(`puuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastUpdated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Match_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Metadata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,
    `matchId` VARCHAR(191) NOT NULL,
    `dataVersion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Metadata_id_key`(`id`),
    UNIQUE INDEX `Metadata_gameId_key`(`gameId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MetaParticipant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `metaParticipant` VARCHAR(191) NOT NULL,
    `metadataId` INTEGER NOT NULL,

    UNIQUE INDEX `MetaParticipant_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameCreation` VARCHAR(191) NOT NULL,
    `gameDuration` VARCHAR(191) NOT NULL,
    `gameEndTimestamp` VARCHAR(191) NOT NULL,
    `gameId` VARCHAR(191) NOT NULL,
    `gameMode` VARCHAR(191) NOT NULL,
    `gameName` VARCHAR(191) NOT NULL,
    `gameStartTimestamp` VARCHAR(191) NOT NULL,
    `gameType` VARCHAR(191) NOT NULL,
    `gameVersion` VARCHAR(191) NOT NULL,
    `mapId` INTEGER NOT NULL,
    `platformId` VARCHAR(191) NOT NULL,
    `queueId` INTEGER NOT NULL,
    `tournamentCode` VARCHAR(191) NOT NULL,
    `matchId` INTEGER NOT NULL,

    UNIQUE INDEX `Info_id_key`(`id`),
    UNIQUE INDEX `Info_matchId_key`(`matchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assists` INTEGER NOT NULL,
    `baronKills` INTEGER NOT NULL,
    `bountyLevel` INTEGER NOT NULL,
    `champExperience` INTEGER NOT NULL,
    `champLevel` INTEGER NOT NULL,
    `championId` INTEGER NOT NULL,
    `championName` VARCHAR(191) NOT NULL,
    `championTransform` INTEGER NOT NULL,
    `consumablesPurchased` INTEGER NOT NULL,
    `damageDealtToBuildings` INTEGER NOT NULL,
    `damageDealtToObjectives` INTEGER NOT NULL,
    `damageDealtToTurrets` INTEGER NOT NULL,
    `damageSelfMitigated` INTEGER NOT NULL,
    `deaths` INTEGER NOT NULL,
    `detectorWardsPlaced` INTEGER NOT NULL,
    `doubleKills` INTEGER NOT NULL,
    `dragonKills` INTEGER NOT NULL,
    `firstBloodAssist` BOOLEAN NOT NULL,
    `firstBloodKill` BOOLEAN NOT NULL,
    `firstTowerAssist` BOOLEAN NOT NULL,
    `firstTowerKill` BOOLEAN NOT NULL,
    `gameEndedInEarlySurrender` BOOLEAN NOT NULL,
    `gameEndedInSurrender` BOOLEAN NOT NULL,
    `goldEarned` INTEGER NOT NULL,
    `goldSpent` INTEGER NOT NULL,
    `individualPosition` VARCHAR(191) NOT NULL,
    `inhibitorKills` INTEGER NOT NULL,
    `inhibitorTakedowns` INTEGER NOT NULL,
    `inhibitorsLost` INTEGER NOT NULL,
    `item0` INTEGER NOT NULL,
    `item1` INTEGER NOT NULL,
    `item2` INTEGER NOT NULL,
    `item3` INTEGER NOT NULL,
    `item4` INTEGER NOT NULL,
    `item5` INTEGER NOT NULL,
    `item6` INTEGER NOT NULL,
    `itemsPurchased` INTEGER NOT NULL,
    `killingSprees` INTEGER NOT NULL,
    `kills` INTEGER NOT NULL,
    `lane` VARCHAR(191) NOT NULL,
    `largestCriticalStrike` INTEGER NOT NULL,
    `largestKillingSpree` INTEGER NOT NULL,
    `largestMultiKill` INTEGER NOT NULL,
    `longestTimeSpentLiving` INTEGER NOT NULL,
    `magicDamageDealt` INTEGER NOT NULL,
    `magicDamageDealtToChampions` INTEGER NOT NULL,
    `magicDamageTaken` INTEGER NOT NULL,
    `neutralMinionsKilled` INTEGER NOT NULL,
    `nexusKills` INTEGER NOT NULL,
    `nexusTakedowns` INTEGER NOT NULL,
    `nexusLost` INTEGER NOT NULL,
    `objectivesStolen` INTEGER NOT NULL,
    `objectivesStolenAssists` INTEGER NOT NULL,
    `participantId` INTEGER NOT NULL,
    `pentaKills` INTEGER NOT NULL,
    `physicalDamageDealt` INTEGER NOT NULL,
    `physicalDamageDealtToChampions` INTEGER NOT NULL,
    `physicalDamageTaken` INTEGER NOT NULL,
    `profileIcon` INTEGER NOT NULL,
    `puuid` VARCHAR(191) NOT NULL,
    `quadraKills` INTEGER NOT NULL,
    `riotIdName` VARCHAR(191) NOT NULL,
    `riotIdTagline` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `sightWardsBoughtInGame` INTEGER NOT NULL,
    `spell1Casts` INTEGER NOT NULL,
    `spell2Casts` INTEGER NOT NULL,
    `spell3Casts` INTEGER NOT NULL,
    `spell4Casts` INTEGER NOT NULL,
    `summoner1Casts` INTEGER NOT NULL,
    `summoner1Id` INTEGER NOT NULL,
    `summoner2Casts` INTEGER NOT NULL,
    `summoner2Id` INTEGER NOT NULL,
    `summonerId` VARCHAR(191) NOT NULL,
    `summonerLevel` INTEGER NOT NULL,
    `summonerName` VARCHAR(191) NOT NULL,
    `teamEarlySurrendered` BOOLEAN NOT NULL,
    `teamId` INTEGER NOT NULL,
    `teamPosition` VARCHAR(191) NOT NULL,
    `timeCCingOthers` INTEGER NOT NULL,
    `timePlayed` INTEGER NOT NULL,
    `totalDamageDealt` INTEGER NOT NULL,
    `totalDamageDealtToChampions` INTEGER NOT NULL,
    `totalDamageShieldedOnTeammates` INTEGER NOT NULL,
    `totalDamageTaken` INTEGER NOT NULL,
    `totalHeal` INTEGER NOT NULL,
    `totalHealsOnTeammates` INTEGER NOT NULL,
    `totalMinionsKilled` INTEGER NOT NULL,
    `totalTimeCCDealt` INTEGER NOT NULL,
    `totalTimeSpentDead` INTEGER NOT NULL,
    `totalUnitsHealed` INTEGER NOT NULL,
    `tripleKills` INTEGER NOT NULL,
    `trueDamageDealt` INTEGER NOT NULL,
    `trueDamageDealtToChampions` INTEGER NOT NULL,
    `trueDamageTaken` INTEGER NOT NULL,
    `turretKills` INTEGER NOT NULL,
    `turretTakedowns` INTEGER NOT NULL,
    `turretsLost` INTEGER NOT NULL,
    `unrealKills` INTEGER NOT NULL,
    `visionScore` INTEGER NOT NULL,
    `visionWardsBoughtInGame` INTEGER NOT NULL,
    `wardsKilled` INTEGER NOT NULL,
    `wardsPlaced` INTEGER NOT NULL,
    `win` BOOLEAN NOT NULL,
    `infoId` INTEGER NOT NULL,

    UNIQUE INDEX `Participant_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `participantId` INTEGER NOT NULL,

    UNIQUE INDEX `Perks_id_key`(`id`),
    UNIQUE INDEX `Perks_participantId_key`(`participantId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerkStats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `defense` INTEGER NOT NULL,
    `flex` INTEGER NOT NULL,
    `offense` INTEGER NOT NULL,
    `perksId` INTEGER NOT NULL,

    UNIQUE INDEX `PerkStats_id_key`(`id`),
    UNIQUE INDEX `PerkStats_perksId_key`(`perksId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerkStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `style` INTEGER NOT NULL,
    `perksId` INTEGER NOT NULL,

    UNIQUE INDEX `PerkStyle_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PerkStyleSelection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `perk` INTEGER NOT NULL,
    `var1` INTEGER NOT NULL,
    `var2` INTEGER NOT NULL,
    `var3` INTEGER NOT NULL,
    `perkStyleId` INTEGER NOT NULL,

    UNIQUE INDEX `PerkStyleSelection_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,
    `win` BOOLEAN NOT NULL,
    `infoId` INTEGER NOT NULL,

    UNIQUE INDEX `Team_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ban` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `championId` INTEGER NOT NULL,
    `pickTurn` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    UNIQUE INDEX `Ban_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Objectives` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,

    UNIQUE INDEX `Objectives_id_key`(`id`),
    UNIQUE INDEX `Objectives_teamId_key`(`teamId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Objective` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first` BOOLEAN NOT NULL,
    `kills` INTEGER NOT NULL,
    `baronId` INTEGER NULL,
    `championId` INTEGER NULL,
    `dragonId` INTEGER NULL,
    `inhibitorId` INTEGER NULL,
    `riftHeraldId` INTEGER NULL,
    `towerId` INTEGER NULL,

    UNIQUE INDEX `Objective_id_key`(`id`),
    UNIQUE INDEX `Objective_baronId_key`(`baronId`),
    UNIQUE INDEX `Objective_championId_key`(`championId`),
    UNIQUE INDEX `Objective_dragonId_key`(`dragonId`),
    UNIQUE INDEX `Objective_inhibitorId_key`(`inhibitorId`),
    UNIQUE INDEX `Objective_riftHeraldId_key`(`riftHeraldId`),
    UNIQUE INDEX `Objective_towerId_key`(`towerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
