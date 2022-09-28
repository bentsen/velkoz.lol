import {NextApiRequest, NextApiResponse} from "next";
import {ILeagueEntry} from "reksai/src/@types/league";
import axios from "axios";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {summonerId, region} = req.query
    const apiKey = process.env.TFT_API_KEY

    const response = await axios.get<ILeagueEntry[]>(`https://${region}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${apiKey}`)

    res.status(200).json(response.data)
}