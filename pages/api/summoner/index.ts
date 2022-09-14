import Reksai from "reksai";
import {ISummoner} from "reksai/src/@types/summoner";
import {NextApiRequest, NextApiResponse} from "next";
import { prisma } from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const query = req.query
    const {name, region} = query

    let placeCount = await prisma.summoner.count(
        {
            where: {
                name: String(name),
                region: String(region)
            }
        }
    )

    if(placeCount == 0){
        const reksai = new Reksai(process.env.RIOT_API_KEY)
        const summoner: ISummoner = await reksai.summoner.bySummonerName(String(name), String(region))

        try{
            await prisma.summoner.create({
                data: {
                    id: summoner.id,
                    accountId: summoner.accountId,
                    puuid: summoner.puuid,
                    name: summoner.name,
                    summonerLevel: summoner.summonerLevel,
                    profileIconId: summoner.profileIconId,
                    revisionDate: String(summoner.revisionDate),
                    region: String(region)
                }
            });
            return res.status(200).json(summoner);
        } catch (error) {
            console.error("Request error", error);
            res.status(500).json({error: "Error creating Summoner"})
        }
    }
    else{
        try{
            const summoner = await prisma.summoner.findFirst({
                where: {
                    name: String(name),
                    region: String(region)
                }
            })
            return res.status(200).json(summoner)
        } catch (error) {
            return res.status(500).json({error: "Error reading from databse"})
        }
    }
}