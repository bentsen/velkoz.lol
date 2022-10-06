import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {Entry, League} from "../../../../utils/@types/league.t";

interface customLeague {
    entry: Entry,
    region: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const apiKey = process.env.TFT_API_KEY

    let topPlayers = []

    const eun1 = await axios.get<League>(`https://eun1.api.riotgames.com/tft/league/v1/challenger?api_key=${apiKey}`)
    const eunTemp = eun1.data.entries.sort((a,b)=> b.leaguePoints - a.leaguePoints)
    const topPlayerEun: customLeague = {
        entry: eunTemp[0],
        region: "eun1"
    }
    topPlayers.push(topPlayerEun)
    const euw1 = await axios.get<League>(`https://euw1.api.riotgames.com/tft/league/v1/challenger?api_key=${apiKey}`)
    const euwTemp = euw1.data.entries.sort((a,b)=> b.leaguePoints - a.leaguePoints)
    const topPlayerEuw: customLeague = {
        entry: euwTemp[0],
        region: "euw1"
    }
    topPlayers.push(topPlayerEuw)
    const na1 = await axios.get<League>(`https://na1.api.riotgames.com/tft/league/v1/challenger?api_key=${apiKey}`)
    const naTemp = na1.data.entries.sort((a,b)=> b.leaguePoints - a.leaguePoints)
    const topPlayerNa: customLeague = {
        entry: naTemp[0],
        region: "na1"
    }
    topPlayers.push(topPlayerNa)



    res.status(200).json(topPlayers)
}