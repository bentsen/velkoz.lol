import {NextApiRequest, NextApiResponse} from "next";
import {ISummoner} from "reksai/src/@types/summoner";
import axios from "axios";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const query = req.query
    const {puuid, region} = query
    const apiKey = process.env.TFT_API_KEY

    const response = await axios.get<ISummoner>(`https://${region}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${puuid}?api_key=${apiKey}`)

    res.status(200).json(response.data)
}