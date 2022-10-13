import axios, {Axios, AxiosError} from "axios";
import {ISummoner} from "@/utils/@types/summoner.t";
import {convertToRegion} from "@/server/data/lol/regions";

export const riotRequest = async<T>(url: string): Promise<T> => {
	const apiKey = process.env.RIOT_API_KEY;
	const apiReq = axios.create({
		headers: {
			"X-Riot-Token": apiKey!
		}
	})
	return new Promise<T>((resolve, reject) => {
		apiReq.get(url)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err: AxiosError) => {
				console.error(err.message);
				reject(err);
				throw new Error(err.message);
			})
	})

}