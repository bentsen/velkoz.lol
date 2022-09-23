import {NextApiRequest, NextApiResponse} from "next";
import {ddragon} from "reksai";
import {IChampion} from "reksai/src/@types/champion";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const champions: IChampion = await ddragon.champion.getAll()


    res.status(200).json(champions)
}