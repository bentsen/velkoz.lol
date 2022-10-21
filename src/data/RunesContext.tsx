import React, {ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";
import {VersionContext} from "./VersionContext";
import {IPath} from "@/utils/@types/lol/runes";

export const RunesContext = React.createContext<IPath[] | undefined>([]);

export default function ChampionProvider({children}: {children: ReactNode}) {
	const [paths, setPaths] = useState<IPath[]>([]);
	const latestVersion = useContext(VersionContext);

	useEffect(() =>{
		if (!latestVersion) return;
		async function getRunes() {
			const url = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/runesReforged.json`
			const res = await axios.get<IPath[]>(url);
			const data = await res.data;

			data.forEach((path) => {
				const locator = path.icon;
				path.icon = `https://ddragon.leagueoflegends.com/cdn/img/${locator}`;

				path.slots.forEach((slot) => {
					slot.runes.forEach((rune) => {
						const locator = rune.icon;
						rune.icon = `https://ddragon.leagueoflegends.com/cdn/img/${locator}`;
					});
				});
			});
			setPaths(data);
		}
		getRunes();
	},[latestVersion])

	return (
		<>
			<RunesContext.Provider value={paths}>
				{children}
			</RunesContext.Provider>
		</>
	)
}