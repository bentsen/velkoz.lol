import {Flex, Solo} from "./summoner.t";

export interface TftSummoner {
    summonerId: string
    puuid: string
    summonerLevel: number
    name: string
    profile_icon_id: number
    solo: Solo
    flex: Flex
}