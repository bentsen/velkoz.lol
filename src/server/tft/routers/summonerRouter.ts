import {prisma} from "@/server/util/prisma";
import {z} from "zod"
import {publicProcedure, router} from "../../trpc";
import axios from "axios";
import {ISummoner} from "@/utils/@types/summoner.t";

//TODO: add update mutation.
//should not be used for now

export const summonerRouter = router({
    byName: publicProcedure
        .input(
            z.object({
                name: z.string(),
                region: z.string(),
            })
        )
        .query(async ({input}) => {
            const count = await prisma.summoner.count({
                where: {
                    name: input.name,
                    region: input.region,
                }
            });

            if(count == 0) {
                const apikey = process.env.RIOT_API_KEY;
                const url = `https://${input.region}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${input.name}`;
                const apiReq = axios.create({
                    headers:{
                        "x-Riot-Token": apikey!
                    }
                })

                const res = await apiReq.get<ISummoner>(url)
                const summoner = await res.data;

                prisma.summoner.create({
                    data: {
                        id: summoner.id,
                        accountId: summoner.accountId,
                        puuid: summoner.puuid,
                        name: summoner.name,
                        profileIconId: summoner.profileIconId,
                        revisionDate: String(summoner.revisionDate),
                        summonerLevel: summoner.summonerLevel,
                        region: input.region,
                    }
                });

                summoner.region = input.region
                return summoner
            }

            return await prisma.summoner.findFirst({
                where: {
                    name: input.name,
                    region: input.region,
                }
            });
        }),
})