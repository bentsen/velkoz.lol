import React, {ReactNode} from "react";
import {useEffect, useState} from "react";
import axios from "axios";

export const VersionContext = React.createContext<string | undefined>("");

export default function VersionListProvider({children}: {children: ReactNode}) {
    const [version, setVersion] = useState<string>("");

    useEffect(() =>{
        async function getVersions() {
            axios.get<string[]>("https://ddragon.leagueoflegends.com/api/versions.json")
                .then(response => {
                        setVersion(response.data[0])
                })
                .catch(e => {
                    console.log(e)
                })
        }
        getVersions()
    })

    return (
        <>
            <VersionContext.Provider value={version}>
                {children}
            </VersionContext.Provider>
        </>
    )
}