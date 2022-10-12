import axios from "axios";
import {ISummoner} from "@/utils/@types/summoner.t";

export const apiRequest = async<T>(url: string) => {
	const apiKey = process.env.RIOT_API_KEY;
	const apiReq = axios.create({
		headers: {
			"X-Riot-Token": apiKey!
		}
	})

	const res = await apiReq.get<T>(url);
	return res.data;

}