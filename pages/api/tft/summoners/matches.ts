import {NextApiRequest, NextApiResponse} from "next";
import Reksai from "reksai";
import {ISummoner} from "reksai/src/@types/summoner";
import axios from "axios";
import {TFTMatch} from "../../../../utils/types/tft/matches.t";
import {IMatch} from "reksai/src/@types/match";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const query = req.query
    const {puuid, region} = query
    const apiKey = process.env.TFT_API_KEY

    const regions: Map<string, string> = new Map([
        ["euw1", "europe"],
        ["eun1", "EUROPE"],
        ["NA1", "AMERICAS"],
        ["BR1", "AMERICAS"],
        ["JP1", "ASIA"],
        ["KR" , "ASIA"],
        ["LA1", "AMERICAS"],
        ["LA2", "AMERICAS"],
        ["OC1", "SEA"],
        ["RU", "EUROPE"],
        ["TR1" , "EUROPE"],
    ])
    const matchIds = await axios.get(`https://${regions.get(String(region))}.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${apiKey}`)
    let newMatches: TFTMatch[] = []
    for (let i = 0; i < matchIds.data.length; i++) {
        const match = await axios.get<TFTMatch>(`https://${regions.get(String(region))}.api.riotgames.com/tft/match/v1/matches/${matchIds.data[i]}?api_key=${apiKey}`)

        newMatches.push(match.data)
    }

    res.status(200).json(newMatches)
}