import axios from "axios";
import {Summoner} from "../utils/types/summoner.t";
import {Matches} from "../utils/types/matches.t";
import {Ladder} from "../utils/types/ladder.t";
import {Champion} from "../utils/types/champion.t";
import {useState} from "react";

const URL = "http://127.0.0.1:8000/api/";
const DragonURL = "http://ddragon.leagueoflegends.com/cdn/12.13.1/"



function ApiFacade() {

    const getSummoner = async (region: string, summonerName: string) => {
        const response = await axios.get<Summoner>(`${URL}summoner/${region}/${summonerName}`)
        const data: Summoner = await response.data

        return data
    }

    const getMatchData = async (region: string, summonerName: string) => {
        const response = await axios.get<Matches[]>("http://127.0.0.1:8000/api/summoner/matches/Europe%20Nordic%20&%20East/b%C3%B8nne")
        const data: Matches[] = await response.data

        return data
    }

    const getLadder = async (region: string, type: string) => {
        const response = await axios.get<Ladder[]>(`${URL}ladder/lol/${region}/${type}`)
        const data: Ladder[] = await response.data

        return data
    }

    const getTftLadder = async (region: string) => {
        const response = await axios.get<Ladder[]>(`${URL}ladder/tft/${region}`)
        const data: Ladder[] = await response.data

        return data
    }


    return {
        getSummoner,
        getMatchData,
        getLadder,
        getTftLadder,
    }
}
const facade = ApiFacade();
export default facade