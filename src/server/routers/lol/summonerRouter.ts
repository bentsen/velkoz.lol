import {prisma} from "@/server/util/prisma";
import {z} from "zod"
import {publicProcedure, router} from "../../trpc";
import axios from "axios";
import {ISummoner} from "@/utils/@types/summoner.t";
import {riotRequest} from "@/server/data/riot/riotRequest";
import {inferProcedureOutput} from "@trpc/server";
import {AppRouter} from "@/server/routers/_app";

//TODO: add update mutation.

export const summonerRouter = router({
	byName: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.query(async({input}) => {
			const count = await prisma.summoner.count({
				where: {
					name: input.name,
					region: input.region,
				}
			});

			if (count == 0) {
				const summonerFromApi = await riotRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`)

				const summoner = await prisma.summoner.create({
					data: {
						id: summonerFromApi.id,
						accountId: summonerFromApi.accountId,
						puuid: summonerFromApi.puuid,
						name: summonerFromApi.name,
						summonerLevel: summonerFromApi.summonerLevel,
						profileIconId: summonerFromApi.profileIconId,
						revisionDate: summonerFromApi.revisionDate.toString(),
						region: input.region
					}
				});

				return summoner;
			}

			return await prisma.summoner.findFirst({
				where: {
					name: input.name,
					region: input.region,
				}
			});
		}),
	byPuuid: publicProcedure
		.input(
			z.object({
				puuid: z.string(),
				region: z.string()
			})
		)
		.query( async({input}) => {
			return await prisma.summoner.findFirst({
				where: {
					puuid: input.puuid,
					region: input.region,
				}
			});
		}),
})


export type TSummoner = inferProcedureOutput<AppRouter["summoner"]["byName"]>