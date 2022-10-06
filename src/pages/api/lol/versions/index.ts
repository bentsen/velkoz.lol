import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {Runes} from "../../../../utils/@types/runes.t";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const response = await axios.get("https://ddragon.leagueoflegends.com/api/versions.json")

    res.status(200).json(response.data[0])
}