import useSWR from "swr";
import axios from "axios";
import {ISummoner} from "../utils/@types/summoner.t";

export const useSummoner = async(summonerName: string, region: string) => {
	const url = summonerName ? `/api/lol/summoners/by-name/${summonerName}?region=${region}` : null;
	console.log(summonerName)
	const {data, error, mutate} = useSWR<ISummoner>(url, fetcher);
	return {
		summoner: data,
		error,
		mutate,
	};
}

export async function fetcher<T>(url: string): Promise<T> {
	const response = await axios.get<T>(url);
	return response.data;
}