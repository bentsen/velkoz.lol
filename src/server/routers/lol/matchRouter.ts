import {publicProcedure, router} from "@/server/trpc";
import {z} from "zod";
import {prisma} from "@/server/util/prisma";
import {riotRequest} from "@/server/data/riot/riotRequest";
import {ISummoner} from "@/utils/@types/summoner.t";
import {convertToRegion} from "@/server/data/lol/regions";
import {createMatch, findMatchesByPuuid, getMatch} from "@/server/data/lol/match";
import {inferProcedureOutput} from "@trpc/server";
import {AppRouter} from "@/server/routers/_app";
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
			const summoner = await riotRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`);
			return await findMatchesByPuuid(summoner.puuid);
		}),
	getMatch: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.query(async ({input}) => {
			const summoner = await riotRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`);
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
			const latestMatches = await riotRequest<string[]>(`https://${convertedRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=20`)


			/**
			 * TODO: I need to make this LOOONG query.1
			 *  I really want a nice solution but it seems like I need to go through
			 *  all values one by one to serialize it. Help me pls :/
			 */

			for (const _matchId of latestMatches) {
				const count = await prisma.metadata.count({
					where: {
						matchId: _matchId
					}
				})

				if (count == 0) {
					const match = await getMatch(_matchId, input.region) as IMatch;
					await createMatch(match);
				}
			}

			return await findMatchesByPuuid(summoner.puuid);
		})
})

export type TMatches = inferProcedureOutput<AppRouter["match"]["getMatches"]>
export type TMatch = inferProcedureOutput<AppRouter["match"]["getMatch"]>