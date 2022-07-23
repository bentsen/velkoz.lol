import axios from "axios";
import {Summoner} from "../utils/types/summoner.t";
import {Match} from "../utils/types/matches.t";

const URL = "http://127.0.0.1:8000/api/";
const DragonURL = "http://ddragon.leagueoflegends.com/cdn/12.13.1/"



function ApiFacade() {

    const getSummoner = async (region, summonerName) => {
        const response = await axios.get<Summoner>(`${URL}summoner/${region}/${summonerName}`)
        const data: Summoner = await response.data

        return data
    }

    const getMatch = async (region, summonerName) => {
        const response = await axios.get<Match>("http://127.0.0.1:8000/api/summoner/matches/Europe%20Nordic%20&%20East/b%C3%B8nne")
        const data: Match = await response.data

        return data
    }


    return {
        getSummoner,
        getMatch,
    }
}
const facade = ApiFacade();
export default facade