import {NextApiRequest, NextApiResponse} from "next";
import {summonerSpells} from "../../../data/sumonerSpells";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    res.status(200).json(summonerSpells)
}