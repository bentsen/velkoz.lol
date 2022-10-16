import React, {ReactNode} from "react";
import {useEffect, useState} from "react";
import axios from "axios";

export const VersionContext = React.createContext<string | undefined>("");

export default function VersionProvider({children}: {children: ReactNode}) {
    const [version, setVersion] = useState<string>("");

    useEffect(() =>{
        async function getVersions() {
			const url = "https://ddragon.leagueoflegends.com/api/versions.json";
			const res = await axios.get(url);
			const data = await res.data[0];
			setVersion(data)
        }
        getVersions()
    }, [])

    return (
        <>
            <VersionContext.Provider value={version}>
                {children}
            </VersionContext.Provider>
        </>
    )
}