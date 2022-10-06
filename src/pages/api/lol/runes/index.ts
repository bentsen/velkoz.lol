import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {Runes} from "../../../../utils/@types/runes.t";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
        const response = await axios.get<Runes[]>("http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/runesReforged.json")
        const data: Runes[] = await response.data


    res.status(200).json(data)
}