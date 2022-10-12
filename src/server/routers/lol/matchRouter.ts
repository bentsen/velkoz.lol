import {publicProcedure, router} from "@/server/trpc";
import {z} from "zod";
import {prisma} from "@/server/util/prisma";
import {apiRequest} from "@/server/util/riot/apiRequest";
import {ISummoner} from "@/utils/@types/summoner.t";
import {convertToRegion} from "@/server/util/riot/regions";
import {IMatch} from "@/utils/@types/lol/match";

export const matchRouter = router({
	getMatches: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.query(async ({input}) => {

			const summoner = await apiRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`)

			const matches = await prisma.match.findMany({
				include: {
					metaData: {
						include: {
							participants: {
								where: {
									metaParticipant: summoner.puuid,
								}
							}
						}
					},
					info: {
						include: {
							participants: true,
							teams: {
								include: {
									bans: true,
								},
							},
						},
					},
				},
			});

			console.log(matches);
			return matches;
		}),
	update: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.mutation(async ({input}) => {
			const convertedRegion = convertToRegion(input.region);

			const summoner = await apiRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`);
			const latestMatches = await apiRequest<string[]>(`https://${convertedRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids`)

			console.log(latestMatches);
			const filteredMatchIds = latestMatches.filter(async(matchId) => {
				const count = await prisma.metadata.count({
					where: {
						matchId: matchId,
					}
				})

				return count == 0;
			})

			const newMatchesFromApiPromise = filteredMatchIds.map(async(matchId) => {
				return await apiRequest<IMatch>(`https://${convertedRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`)
			})
			const newMatches = await Promise.all(newMatchesFromApiPromise)

			/**
			 * TODO: I need to make this LOOONG query.
			 *  I really want a nice solution but it seems like I need to go through
			 *  all values one by one to serialize it. Help me pls :/
			 */
			const createNewMatches = await prisma.match.createMany({
				data: {}
			})

			const updatedMatches = await prisma.match.findMany({
				include: {
					metaData: {
						include: {
							participants: {
								where: {
									metaParticipant: summoner.puuid,
								}
							}
						}
					},
					info: {
						include: {
							participants: true,
							teams: {
								include: {
									bans: true,
								},
							},
						},
					},
				},
			});

			return updatedMatches;
		})
})