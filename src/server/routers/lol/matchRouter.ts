import {publicProcedure, router} from "@/server/trpc";
import {z} from "zod";
import {prisma} from "@/server/util/prisma";
import axios from "axios";
import {ISummoner} from "@/utils/@types/summoner.t";
import puuid from "@/pages/api/tft/summoners/by-puuid/[puuid]";

export const matchRouter = router({
	getMatches: publicProcedure
		.input(
			z.object({
				puuid: z.string(),
				region: z.string(),
			})
		)
		.query(async({input}) => {
			const matches = await prisma.metaParticipant.findMany({
				where: {
					metaParticipant: input.puuid,
				},
				include: {
				}
			});

		})
})