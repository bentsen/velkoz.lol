import {NextApiRequest, NextApiResponse} from "next";
import Reksai from "reksai";
import {ILeagueEntry} from "reksai/src/@types/league";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {summonerId, region} = req.query
    const reksai = new Reksai(process.env.RIOT_API_KEY)
    const leagues: ILeagueEntry[] = await reksai.league.entriesBySummonerId(String(summonerId), String(region))

    res.status(200).json(leagues)
}