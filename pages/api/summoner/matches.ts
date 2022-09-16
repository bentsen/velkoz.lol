import Reksai from "reksai";
import {ISummoner} from "reksai/src/@types/summoner";
import {NextApiRequest, NextApiResponse} from "next";
import {IMatch} from "reksai/src/@types/match";
import { prisma } from "../../../lib/prisma";
import summonerName from "../../lol/[summonerName]";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {


    if(req.method === 'POST') {
        return await addMatches(req, res);
    } else if (req.method === 'GET'){
        return await readMatches(req, res);
    }
    else {
        return res.status(405).json({message: 'Method not allowed'})
    }


    async function addMatches(req: NextApiRequest, res: NextApiResponse){


    }

    async function readMatches(req: NextApiRequest, res: NextApiResponse) {
        const query = req.query
        const {summonerName, region} = query


        let summonerData = await prisma.summoner.findFirst(
            {
                where: {
                    name: String(summonerName),
                    region: String(region)
                },
                include: {
                    matches: {}
                }

            }
        )
        if (summonerData != null) {
            if (summonerData.matches.length == 0) {
                const reksai = new Reksai(process.env.RIOT_API_KEY)
                const summoner: ISummoner = await reksai.summoner.bySummonerName(String(summonerName), String(region))
                const matchIds = await reksai.match.idsByPuuid(summoner.puuid)
                let matches: IMatch[] = []
                for (let i = 0; i < matchIds.length; i++) {
                    const temp = await reksai.match.byMatchId(matchIds[i], "europe")
                    matches.push(temp)
                }

                try {
                    await Promise.all([matches.map(async (match) => {
                        await prisma.match.create({
                            data:{
                                metaData:{
                                    create: {
                                        matchId: match.metadata.matchId,
                                        dataVersion: match.metadata.dataVersion,
                                        participants: {
                                            create: match.metadata.participants.map(participant => ({
                                                metaParticipant: participant
                                            }))
                                        }
                                    }
                                },
                                info:{
                                    create:{
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
                                        participants:{
                                            create: match.info.participants.map(participant => ({
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
                                                goldEarned:participant.goldEarned,
                                                goldSpent:participant.goldEarned,
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
                                                    create:{
                                                        statPerks: {
                                                            create:{
                                                                defense: participant.perks.statPerks.defense,
                                                                flex: participant.perks.statPerks.flex,
                                                                offense: participant.perks.statPerks.offense,
                                                            }
                                                        },
                                                        styles: {
                                                            create: participant.perks.styles.map(style => ({
                                                                description: style.description,
                                                                selections:{
                                                                  create: style.selections.map(selection => ({
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
                                            }))
                                        },
                                        platformId: match.info.platformId,
                                        queueId: match.info.queueId,
                                        teams: {
                                            create: match.info.teams.map(team => ({
                                                bans: {
                                                    create: team.bans.map(ban => ({
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

                                    }
                                }
                            }
                        })
                    })])
                    return res.status(200).json(summoner);
                } catch (error) {
                    console.error("Request error", error);
                    res.status(500).json({error: "Error creating Summoner"})
                }
            }
            res.status(200).json(matches)
        }
    }
}