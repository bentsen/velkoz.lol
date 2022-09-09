import React, {ReactNode} from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {Champion} from "../../utils/types/champion.t";

export const ChampionContext = React.createContext<Champion[] | undefined>([]);

export default function ChampionListProvider({children}: {children: ReactNode}) {
    const [champions, setChampions] = useState<Champion[]>([]);
    const getLastApiVersion = async () => {
        const versionsUrl = 'https://ddragon.leagueoflegends.com/api/versions.json'
        const response = await axios.get<string[]>(versionsUrl);
        const data: string = await response.data[0]

        return data
    }

    useEffect(() =>{
        async function getChampions() {
            const version = await getLastApiVersion()
            axios.get<any>(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
                    .then(response => {
                        let championData = [];
                        for(let key in response.data['data']) {
                            championData.push(response.data['data'][key])
                        }
                 //puts champions data object into state
                setChampions(championData)
            })
                .catch(e => {
                    console.log(e)
                })
        }
        getChampions()
    },[])

    return (
        <>
            <ChampionContext.Provider value={champions}>
                {children}
            </ChampionContext.Provider>
        </>
    )
}