import Reksai from "reksai";
import {ISummoner} from "reksai/src/@types/summoner";
import {NextApiRequest, NextApiResponse} from "next";
import { prisma } from "../../../lib/prisma";

/*
* Name: Mikkel Bentsen
* Date: 14/9-2022
*/

export default async (req: NextApiRequest, res: NextApiResponse) =>  {

    if(req.method === 'POST') {
        return await addSummoner(req, res);
    } else if (req.method === 'GET'){
        return await readSummoner(req, res);
    }
    else {
        return res.status(405).json({message: 'Method not allowed'})
    }

    async function addSummoner(req: NextApiRequest, res: NextApiResponse){

    }


    async function readSummoner(req: NextApiRequest, res: NextApiResponse){
        /*Name and region typed in url*/
        const query = req.query
        const {name, region} = query

        /*Checks if a summoner exists in database by name and region*/
        let placeCount = await prisma.summoner.count(
            {
                where: {
                    name: String(name),
                    region: String(region)
                }
            }
        )

        /*If no summoner exists in database fetch and push summoner to database and return json*/
        if(placeCount == 0){
            const reksai = new Reksai(process.env.RIOT_API_KEY)
            const summoner: ISummoner = await reksai.summoner.bySummonerName(String(name), String(region))

            try{
                await prisma.summoner.create({
                    data: {
                        summonerid: summoner.id,
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
        /*If summoner exists in database pull summoner from database and return json*/
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
}