import React, {ReactNode, useContext, useEffect, useState} from "react";
import {Champion} from "../utils/types/champion.t";
import axios from "axios";
import {ChampionContext} from "./ChampionContext";
import {IItem} from "reksai/src/@types/items";
import {VersionContext} from "./VersionContext";

export const ItemContext = React.createContext<IItem[] | undefined>([]);

export default function ItemProvider({children}: {children: ReactNode}) {
	const [items, setItems] = useState<IItem[]>([]);
	const latestVersion = useContext(VersionContext);

	useEffect(() =>{
		async function getChampions() {
			if (!latestVersion) return;
			axios.get<any>(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`)
				.then(response => {
					let itemData = [];
					for(let key in response.data['data']) {
						itemData.push(response.data['data'][key])
					}
					//puts champion data object into state
					setItems(itemData)
				})
				.catch(e => {
					console.log(e)
				})
		}
		getChampions()
	},[latestVersion])

	return (
		<>
			<ItemContext.Provider value={items}>
				{children}
			</ItemContext.Provider>
		</>
	)
}