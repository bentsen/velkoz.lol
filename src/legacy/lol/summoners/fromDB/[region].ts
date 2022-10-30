import {NextApiRequest, NextApiResponse} from "next";
import { prisma } from "../../../../lib/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    const query = req.query
    const {region} = query

    const summoners = await prisma.summoner.findMany(
        {
            where:{
                region: String(region)
            }
        }
    )

    res.status(200).json(summoners)
}