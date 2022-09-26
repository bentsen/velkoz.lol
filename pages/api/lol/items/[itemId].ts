import {NextApiRequest, NextApiResponse} from "next";
import {ddragon} from "reksai";
import {IItem} from "reksai/src/@types/items";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const { itemId } = req.query
    const item: IItem = await ddragon.item.itemById(Number(itemId))
    res.status(200).json(item)
}