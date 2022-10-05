import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../../lib/prisma";

export default async(req: NextApiRequest, res: NextApiResponse) => {
	const query = req.query
	const {name} = query
	if (Array.isArray(name)) return;

	const summoners = await prisma.summoner.findMany({
		where: {
			name: {
				startsWith: name
			}
		}
	})

	console.log(summoners)

	res.status(200).json(summoners)
}