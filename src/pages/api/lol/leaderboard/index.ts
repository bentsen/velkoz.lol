import {NextApiRequest, NextApiResponse} from "next";
import {League} from "../../../../utils/@types/league.t";
import axios from "axios";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const query = req.query
    const {gameMode, region} = query
    const apiKey = process.env.RIOT_API_KEY

    const response = await axios.get<League>(`https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${gameMode}?api_key=${apiKey}`)

    res.status(200).json(response.data)
}