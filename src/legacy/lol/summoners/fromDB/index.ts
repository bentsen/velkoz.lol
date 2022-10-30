import {NextApiRequest, NextApiResponse} from "next";
import { prisma } from "@/lib/prisma";


export default async(req: NextApiRequest, res: NextApiResponse) =>  {

    const summoners = await prisma.summoner.findMany()

    res.status(200).json(summoners)
}