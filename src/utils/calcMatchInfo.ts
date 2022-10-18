import {TMatches} from "@/server/routers/lol/matchRouter";
import {boolean} from "zod";

export function calcKDA(k: number, d: number, a: number) {
	if (d == 0) return k;
	const kda = (k + a) / d;
	return kda.toFixed(2);
}

interface ChampPlayed {
	name: string,
	champId: number,
	played: number,
	wins: number,
	kills: number,
	deaths: number,
	assists: number,
}

export function calcChampFreq(puuid: string | undefined, matches: TMatches | undefined, iter: number) {
	if (matches == undefined || puuid == undefined) return;

	const champsPlayed: ChampPlayed[] = []
	for (let i = 0; i <= iter; i++) {
		const summoner = matches[i].info?.participants.find((a) => a.puuid == puuid);
		if (summoner == undefined) return;

		const currentChamp = champsPlayed.findIndex((obj) => obj.champId == summoner.championId);
		const currentWin = summoner.win ? 1 : 0;

		if (currentChamp == -1) {
			champsPlayed.push({
				name: summoner.championName,
				champId: summoner.championId,
				played: 1,
				wins: currentWin,
				kills: summoner.kills,
				deaths: summoner.deaths,
				assists: summoner.assists,
			})
		} else {
			const updateChamp = champsPlayed[currentChamp];
			updateChamp.played++;
			updateChamp.wins = champsPlayed[currentChamp].wins + currentWin;
			updateChamp.kills = updateChamp.kills + summoner.kills;
			updateChamp.deaths = updateChamp.deaths + summoner.deaths;
			updateChamp.assists = updateChamp.assists + summoner.assists;
		}

	}


	return champsPlayed
		.sort((a, b) => b.played - a.played)
		.slice(0, 3);
}

export function calcWinRate(puuid: string | undefined, matches: TMatches | undefined, iter: number): number[] {
	if (matches == undefined || puuid == undefined) return [0, 0];

	let wins = 0;
	for (let i = 0; i <= iter; i++) {
		const didWin = matches[i].info?.participants.find((a) => a.puuid == puuid)?.win;
		if (didWin != undefined) {
			didWin && wins++;
		}

	}

	const loses = iter - wins;

	return [wins, loses]
}