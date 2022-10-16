import React, {ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";
import {VersionContext} from "./VersionContext";
import {ChampionResponse, IChampion} from "reksai/src/@types/champion";

export const ChampionContext = React.createContext<IChampion[] | undefined>([]);

export default function ChampionProvider({children}: {children: ReactNode}) {
    const [champions, setChampions] = useState<IChampion[]>([]);
	const latestVersion = useContext(VersionContext);

    useEffect(() =>{
		if (!latestVersion) return;
        async function getChampions() {
			const url = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
			const res = await axios.get<ChampionResponse>(url);
			const data = await res.data;
			let champs:IChampion[] = []
			for (let key in data.data) {
				const champ = data.data[key];
				champ.image = {
					full: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champ.id}_0.png`,
					sprite: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champ.id}.png`,
					group: "champion",
					x: champ.image.x,
					y: champ.image.y,
					w: champ.image.w,
					h: champ.image.h,
				};
				champs.push(champ);
			}
			setChampions(champs)
        }
        getChampions();
    },[latestVersion])

    return (
        <>
            <ChampionContext.Provider value={champions}>
                {children}
            </ChampionContext.Provider>
        </>
    )
}