import Reksai from "reksai";
import {ISummoner} from "reksai/src/@types/summoner";
import type {NextApiRequest, NextApiResponse} from "next";
import { prisma } from "../../../lib/prisma";
import axios from "axios";

/*
* Name: Mikkel Bentsen
* Date: 14/9-2022
*/

export default async (req: NextApiRequest, res: NextApiResponse) =>  {

    if(req.method === 'PUT') {
        return await updateSummoner(req, res);
    } else if (req.method === 'GET'){
        return await readSummoner(req, res);
    }
    else {
        return res.status(405).json({message: 'Method not allowed'})
    }

    async function updateSummoner(req: NextApiRequest, res: NextApiResponse){
        const query = req.query
        const {summonerId, region} = query

        const riotapikey = process.env.RIOT_API_KEY
        const response = await axios.get<ISummoner>(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${riotapikey}`)
        const newSummoner = response.data

        await prisma.summoner.update({
            where: {
                puuid: newSummoner.puuid
            },
            data: {
                id: newSummoner.id,
                accountId: newSummoner.accountId,
                puuid: newSummoner.puuid,
                name: newSummoner.name,
                summonerLevel: newSummoner.summonerLevel,
                profileIconId: newSummoner.profileIconId,
                revisionDate: String(newSummoner.revisionDate),
                region: String(region)
            }
        })
        return res.status(200).json(newSummoner);
    }


    async function readSummoner(req: NextApiRequest, res: NextApiResponse){
        /*Name and region typed in url*/
        const query = req.query
        const {summonerId, region} = query

        /*Checks if a summoner exists in database by name and region*/
        let placeCount = await prisma.summoner.count(
            {
                where: {
                    id: String(summonerId),
                    region: String(region)
                }
            }
        )

        /*If no summoner exists in database fetch and push summoner to database and return json*/
        if(placeCount == 0){
            const riotapikey = process.env.RIOT_API_KEY
            const response = await axios.get<ISummoner>(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${riotapikey}`)
            const summoner = response.data

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
        /*If summoner exists in database pull summoner from database and return json*/
        else{
            try{
                const summoner = await prisma.summoner.findFirst({
                    where: {
                        id: String(summonerId),
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