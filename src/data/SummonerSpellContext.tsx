import React, {ReactNode, useContext, useEffect, useState} from "react";
import {IItem, ItemsResponse} from "@/utils/@types/lol/item";
import {VersionContext} from "@/data/VersionContext";
import axios from "axios";
import {ISummonerSpellResponse, SummonerSpell} from "@/utils/@types/lol/summonerSpell";

export const SummonerSpellContext = React.createContext<SummonerSpell[] | undefined>([]);

export default function SummonerSpellProvider({children}: {children: ReactNode}) {
	const [spells, setSpells] = useState<SummonerSpell[]>([]);
	const latestVersion = useContext(VersionContext);

	useEffect(() =>{
		if (!latestVersion) return;
		async function getItems() {
			const url = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/summoner.json`;
			const res = await axios.get<ISummonerSpellResponse>(url);
			const data = await res.data;
			let _spells: SummonerSpell[] = []
			let counter = 0;

			for (let key in data.data) {
				const currentSpell = data.data[key];
				currentSpell.index = counter;
				currentSpell.id = key;
				currentSpell.image = {
					full: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${currentSpell.id}.png`,
					sprite: `https://ddragon.leagueoflegends.com/cdn/12.19.1/img/sprite/spell0.png`,
					group: "item",
					x: currentSpell.image.x,
					y: currentSpell.image.y,
					w: currentSpell.image.w,
					h: currentSpell.image.h,
				};

				counter++;
				_spells.push(currentSpell);
			}
			setSpells(_spells);
		}
		getItems();
	},[latestVersion])

	return (
		<>
			<SummonerSpellContext.Provider value={spells} >
				{children}
			</SummonerSpellContext.Provider>
		</>
	)
}