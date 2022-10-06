import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {Agent} from "../../../../utils/@types/agents.t"

export default async (req: NextApiRequest, res: NextApiResponse) =>  {

    const response = await axios.get<Agent>("https://valorant-api.com/v1/agents")

    res.status(200).json(response.data)
}