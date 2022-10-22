import {riotRequest} from "@/server/data/riot/riotRequest";
import {convertToRegion} from "@/server/data/lol/regions";
import {IMatch} from "@/utils/@types/lol/match";
import {prisma} from "@/server/util/prisma";
import {TMatch} from "@/server/routers/lol/matchRouter";

export const getRecentMatches = async(puuid: string, platform: string): Promise<string[]> => {
	const url = `https://${convertToRegion(platform)}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`;
	return await riotRequest<string[]>(url);
}

export const getMatch = async(matchId: string, platform: string) => {
	const count = await prisma.metadata.count({
		where: {
			matchId: matchId,
		}
	});

	if (count > 0) {
		const match =  await prisma.match.findFirst({
			where: {
				matchId: matchId,
			},
			select: {
				lastUpdated: true,
				matchId: true,
				metaData: {
					select: {
						dataVersion: true,
						matchId: true,
						participants: {
							select: {
								metaParticipant: true,
							}
						}
					},
				},
				info: {
					select: {
						gameCreation: true,
						gameDuration: true,
						gameEndTimestamp: true,
						gameId: true,
						gameMode: true,
						gameName: true,
						gameStartTimestamp: true,
						gameType: true,
						gameVersion: true,
						mapId: true,
						participants: {
							select: {
								id: true,
								assists: true,
								baronKills: true,
								bountyLevel: true,
								champExperience: true,
								champLevel: true,
								championId: true,
								championName: true,
								championTransform: true,
								consumablesPurchased: true,
								damageDealtToBuildings: true,
								damageDealtToObjectives: true,
								damageDealtToTurrets: true,
								damageSelfMitigated: true,
								deaths: true,
								detectorWardsPlaced: true,
								doubleKills: true,
								dragonKills: true,
								firstBloodAssist: true,
								firstBloodKill: true,
								firstTowerAssist: true,
								firstTowerKill: true,
								gameEndedInEarlySurrender: true,
								gameEndedInSurrender: true,
								goldEarned: true,
								goldSpent: true,
								individualPosition: true,
								inhibitorKills: true,
								inhibitorTakedowns: true,
								inhibitorsLost: true,
								item0: true,
								item1: true,
								item2: true,
								item3: true,
								item4: true,
								item5: true,
								item6: true,
								itemsPurchased: true,
								killingSprees: true,
								kills: true,
								lane: true,
								largestCriticalStrike: true,
								largestKillingSpree: true,
								largestMultiKill: true,
								longestTimeSpentLiving: true,
								magicDamageDealt: true,
								magicDamageDealtToChampions: true,
								magicDamageTaken: true,
								neutralMinionsKilled: true,
								nexusKills: true,
								nexusTakedowns: true,
								nexusLost: true,
								objectivesStolen: true,
								objectivesStolenAssists: true,
								participantId: true,
								pentaKills: true,
								perks: {
									select: {
										statPerks: {
											select: {
												defense: true,
												flex: true,
												offense: true,
											}
										},
										styles: {
											select: {
												description: true,
												selections: {
													select: {
														perk: true,
														var1: true,
														var2: true,
														var3: true,
													},
												},
												style: true,
											},
										},
									},
								},
								physicalDamageDealt: true,
								physicalDamageDealtToChampions: true,
								physicalDamageTaken: true,
								profileIcon: true,
								puuid: true,
								quadraKills: true,
								riotIdName: true,
								riotIdTagline: true,
								role: true,
								sightWardsBoughtInGame: true,
								spell1Casts: true,
								spell2Casts: true,
								spell3Casts: true,
								spell4Casts: true,
								summoner1Casts: true,
								summoner1Id: true,
								summoner2Casts: true,
								summoner2Id: true,
								summonerId: true,
								summonerLevel: true,
								summonerName: true,
								teamEarlySurrendered: true,
								teamId: true,
								teamPosition: true,
								timeCCingOthers: true,
								timePlayed: true,
								totalDamageDealt: true,
								totalDamageDealtToChampions: true,
								totalDamageShieldedOnTeammates: true,
								totalDamageTaken: true,
								totalHeal: true,
								totalHealsOnTeammates: true,
								totalMinionsKilled: true,
								totalTimeCCDealt: true,
								totalTimeSpentDead: true,
								totalUnitsHealed: true,
								tripleKills: true,
								trueDamageDealt: true,
								trueDamageDealtToChampions: true,
								trueDamageTaken: true,
								turretKills: true,
								turretTakedowns: true,
								turretsLost: true,
								unrealKills: true,
								visionScore: true,
								visionWardsBoughtInGame: true,
								wardsKilled: true,
								wardsPlaced: true,
								win: true,
							}
						},
						platformId: true,
						queueId: true,
						teams: {
							select: {
								bans: {
									select: {
										championId: true,
										pickTurn: true,
									},
								},
								objectives: true,
								teamId: true,
								win: true,
							}
						},
						tournamentCode: true,
					}
				},
			},
		});

		return match;
	}

	const url = `https://${convertToRegion(platform)}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
	let match = await riotRequest<IMatch>(url);
	match.info = {
		...match.info,
		gameCreation: match.info.gameCreation.toString(),
		gameDuration: match.info.gameDuration.toString(),
		gameEndTimestamp: match.info.gameEndTimestamp.toString(),
		gameId: match.info.gameId.toString(),
		gameStartTimestamp: match.info.gameStartTimestamp.toString(),
	}
	return match;
}

export const createMatch = async(match: IMatch) => {
	const count = await prisma.metadata.count({
		where: {
			matchId: match.metadata.matchId,
		}
	})

	if (count > 0) {
		console.error(`Match with ID ${match.metadata.matchId} already exists! Aborting creation of match in DB!`)
		return;
	}

	return await prisma.match.create({
		data: {
			matchId: match.metadata.matchId,
			metaData: {
				create: {
					matchId: match.metadata.matchId,
					dataVersion: match.metadata.dataVersion,
					participants: {
						create: match.metadata.participants.map((participant) => ({
							metaParticipant: participant
						}))
					}
				}
			},
			info: {
				create: {
					gameCreation: match.info.gameCreation,
					gameDuration: match.info.gameDuration,
					gameEndTimestamp: match.info.gameEndTimestamp,
					gameId: match.info.gameId,
					gameMode: match.info.gameMode,
					gameName: match.info.gameName,
					gameStartTimestamp: match.info.gameStartTimestamp,
					gameType: match.info.gameType,
					gameVersion: match.info.gameVersion,
					mapId: match.info.mapId,
					participants: {
						create: match.info.participants.map((participant) => ({
							assists: participant.assists,
							baronKills: participant.baronKills,
							bountyLevel: participant.bountyLevel,
							champExperience: participant.champExperience,
							champLevel: participant.champLevel,
							championId: participant.championId,
							championName: participant.championName,
							championTransform: participant.championTransform,
							consumablesPurchased: participant.consumablesPurchased,
							damageDealtToBuildings: participant.damageDealtToBuildings,
							damageDealtToObjectives: participant.damageDealtToObjectives,
							damageDealtToTurrets: participant.damageDealtToTurrets,
							damageSelfMitigated: participant.damageSelfMitigated,
							deaths: participant.deaths,
							detectorWardsPlaced: participant.detectorWardsPlaced,
							doubleKills: participant.doubleKills,
							dragonKills: participant.dragonKills,
							firstBloodAssist: participant.firstBloodAssist,
							firstBloodKill: participant.firstBloodKill,
							firstTowerAssist: participant.firstTowerAssist,
							firstTowerKill: participant.firstTowerKill,
							gameEndedInEarlySurrender: participant.gameEndedInEarlySurrender,
							gameEndedInSurrender: participant.gameEndedInSurrender,
							goldEarned: participant.goldEarned,
							goldSpent: participant.goldSpent,
							individualPosition: participant.individualPosition,
							inhibitorKills: participant.inhibitorKills,
							inhibitorTakedowns: participant.inhibitorTakedowns,
							inhibitorsLost: participant.inhibitorsLost,
							item0: participant.item0,
							item1: participant.item1,
							item2: participant.item2,
							item3: participant.item3,
							item4: participant.item4,
							item5: participant.item5,
							item6: participant.item6,
							itemsPurchased: participant.itemsPurchased,
							killingSprees: participant.killingSprees,
							kills: participant.kills,
							lane: participant.lane,
							largestCriticalStrike: participant.largestCriticalStrike,
							largestKillingSpree: participant.largestKillingSpree,
							largestMultiKill: participant.largestMultiKill,
							longestTimeSpentLiving: participant.longestTimeSpentLiving,
							magicDamageDealt: participant.magicDamageDealt,
							magicDamageDealtToChampions: participant.magicDamageDealtToChampions,
							magicDamageTaken: participant.magicDamageTaken,
							neutralMinionsKilled: participant.neutralMinionsKilled,
							nexusKills: participant.nexusKills,
							nexusTakedowns: participant.nexusTakedowns,
							nexusLost: participant.nexusLost,
							objectivesStolen: participant.objectivesStolen,
							objectivesStolenAssists: participant.objectivesStolenAssists,
							participantId: participant.participantId,
							pentaKills: participant.pentaKills,
							perks: {
								create: {
									statPerks: {
										create: {
											defense: participant.perks.statPerks.defense,
											flex: participant.perks.statPerks.flex,
											offense: participant.perks.statPerks.offense,
										}
									},
									styles: {
										create: participant.perks.styles.map((style) => ({
											description: style.description,
											selections: {
												create: style.selections.map((selection) => ({
													perk: selection.perk,
													var1: selection.var1,
													var2: selection.var2,
													var3: selection.var3
												}))
											},
											style: style.style
										}))
									}
								}
							},
							physicalDamageDealt: participant.physicalDamageDealt,
							physicalDamageDealtToChampions: participant.physicalDamageDealtToChampions,
							physicalDamageTaken: participant.physicalDamageTaken,
							profileIcon: participant.profileIcon,
							puuid: participant.puuid,
							quadraKills: participant.quadraKills,
							riotIdName: participant.riotIdName,
							riotIdTagline: participant.riotIdTagline,
							role: participant.role,
							sightWardsBoughtInGame: participant.sightWardsBoughtInGame,
							spell1Casts: participant.spell1Casts,
							spell2Casts: participant.spell2Casts,
							spell3Casts: participant.spell3Casts,
							spell4Casts: participant.spell4Casts,
							summoner1Casts: participant.summoner1Casts,
							summoner1Id: participant.summoner1Id,
							summoner2Casts: participant.summoner2Casts,
							summoner2Id: participant.summoner2Id,
							summonerId: participant.summonerId,
							summonerLevel: participant.summonerLevel,
							summonerName: participant.summonerName,
							teamEarlySurrendered: participant.teamEarlySurrendered,
							teamId: participant.teamId,
							teamPosition: participant.teamPosition,
							timeCCingOthers: participant.timeCCingOthers,
							timePlayed: participant.timePlayed,
							totalDamageDealt: participant.totalDamageDealt,
							totalDamageDealtToChampions: participant.totalDamageDealtToChampions,
							totalDamageShieldedOnTeammates: participant.totalDamageShieldedOnTeammates,
							totalDamageTaken: participant.totalDamageTaken,
							totalHeal: participant.totalHeal,
							totalHealsOnTeammates: participant.totalHealsOnTeammates,
							totalMinionsKilled: participant.totalMinionsKilled,
							totalTimeCCDealt: participant.totalTimeCCDealt,
							totalTimeSpentDead: participant.totalTimeSpentDead,
							totalUnitsHealed: participant.totalUnitsHealed,
							tripleKills: participant.tripleKills,
							trueDamageDealt: participant.trueDamageDealt,
							trueDamageDealtToChampions: participant.trueDamageDealtToChampions,
							trueDamageTaken: participant.totalDamageTaken,
							turretKills: participant.turretKills,
							turretTakedowns: participant.turretTakedowns,
							turretsLost: participant.turretsLost,
							unrealKills: participant.unrealKills,
							visionScore: participant.visionScore,
							visionWardsBoughtInGame: participant.visionWardsBoughtInGame,
							wardsKilled: participant.wardsKilled,
							wardsPlaced: participant.wardsPlaced,
							win: participant.win
						})),
					},
					platformId: match.info.platformId,
					queueId: match.info.queueId,
					teams: {
						create: match.info.teams.map((team) => ({
							bans: {
								create: team.bans.map((ban) => ({
									championId: ban.championId,
									pickTurn: ban.pickTurn,
								}))
							},
							objectives: {
								create: {
									baron: {
										create: {
											first: team.objectives.baron.first,
											kills: team.objectives.baron.kills
										}
									},
									champion: {
										create: {
											first: team.objectives.champion.first,
											kills: team.objectives.champion.kills
										}
									},
									dragon: {
										create: {
											first: team.objectives.dragon.first,
											kills: team.objectives.dragon.kills
										}
									},
									inhibitor: {
										create: {
											first: team.objectives.inhibitor.first,
											kills: team.objectives.inhibitor.kills
										}
									},
									riftHerald: {
										create: {
											first: team.objectives.riftHerald.first,
											kills: team.objectives.riftHerald.kills
										}
									},
									tower: {
										create: {
											first: team.objectives.tower.first,
											kills: team.objectives.tower.kills
										}
									},
								}
							},
							teamId: team.teamId,
							win: team.win
						}))
					},
					tournamentCode: match.info.tournamentCode,
				},
			},
		},
	});
}

export const findMatchesByPuuid = async (puuid: string) => {
	return await prisma.match.findMany({
		where: {
			metaData: {
				participants: {
					some: {
						metaParticipant: puuid,
					}
				}
			}
		},
		select: {
			lastUpdated: true,
			matchId: true,
			metaData: {
				select: {
					dataVersion: true,
					matchId: true,
					participants: {
						select: {
							metaParticipant: true,
						}
					}
				},
			},
			info: {
				select: {
					gameCreation: true,
					gameDuration: true,
					gameEndTimestamp: true,
					gameId: true,
					gameMode: true,
					gameName: true,
					gameStartTimestamp: true,
					gameType: true,
					gameVersion: true,
					mapId: true,
					participants: {
						select: {
							id: true,
							assists: true,
							baronKills: true,
							bountyLevel: true,
							champExperience: true,
							champLevel: true,
							championId: true,
							championName: true,
							championTransform: true,
							consumablesPurchased: true,
							damageDealtToBuildings: true,
							damageDealtToObjectives: true,
							damageDealtToTurrets: true,
							damageSelfMitigated: true,
							deaths: true,
							detectorWardsPlaced: true,
							doubleKills: true,
							dragonKills: true,
							firstBloodAssist: true,
							firstBloodKill: true,
							firstTowerAssist: true,
							firstTowerKill: true,
							gameEndedInEarlySurrender: true,
							gameEndedInSurrender: true,
							goldEarned: true,
							goldSpent: true,
							individualPosition: true,
							inhibitorKills: true,
							inhibitorTakedowns: true,
							inhibitorsLost: true,
							item0: true,
							item1: true,
							item2: true,
							item3: true,
							item4: true,
							item5: true,
							item6: true,
							itemsPurchased: true,
							killingSprees: true,
							kills: true,
							lane: true,
							largestCriticalStrike: true,
							largestKillingSpree: true,
							largestMultiKill: true,
							longestTimeSpentLiving: true,
							magicDamageDealt: true,
							magicDamageDealtToChampions: true,
							magicDamageTaken: true,
							neutralMinionsKilled: true,
							nexusKills: true,
							nexusTakedowns: true,
							nexusLost: true,
							objectivesStolen: true,
							objectivesStolenAssists: true,
							participantId: true,
							pentaKills: true,
							perks: {
								select: {
									statPerks: {
										select: {
											defense: true,
											flex: true,
											offense: true,
										}
									},
									styles: {
										select: {
											description: true,
											selections: {
												select: {
													perk: true,
													var1: true,
													var2: true,
													var3: true,
												},
											},
											style: true,
										},
									},
								},
							},
							physicalDamageDealt: true,
							physicalDamageDealtToChampions: true,
							physicalDamageTaken: true,
							profileIcon: true,
							puuid: true,
							quadraKills: true,
							riotIdName: true,
							riotIdTagline: true,
							role: true,
							sightWardsBoughtInGame: true,
							spell1Casts: true,
							spell2Casts: true,
							spell3Casts: true,
							spell4Casts: true,
							summoner1Casts: true,
							summoner1Id: true,
							summoner2Casts: true,
							summoner2Id: true,
							summonerId: true,
							summonerLevel: true,
							summonerName: true,
							teamEarlySurrendered: true,
							teamId: true,
							teamPosition: true,
							timeCCingOthers: true,
							timePlayed: true,
							totalDamageDealt: true,
							totalDamageDealtToChampions: true,
							totalDamageShieldedOnTeammates: true,
							totalDamageTaken: true,
							totalHeal: true,
							totalHealsOnTeammates: true,
							totalMinionsKilled: true,
							totalTimeCCDealt: true,
							totalTimeSpentDead: true,
							totalUnitsHealed: true,
							tripleKills: true,
							trueDamageDealt: true,
							trueDamageDealtToChampions: true,
							trueDamageTaken: true,
							turretKills: true,
							turretTakedowns: true,
							turretsLost: true,
							unrealKills: true,
							visionScore: true,
							visionWardsBoughtInGame: true,
							wardsKilled: true,
							wardsPlaced: true,
							win: true,
						}
					},
					platformId: true,
					queueId: true,
					teams: {
						select: {
							bans: {
								select: {
									championId: true,
									pickTurn: true,
								},
							},
							objectives: true,
							teamId: true,
							win: true,
						}
					},
					tournamentCode: true,
				}
			},
		},
	});
}

export const readMatch = async(matchId: string): Promise<any> => {

}