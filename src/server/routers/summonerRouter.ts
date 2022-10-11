import {prisma} from "@/server/util/prisma";
import {z} from "zod"
import {publicProcedure, router} from "../trpc";
import axios from "axios";
import {ISummoner} from "@/utils/@types/summoner.t";

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
				const apiKey = process.env.RIOT_API_KEY;
				const url = `https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${input.name}`;
				const apiReq = axios.create({
					headers: {
						"X-Riot-Token": apiKey!
					}
				})

				const res = await apiReq.get<ISummoner>(url);
				const summoner = await res.data;

				prisma.summoner.create({
					data: {
						id: summoner.id,
						accountId: summoner.accountId,
						puuid: summoner.puuid,
						name: summoner.name,
						summonerLevel: summoner.summonerLevel,
						profileIconId: summoner.profileIconId,
						revisionDate: String(summoner.revisionDate),
						region: input.region
					}
				});

				summoner.region = input.region;
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