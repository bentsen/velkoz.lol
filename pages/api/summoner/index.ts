import Reksai from "reksai";
import {ISummoner} from "reksai/src/@types/summoner";
import {NextApiRequest, NextApiResponse} from "next";
import summonerName from "../../lol/[summonerName]";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const query = req.query
    const { summonerName, region } = query
    const reksai = new Reksai(process.env.RIOT_API_KEY)
    const summoner: ISummoner = await reksai.summoner.bySummonerName(String(summonerName), String(region))

    res.status(200).json(summoner)
}