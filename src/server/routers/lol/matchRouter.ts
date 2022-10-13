import {publicProcedure, router} from "@/server/trpc";
import {z} from "zod";
import {prisma} from "@/server/util/prisma";
import {riotRequest} from "@/server/data/riot/riotRequest";
import {ISummoner} from "@/utils/@types/summoner.t";
import {convertToRegion} from "@/server/data/lol/regions";
import {IMatch} from "@/utils/@types/lol/match";
import {createMatch, matchNotInDb} from "@/server/data/lol/match";

export const matchRouter = router({
	getMatches: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.query(async ({input}) => {
			const summoner = await riotRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`)
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

			const summoner = await riotRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`);
			const latestMatches = await riotRequest<string[]>(`https://${convertedRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=10`)

			//console.log("latest matches: " + latestMatches);
			const filteredMatchIds = latestMatches?.filter(async(matchId) => {
				return await matchNotInDb(matchId);
			});

			const newMatchesFromApiPromise = Promise.all(filteredMatchIds!.map(async(matchId) => {
				const match = await riotRequest<IMatch>(`https://${convertedRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`);
				console.log(match);
				return match;
			}));

			const newMatches = await newMatchesFromApiPromise;

			/**
			 * TODO: I need to make this LOOONG query.
			 *  I really want a nice solution but it seems like I need to go through
			 *  all values one by one to serialize it. Help me pls :/
			 */

			newMatches.map((match) => {
				match && createMatch(match);
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
			})
			return updatedMatches;
		})
})