import {prisma} from "@/server/util/prisma";
import {z} from "zod"
import {publicProcedure, router} from "../trpc";

//TODO: add update mutation.

export const summonerRouter = router({
	byName: publicProcedure
		.input(
			z.object({
				summonerName: z.string(),
				region: z.string(),
			})
		)
		.query(async({input}) => {
			return await prisma.summoner.findFirst({
				where: {
					name: input.summonerName,
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