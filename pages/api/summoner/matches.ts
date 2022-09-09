import Reksai from "reksai";
import {ISummoner} from "reksai/src/@types/summoner";
import {NextApiRequest, NextApiResponse} from "next";
import {IMatch} from "reksai/src/@types/match";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const query = req.query
    const { summonerName, region } = query
    const reksai = new Reksai(process.env.RIOT_API_KEY)
    const summoner: ISummoner = await reksai.summoner.bySummonerName(String(summonerName), String(region))
    const matchIds = await reksai.match.idsByPuuid(summoner.puuid)
    let matches: IMatch[] = []
    for (let i = 0; i < matchIds.length; i++) {
        const temp = await reksai.match.byMatchId(matchIds[i],"europe")
        matches.push(temp)
    }
    res.status(200).json(matches)
}