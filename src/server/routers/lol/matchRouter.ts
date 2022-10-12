import {publicProcedure, router} from "@/server/trpc";
import {z} from "zod";
import {prisma} from "@/server/util/prisma";
import {apiRequest} from "@/server/util/riot/apiRequest";
import {ISummoner} from "@/utils/@types/summoner.t";
import {IMatch} from "@/utils/@types/lol/match";
import {convertToRegion} from "@/server/util/riot/regions";

export const matchRouter = router({
	getMatches: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.query(async({input}) => {

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
			return matches;
		}),
	/*
	update: publicProcedure
		.input(
			z.object({
				name: z.string(),
				region: z.string(),
			})
		)
		.query( async({input}) => {
			const summoner = await apiRequest<ISummoner>(`https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`);
			const newestMatches = await apiRequest<IMatch[]>(`https://${convertToRegion(input.region)}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`)

			const alreadyHas = await prisma.match.count({
				select: {

				}
			})

			const updatedMatches = await prisma.match.create({
				include: {
					metaData: {
						where: {
							gameId:
						}
					}
				}
			})
		})
	 */
})