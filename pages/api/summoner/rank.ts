import Reksai from "reksai";
import {ISummoner} from "reksai/src/@types/summoner";
import {NextApiRequest, NextApiResponse} from "next";
import {ILeague} from "reksai/src/@types/league";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const reksai = new Reksai(process.env.RIOT_API_KEY)
    const summoner: ISummoner = await reksai.summoner.bySummonerName("irelsama", "eun1")
    const rank: ILeague[] = await reksai.league.entriesBySummonerId(summoner.id)
    const rank2: ILeague = await reksai.league.grandmasterLeaguesByQueue("RANKED_SOLO_5x5")

    res.status(200).json(rank2)
}