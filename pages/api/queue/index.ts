import {NextApiRequest, NextApiResponse} from "next";
import queues from "../../../data/queues.json";


export default async (req: NextApiRequest, res: NextApiResponse) =>  {
    res.status(200).json(queues)
}