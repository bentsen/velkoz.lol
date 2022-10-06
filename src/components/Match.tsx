import Link from "next/link";
import {useEffect, useState} from "react";
import {IMatch, Participant} from "reksai/src/@types/match";
import {ISummoner} from "reksai/src/@types/summoner";
import axios from "axios";
import {Runes} from "../utils/@types/runes.t";
import {Spell} from "../utils/@types/spell.t"
import Image from "next/image";
import {useRouter} from "next/router";
import { Tooltip } from '@nextui-org/react';
import {IItem, ItemsResponse} from "reksai/src/@types/items";
import useSWR from "swr";

/*
* Name: Mikkel Bentsen
* Date: 14/9-2022
*/

const Match = ({match, summoner} : {match: IMatch, summoner: ISummoner}) => {
    const router = useRouter()
    /*useStake for match state*/
    const [matchWon, setMatchWon] = useState<boolean>()
    /*useStake for summoner*/
    const [summonerParticipant, setSummonerParticipant] = useState<ISummoner>(summoner)
    /*useState for Runes array*/
    const [runes, setRunes] = useState<Runes[]>([])
    /*useState for Spell array*/
    const [spells, setSpells] = useState<Spell[]>([])
    /*useState that indicates if match is expanded*/
    const [expanded, setExpanded] = useState(false)
    /*useState for items object*/
    const [items, setItems] = useState<ItemsResponse>()
    /*fetcher engine*/
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    /*ddragon vesion*/
    const { data: version } = useSWR("/api/lol/versions", fetcher)

    /*useEffect to fetch all spells*/
    useEffect(() => {
        async function getSpells(){
            const response = await axios.get<Spell[]>("/api/lol/spells/")
            const data:Spell[] = await response.data
            setSpells(data)
        }
        getSpells()
    },[])

    useEffect(() => {
        async function getItems(){
            const response = await axios.get<ItemsResponse>("/api/lol/items")
            const data:ItemsResponse = await response.data
            setItems(data)
        }
        getItems()
    },[])

    /*useEffect to check if match is won or lost*/
    useEffect(()  => {
        const matchWon = () => {
            for(let i = 0; i < match.info.participants.length; i++){
                if(match.info.participants[i]?.puuid != undefined){
                    if(match.info.participants[i].puuid == summonerParticipant?.puuid) {
                        setMatchWon(match.info.participants[i].win)
                    }
                }
            }
        }
        matchWon()
    })

    /*useEffect to fetch all runes*/
    useEffect(() => {
        async function getRunes(){
            const response = await axios.get<Runes[]>("/api/lol/runes/")
            const data:Runes[] = await response.data
            setRunes(data)
        }
        getRunes()
    }, [])

    /*Get summoner spell by id*/
    const getSummonerSpell = (id: number | undefined) => {
        if(id != undefined){
            for(let i = 0; i < spells.length; i++){
                if(spells[i].id == id){
                    return spells[i]
                }
            }
        }
    }

    /*Get runeIcon by id*/
    const getRune = (id: number | undefined) => {
        if(id != undefined) {
            for(let i = 0; i < runes.length; i++) {
                for(let j = 0; j < runes[i].slots.length; j++){
                    for(let l = 0; l < runes[i].slots[j].runes.length; l++) {
                        if(runes[i].slots[j].runes[l].id == id){
                            return runes[i].slots[j].runes[l]
                        }
                    }
                }
            }
        }
    }

    /*Get runeStyleIcon by id*/
    const getRuneStyle = (id: number | undefined) => {
        if(id != undefined){
            for(let i = 0; i < runes.length; i++) {
                if(runes[i].id == id){
                    return runes[i]
                }
            }
        }

    }

    /*Get summoner from match*/
    const getSummerParticipant = () => {
        let participant: Participant

        for (let i=0;i < match.info.participants.length; i++){
            if(match.info.participants[i]?.puuid != undefined) {
                if (match.info.participants[i]?.puuid == summonerParticipant?.puuid) {
                    return participant = match.info.participants[i]
                }
            }
            else {
                console.log("undefined")
                return null
            }
        }
    }

    const getSummonerProcentTeamKillsEarned = () => {
        const totalKills = getSummonerTeam()?.objectives.champion.kills! + getEnemyTeam()?.objectives.champion.kills!
        return Math.round((getSummonerTeam()?.objectives.champion.kills! / totalKills) * 100)
    }

    const getEnemyProcentTeamKillsEarned = () => {
        const totalKills = getSummonerTeam()?.objectives.champion.kills! + getEnemyTeam()?.objectives.champion.kills!
        return Math.round((getEnemyTeam()?.objectives.champion.kills! / totalKills) * 100)
    }

    /*get team percentage gold earned in match*/
    const getEnemyProcentTeamGoldEarned = () => {
        if(getTotalGoldSummonerTeam() != undefined && getTotalGoldEnemyTeam() != undefined){
            const totalGold = getTotalGoldEnemyTeam() + getTotalGoldSummonerTeam()
            return Math.round((getTotalGoldEnemyTeam() / totalGold) * 100)
        }
    }

    /*get team percentage gold earned in match*/
    const getSummonerTeamProcentGoldEarned = () => {
        if(getTotalGoldSummonerTeam() != undefined && getTotalGoldEnemyTeam() != undefined){
            const totalGold = getTotalGoldEnemyTeam() + getTotalGoldSummonerTeam()
            return Math.round((getTotalGoldSummonerTeam() / totalGold) * 100)
        }
    }

    /*get total earned gold from enemy team*/
    const getTotalGoldEnemyTeam = () => {
        let gold: number = 0
        for(let i = 0; i < getEnemyPlayers().length; i++){
            gold += getEnemyPlayers()[i].goldEarned
        }

        return gold
    }

    /*get total earned gold from summoner team*/
    const getTotalGoldSummonerTeam = () => {
        let gold: number = 0
        for(let i = 0; i < getSummonerPlayers().length; i++){
            gold += getSummonerPlayers()[i].goldEarned
        }

        return gold
    }

    /*get enemy team*/
    const getEnemyTeam = () => {
        for(let i = 0; i < match.info.teams.length; i++){
            if(match.info.teams[i].teamId != getSummerParticipant()?.teamId){
                return match.info.teams[i]
            }
        }
    }

    /*get summoner team*/
    const getSummonerTeam = () => {
        for(let i = 0; i < match.info.teams.length; i++ ){
            if(match.info.teams[i].teamId == getSummerParticipant()?.teamId){
                return match.info.teams[i]
            }
        }
    }

    /*get players on summoner team*/
    const getSummonerPlayers = () => {
        for(let i = 0; i < getFirstHalf().length; i++){
            if(getFirstHalf()[i].puuid == summonerParticipant.puuid){
                return getFirstHalf()
            }
        }
        return getLastHalf()
    }

    /*get players on enemy team*/
    const getEnemyPlayers = () => {
        for(let i = 0; i < getFirstHalf().length; i++){
            if(getFirstHalf()[i].puuid == summonerParticipant.puuid){
                return getLastHalf()
            }
        }
        return getFirstHalf()
    }

    /*Get first team in match*/
    const getFirstHalf = () => {
        const half_length = Math.ceil(match.info.participants.length / 2)

        return match.info.participants.slice(0, half_length)
    }

    /*Get second team in match*/
    const getLastHalf = () => {
        const half_length = Math.ceil(match.info.participants.length / 2)

        return match.info.participants.slice(half_length)
    }

    /*Calculate kda of summoner*/
    const calculateKDA = (kills:number | undefined, deaths:number | undefined, assists:number | undefined) => {
       if(kills != undefined && deaths != undefined && assists != undefined) {
            const KDA: number = (kills + assists) / deaths
            const temp = parseFloat(String(KDA)).toFixed(2)

           return temp
       }
       else{
           console.log("undefined")
       }
    }

    /*Calculate total cs of summoner*/
    const calculateSummonerCs = () => {
        const totalMinions = getSummerParticipant()?.totalMinionsKilled
        const totalJungleMonsters = getSummerParticipant()?.neutralMinionsKilled
        if(totalMinions != undefined && totalJungleMonsters != undefined) {
            return totalMinions + totalJungleMonsters
        }
    }

    /*Get time since match was played*/
    const timeSince = () => {
        const timeStamp = Number(match.info.gameEndTimestamp)
        const date = new Date(timeStamp).valueOf()

        const seconds = Math.floor((new Date().valueOf() - date) / 1000)

        let interval: any = seconds / 31536000

        if(interval > 1) {
            return Math.floor(interval) + " years"
        }
        interval = seconds / 2592000
        if(interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    /*Calculate summoner cs per minute*/
    const calculateCsPerMin = (totalCs: number | undefined) => {
        const matchDuration = match.info.gameDuration
        const totalMinions = totalCs
       if(matchDuration != undefined && totalMinions != undefined) {
           const lort: number = totalMinions / (matchDuration / 60)
           return Math.round(lort * 10) / 10
       }
       else{
           console.log("undefined")
       }
    }

    /*Get summoner team total kills*/
    const getTeamKills = (teamId: number | undefined) => {
        for(let i = 0; i < match.info.teams.length; i++){
            if(match.info.teams[i].teamId == teamId){
               return match.info.teams[i].objectives.champion.kills
            }
        }
    }

    /*Calculate summoner kill participation*/
    const calculateKillPerticipation = (teamId: number | undefined, kills: number | undefined, assists: number | undefined) => {
        if(teamId == undefined) return
        const teamKill = getTeamKills(teamId)
        if(assists == undefined) return
        const personalAssists = assists
        if(kills == undefined) return
        const personalKills = kills

        if(teamKill != undefined && personalKills != undefined && personalAssists != undefined){
            const sum = personalKills + personalAssists
            const kp = (sum / teamKill) * 100
            return Math.round(kp)
        }
    }

    /*determine the game mode from match*/
    const determineGameMode = (queueId: number) => {
        const queueMap = new Map([
            [400, "Normal"],
            [420, "Ranked Solo"],
            [440, "Ranked Flex"],
            [450, "ARAM"],
            [830, "Intro"],
            [0, "Custom"]
        ])
        const gameMode = queueMap.get(queueId);

        if (typeof gameMode != "undefined") {
            return gameMode
        } else {
            return "Error in gamemode"
        }
    }

    /*OnClick go to another summoner profile*/
    const goToProfile = (e: any, summonerName: string) => {
        e.preventDefault()
        router.push(`/lol/${summonerName}?region=${router.query.region}`)
    }

    /*OnClick go to the champ profile*/
    const goToChamp = (e: any, champName: string | undefined) => {
        e.preventDefault()
        router.push(`/lol/champions/${champName}`)
    }

    /*get item from itemId*/
    const getItem = (itemId: number | undefined) => {
        if(itemId != undefined){
            const item: IItem | undefined = items?.data[itemId]
            if(item != undefined){
                return item
            }
        }
    }

    return(
        <>
            <div className={"w-[740px] my-0 mx-auto"}>
                <li className={"relative list-none mt-2 bg-summoner-dark"}>
                    <div className={"flex items-center h-24 rounded border-l-4 border-solid " + (match.info.gameDuration / 60 < 4 ? "border-summoner-gray" : matchWon ? "border-win" : "border-loss")}>
                        <div className={"ml-3 w-28 leading-4 text-xs"}>
                            <div className={"font-bold " + (match.info.gameDuration / 60 < 4 ? "text-summoner-gray": matchWon ? "text-win" : "text-loss")}>{determineGameMode(match.info.queueId)}</div>
                            <div>
                                <div className={"relative text-summoner-gray pb-1"}>{timeSince()} ago</div>
                            </div>
                            <div className={"absolute top-13 left-4 h-px w-10 bg-match-text"}></div>
                            <div className={"w-12 h-px pt-0.5"}></div>
                            <div className={"text-summoner-gray font-semibold"}>{match.info.gameDuration / 60 < 4 ? ("Remake") : matchWon ? ("Victory") : ("Defeat")}</div>
                            <div className={"text-summoner-gray"}>{(match.info.gameDuration / 60).toFixed()} minutes</div>
                        </div>
                        <div className={"ml-2"}>
                            <div className={"flex"}>
                                <div className={"flex items-center"}>
                                    <div>
                                        <div onClick={() => goToChamp(event, getSummerParticipant()?.championName)} className={"block w-12 h-12 bg-black rounded-full cursor-pointer"}>
                                            <img className={"rounded-full w-12 h-12 object-contain"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getSummerParticipant()?.championName == "FiddleSticks" ? "Fiddlesticks" : getSummerParticipant()?.championName}.png`} alt={"items image"}/>
                                        </div>
                                    </div>
                                    <div className={"block ml-1"}>
                                        <Tooltip content={getSummonerSpell(getSummerParticipant()?.summoner1Id)?.description} color={"invert"}>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src={getSummonerSpell(getSummerParticipant()?.summoner1Id)?.icon} alt="summonerSpell"/>
                                                </div>
                                            </div>
                                        </Tooltip>
                                        <Tooltip content={getSummonerSpell(getSummerParticipant()?.summoner2Id)?.description} color={"invert"}>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src={getSummonerSpell(getSummerParticipant()?.summoner2Id)?.icon} alt="summonerSpell"/>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    </div>
                                    <div className={"block ml-1"}>
                                        <Tooltip content={getRune(getSummerParticipant()?.perks.styles[0].selections[0].perk)?.shortDesc} color={"invert"}>
                                            <div className={"w-6 h-6 mb-0.5 block bg-black rounded-full"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src={"https://ddragon.canisback.com/img/"+getRune(getSummerParticipant()?.perks.styles[0].selections[0].perk)?.icon} alt=""/>
                                                </div>
                                            </div>
                                        </Tooltip>
                                        <Tooltip content={getRuneStyle(getSummerParticipant()?.perks.styles[1].style)?.name} color={"invert"}>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src={"https://ddragon.canisback.com/img/"+getRuneStyle(getSummerParticipant()?.perks.styles[1].style)?.icon} alt=""/>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className={"flex flex-col justify-center relative w-28 pr-3 mr-2 ml-3"}>
                                    <div className={"text-sm text-summoner-gray font-bold"}>
                                        <span className={"text-white"}>{getSummerParticipant()?.kills}</span>
                                        /
                                        <span className={"text-loss-border"}>{getSummerParticipant()?.deaths}</span>
                                        /
                                        <span className={"text-white"}>{getSummerParticipant()?.assists}</span>
                                    </div>
                                    <div className={"block text-xs text-summoner-gray"}>
                                        <span>
                                            {calculateKDA(getSummerParticipant()?.kills, getSummerParticipant()?.deaths, getSummerParticipant()?.assists)}:1
                                        </span>
                                        KDA
                                    </div>
                                    <div className={"absolute top-0 right-0 w-px h-full bg-match-text"}></div>
                                </div>
                                <div className={"flex flex-col items-start w-36 text-summoner-gray text-xs"}>
                                    <div className={"text-loss-border block"}>
                                        <div className={"relative block"}>
                                            P/Kill
                                            {calculateKillPerticipation(getSummerParticipant()?.teamId, getSummerParticipant()?.kills, getSummerParticipant()?.assists)}
                                            %
                                        </div>
                                    </div>
                                    <div>Control Ward {getSummerParticipant()?.detectorWardsPlaced}</div>
                                    <div className={"block"}>
                                        <div className={"relative"}>
                                            <span>CS </span>
                                            {calculateSummonerCs()}
                                            (
                                            {calculateCsPerMin(calculateSummonerCs())}
                                            )
                                        </div>
                                    </div>
                                    <div className={"font-bold capitalize"}>
                                        <div className={"relative"}>
                                            gold
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"flex"}>
                                    <ul className={"flex list-none"}>
                                        <Tooltip content={getItem(getSummerParticipant()?.item0)?.name + ": " + getItem(getSummerParticipant()?.item0)?.plaintext} color={"invert"}>
                                            <li className={"w-6 h-6 rounded bg-match-text"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item0}.png`} alt=""/>
                                                </div>
                                            </li>
                                        </Tooltip>
                                        <Tooltip content={getItem(getSummerParticipant()?.item1)?.name + ": " + getItem(getSummerParticipant()?.item1)?.plaintext} color={"invert"}>
                                            <li className={"w-6 h-6 ml-0.5 rounded bg-match-text"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item1}.png`} alt=""/>
                                                </div>
                                            </li>
                                        </Tooltip>
                                        <Tooltip content={getItem(getSummerParticipant()?.item2)?.name + ": " + getItem(getSummerParticipant()?.item2)?.plaintext} color={"invert"}>
                                            <li className={"w-6 h-6 ml-0.5 rounded bg-match-text"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item2}.png`} alt=""/>
                                                </div>
                                            </li>
                                        </Tooltip>
                                        <Tooltip content={getItem(getSummerParticipant()?.item3)?.name + ": " + getItem(getSummerParticipant()?.item3)?.plaintext} color={"invert"}>
                                            <li className={"w-6 h-6 ml-0.5 rounded bg-match-text"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item3}.png`} alt=""/>
                                                </div>
                                            </li>
                                        </Tooltip>
                                        <Tooltip content={getItem(getSummerParticipant()?.item4)?.name + ": " + getItem(getSummerParticipant()?.item4)?.plaintext} color={"invert"}>
                                            <li className={"w-6 h-6 ml-0.5 rounded bg-match-text"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item4}.png`} alt=""/>
                                                </div>
                                            </li>
                                        </Tooltip>
                                        <Tooltip content={getItem(getSummerParticipant()?.item5)?.name + ": " + getItem(getSummerParticipant()?.item5)?.plaintext} color={"invert"}>
                                            <li className={"w-6 h-6 ml-0.5 rounded bg-match-text"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item5}.png`} alt=""/>
                                                </div>
                                            </li>
                                        </Tooltip>
                                    </ul>
                                    <Tooltip content={getItem(getSummerParticipant()?.item6)?.name + ": " + getItem(getSummerParticipant()?.item6)?.plaintext} color={"invert"}>
                                        <div className={"w-6 h-6 ml-0.5 mr-1 rounded-full bg-match-text"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded-full"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item6}.png`} alt=""/>
                                            </div>
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <div className={"flex ml-3"}>
                            <ul className={"mr-2 list-none"}>
                                {getFirstHalf().map((player, index) => (
                                <li key={index} className={"flex items-center w-[88px] h-4 text-center whitespace-nowrap list-none mt-px"}>
                                    <Tooltip content={player.championName} color={"invert"}>
                                        <div className={"relative inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 " + (player.puuid == summonerParticipant.puuid ? "rounded-full" : "rounded")} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${player.championName == "FiddleSticks" ? "Fiddlesticks" : player.championName}.png`} alt=""/>
                                        </div>
                                    </Tooltip>
                                    <div className={"inline-block max-w-[60px] align-middle text-summoner-gray"}>
                                        <p onClick={() => goToProfile(event, player.summonerName)} className={"text-xs block text-ellipsis whitespace-nowrap overflow-hidden hover:underline cursor-pointer " + (player.puuid == summonerParticipant.puuid ? "text-white" : "")}>{player.summonerName}</p>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            <ul className={"list-none"}>
                                {getLastHalf().map((player, index) => (
                                <li key={index + 10} className={"flex items-center w-[88px] h-4 text-left whitespace-nowrap mt-px"}>
                                    <Tooltip content={player.championName} color={"invert"}>
                                        <div className={"relative inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 " + (player.puuid == summonerParticipant.puuid ? "rounded-full" : "rounded")} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${player.championName == "FiddleSticks" ? "Fiddlesticks" : player.championName}.png`} alt=""/>
                                        </div>
                                    </Tooltip>
                                    <div className={"inline-block max-w-[60px] align-middle text-summoner-gray"}>
                                        <p onClick={() => goToProfile(event, player.summonerName)} className={"text-xs block text-ellipsis whitespace-nowrap overflow-hidden hover:underline cursor-pointer " + (player.puuid == summonerParticipant.puuid ? "text-white" : "")}>{player.summonerName}</p>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className={"relative w-10 h-24 overflow-hidden"}>
                            <button onClick={() => setExpanded(!expanded)} className={"w-10 h-24 flex justify-center items-end bg-summoner-dark hover:bg-gray-400"}>
                                {!expanded ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className={"h-6 w-6 mb-2 text-match-text"} fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                                    ):(
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" className={"w-6 h-6 mb-2 text-match-text"}>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </li>
            </div>
            {expanded ?
                <div className={"mt-1 block"}>
                    <div className={"block"}>
                        <table className={"rounded-t w-full table-fixed bg-summoner-dark border-collapse border-spacing-0"}>
                            <colgroup>
                                <col width={"44"}/>
                                <col width={"18"}/>
                                <col width={"18"}/>
                                <col/>
                                <col width={"68"}/>
                                <col width={"98"}/>
                                <col width={"120"}/>
                                <col width={"48"}/>
                                <col width={"56"}/>
                                <col width={"175"}/>
                            </colgroup>
                            <thead className={"table-header-group align-middle border-inherit"}>
                                <tr className={"table-row align-middle border-inherit"}>
                                    <th colSpan={4} className={"pl-[15px] text-left text-summoner-gray font-normal border-b-[1px] border-solid " + (matchWon ? "border-win" : "border-loss")}>
                                        <span className={"text-xs " + (matchWon ? "text-win" : "text-loss")}>{matchWon ? ("Won") : ("Loss")}</span>
                                    </th>
                                    <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (matchWon ? "border-win" : "border-loss")}>
                                       SS Score
                                    </th>
                                    <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (matchWon ? "border-win" : "border-loss")}>
                                        KDA
                                    </th>
                                    <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (matchWon ? "border-win" : "border-loss")}>
                                        Damage
                                    </th>
                                    <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (matchWon ? "border-win" : "border-loss")}>
                                        Wards
                                    </th>
                                    <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (matchWon ? "border-win" : "border-loss")}>
                                        CS
                                    </th>
                                    <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (matchWon ? "border-win" : "border-loss")}>
                                        Items
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={"table-row-group align-middle bg-match-border"}>
                                {getSummonerPlayers().map((player) => (
                                    <tr key={player.puuid} className={"table-row align-middle border-inherit"}>
                                        <td className={"pl-2.5 pr-1 pt-1"}>
                                            <Tooltip content={player.championName} color={"invert"}>
                                                <div className={"relative block cursor-pointer"}>
                                                    <div className={"relative w-[32px] block"}>
                                                        <Image className={"block rounded-full"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${player.championName}.png`} width={"35"} height={"35"} alt={"Champion image"}/>
                                                        <div className={"absolute left-[-3px] bottom-[1px] w-[15px] h-[15px] bg-gray-800 rounded-full text-white text-xs text-center leading-[15px]"}>
                                                            {player.champLevel}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        </td>
                                        <td className={"pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                            <div className={"relative mb-0.5 w-4 h-4 block"}>
                                                <img className={"w-4 h-4 rounded"} src={getSummonerSpell(player.summoner1Id)?.icon} alt={"summonerSpell"}/>
                                            </div>
                                            <div className={"relative w-4 h-4 block"}>
                                                <img className={"w-4 h-4 rounded"} src={getSummonerSpell(player.summoner2Id)?.icon} alt={"summonerSpell"}/>
                                            </div>
                                        </td>
                                        <td className={"pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                            <div className={"relative mb-0.5 bg-black rounded-full w-4 h-4"}>
                                                <img className={"w-4 h-4 rounded"} src={"https://ddragon.canisback.com/img/"+getRune(player.perks.styles[0].selections[0].perk)?.icon} alt={"RuneIcon"}/>
                                            </div>
                                            <div className={"relative mb-0.5 bg-black rounded-full w-4 h-4"}>
                                                <img className={"w-4 h-4 rounded"} src={"https://ddragon.canisback.com/img/"+getRuneStyle(player.perks.styles[1].style)?.icon} alt={"RuneStyleIcon"}/>
                                            </div>
                                        </td>
                                        <td className={"pl-[5px] whitespace-nowrap text-ellipsis overflow-hidden pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                            <div className={"leading-4 text-white text-xs decoration-0 cursor-pointer"}>
                                                {player.summonerName}
                                                <div className={"text-gray-400 text-[11px] leading-[14px] block"}>
                                                    <div className={"relative capitalize block"}>
                                                        gold 3
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={"text-xs text-center text-white font-bold"}>
                                            7.7
                                        </td>
                                        <td className={"text-center whitespace-nowrap pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                            <div className={"text-gray-500 leading-[14px] text-xs block"}>
                                                {player.kills}/{player.deaths}/{player.assists}
                                                <div className={"relative inline"}>
                                                    ({calculateKillPerticipation(player.teamId,player.kills,player.assists)}%)
                                                </div>
                                            </div>
                                            <div className={"text-[11px] font-bold text-gray-500 block"}>
                                                {calculateKDA(player.kills,player.deaths,player.assists)}:1
                                            </div>
                                        </td>
                                        <td className={"pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                            <div className={"flex justify-center"}>
                                                <Tooltip content={"Total damage inflicted to champion: " + player.totalDamageDealtToChampions} color={"invert"}>
                                                    <div className={"relative block"}>
                                                        <div className={"text-center text-gray-500 text-[11px] leading-[14px] block"}>
                                                            {player.totalDamageDealtToChampions}
                                                            <div></div>
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                                <Tooltip content={"Total taken damage " + player.totalDamageTaken.toLocaleString()} color={"invert"}>
                                                    <div className={"relative block"}>
                                                        <div className={"text-center text-gray-500 text-[11px] leading-[14px] ml-2 block"}>
                                                            {player.totalDamageTaken.toLocaleString()}
                                                        </div>
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        </td>
                                        <td className={"text-center text-gray-500 text-[11px] pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                            <div className={"relative block"}>
                                                <div className={"block"}>
                                                    {player.visionWardsBoughtInGame}
                                                </div>
                                                <div className={"block"}>
                                                    {player.wardsPlaced} / {player.wardsKilled}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={"text-center text-gray-500 text-[11px] pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                            <div className={"block"}>
                                                {player.totalMinionsKilled + player.neutralMinionsKilled}
                                            </div>
                                            <div className={"block"}>
                                                {calculateCsPerMin(player.totalMinionsKilled + player.neutralMinionsKilled)}/m
                                            </div>
                                        </td>
                                        <td className={"text-center pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                            <div className={"ml-0 inline-block w-[22px] h-[22px] align-middle"}>
                                                {player.item0 != 0 ? (
                                                    <div className={"relative block"}>
                                                        <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item0}.png`} alt=""/>
                                                    </div>
                                                ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                            </div>
                                            <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                                {player.item1 != 0 ? (
                                                    <div className={"relative block"}>
                                                        <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item1}.png`} alt=""/>
                                                    </div>
                                                ) : (<div className={"w-full h-full rounded bg-summonerdark"}></div>)}
                                            </div>
                                            <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                                {player.item2 != 0 ? (
                                                    <div className={"relative block"}>
                                                        <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item2}.png`} alt=""/>
                                                    </div>
                                                ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                            </div>
                                            <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                                {player.item3 != 0 ? (
                                                    <div className={"relative block"}>
                                                        <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item3}.png`} alt=""/>
                                                    </div>
                                                ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                            </div>
                                            <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                                {player.item4 != 0 ? (
                                                    <div className={"relative block"}>
                                                        <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item4}.png`} alt=""/>
                                                    </div>
                                                ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                            </div>
                                            <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                                {player.item5 != 0 ? (
                                                <div className={"relative block"}>
                                                    <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item5}.png`} alt=""/>
                                                </div>
                                                ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                            </div>
                                            <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                                {player.item6 != 0 ? (
                                                    <div className={"relative block"}>
                                                        <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item6}.png`} alt=""/>
                                                    </div>
                                                ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={"flex justify-between align-middle bg-summoner-dark border-t border-b border-summoner-gray"}>
                            <div className={"pr-[0px] pl-[16px] text-left table-cell h-[30px] items-center leading-[50px]"}>
                                    <div className={"ml-0 inline-block text-xs text-summoner-gray"}>
                                        <Tooltip content={"Baron"} color={"invert"}>
                                            <div className={"relative block"}>
                                                <img className={"inline-block mr-[4px] align-middle w-[16px] h-[16px]"} src={`/lol/icon-baron${matchWon ? "" : "-r"}.svg`} alt=""/>
                                                <span className={"inline-block align-middle text-xs text-summoner-gray"}>{getSummonerTeam()?.objectives.baron.kills}</span>
                                            </div>
                                        </Tooltip>
                                    </div>
                                <div className={"inline-block text-xs text-summoner-gray ml-[16px]"}>
                                    <Tooltip content={"Dragon"} color={"invert"}>
                                        <div className={"relative block"}>
                                            <img className={"inline-block mr-[4px] align-middle w-[16px] h-[16px]"} src={`/lol/icon-dragon${matchWon ? "" : "-r"}.svg`} alt=""/>
                                            <span className={"inline-block align-middle"}>{getSummonerTeam()?.objectives.dragon.kills}</span>
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className={"inline-block text-xs text-summoner-gray ml-[16px]"}>
                                    <Tooltip content={"Tower"} color={"invert"}>
                                        <div className={"relative block"}>
                                            <img className={"inline-block mr-[4px] align-middle w-[16px] h-[16px]"} src={`/lol/icon-tower${matchWon ? "" : "-r"}.svg`} alt=""/>
                                            <span className={"inline-block align-middle"}>{getSummonerTeam()?.objectives.tower.kills}</span>
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className={"flex-[0_1_405px] block"}>
                                <div className={"pt-[8px] pb-[8px] flex justify-center text-[10px] text-white"}>
                                    <div className={"relative flex-[0_1_405px] flex items-center mt-0 mb-0 mr-[3px] ml-[3px]"}>
                                        <div className={"ml-[4px] flex-[1_1_0%] absolute top-0 left-[calc(50%-30px)] text-center w-[60px] leading-[16px]"}>
                                            Total Kill
                                        </div>
                                        <div className={"mr-[4px] flex-[1_1_0%] h-[16px] absolute top-0 left-[8px] w-[40px] leading-[16px] text-left block"}>
                                            {getSummonerTeam()?.objectives.champion.kills}
                                        </div>
                                        <div className={"flex-[1_1_0%] h-[16px] absolute top-0 right-[8px] w-[40px] leading-[16px] text-right block"}>
                                            {getEnemyTeam()?.objectives.champion.kills}
                                        </div>
                                        <div style={{flex: `1 1 ${getSummonerProcentTeamKillsEarned()}%`}} className={`h-[16px] block ` + (matchWon ? "bg-win": "bg-loss")}></div>
                                        <div style={{flex: `1 1 ${getEnemyProcentTeamKillsEarned()}%`}} className={`h-[16px] block ` + (matchWon ? "bg-loss": "bg-win")}></div>
                                    </div>
                                </div>
                                <div className={"pb-[8px] flex justify-center text-[10px] text-white"}>
                                    <div className={"relative flex-[0_1_405px] flex items-center mt-0 mb-0 ml-[3px] mr-[3px]"}>
                                        <div className={"ml-[4px] flex-[1_1_0%] h-[16px] absolute top-0 left-[calc(50%-30px)] text-center w-[60px] leading-[16px] block"}>
                                            Total Gold
                                        </div>
                                        <div className={"flex-[1_1_0%] h-[16px] absolute top-0 left-[8px] w-[40px] leading-[16px] text-left"}>
                                            {getTotalGoldSummonerTeam().toLocaleString()}
                                        </div>
                                        <div className={"flex-[1_1_0%] h-[16px] absolute top-0 right-[8px] w-[40px] leading-[16px] text-right block"}>
                                            {getTotalGoldEnemyTeam().toLocaleString()}
                                        </div>
                                        <div style={{flex: `1 1 ${getSummonerTeamProcentGoldEarned()}%`}} className={`h-[16px] block ` + (matchWon ? "bg-win": "bg-loss")}></div>
                                        <div style={{flex: `1 1 ${getEnemyProcentTeamGoldEarned()}%`}} className={`h-[16px] block ` + (matchWon ? "bg-loss": "bg-win")}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={"pr-[16px] table-cell h-[30px] items-center text-right leading-[50px]"}>
                                <div className={"ml-0 inline-block text-xs text-summoner-gray"}>
                                    <Tooltip content={"Baron"} color={"invert"}>
                                        <div className={"relative block"}>
                                            <img className={"inline-block mr-[4px] align-middle w-[16px] h-[16px]"} src={`/lol/icon-baron${matchWon ? "-r" : ""}.svg`} alt=""/>
                                            <span className={"inline-block align-middle"}>{getEnemyTeam()?.objectives.baron.kills}</span>
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className={"inline-block text-xs text-summoner-gray ml-[16px]"}>
                                    <Tooltip content={"Dragon"} color={"invert"}>
                                        <div className={"relative block"}>
                                            <img className={"inline-block mr-[4px] align-middle w-[16px] h-[16px]"} src={`/lol/icon-dragon${matchWon ? "-r" : ""}.svg`} alt=""/>
                                            <span className={"inline-block align-middle"}>{getEnemyTeam()?.objectives.dragon.kills}</span>
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className={"inline-block text-xs text-summoner-gray ml-[16px]"}>
                                    <Tooltip content={"Tower"} color={"invert"}>
                                        <div className={"relative block"}>
                                            <img className={"inline-block mr-[4px] align-middle w-[16px] h-[16px]"} src={`/lol/icon-tower${matchWon ? "-r" : ""}.svg`} alt=""/>
                                            <span className={"inline-block align-middle"}>{getEnemyTeam()?.objectives.tower.kills}</span>
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                        <table className={"w-full table-fixed bg-summoner-dark border-collapse border-spacing-0"}>
                            <colgroup>
                                <col width={"44"}/>
                                <col width={"18"}/>
                                <col width={"18"}/>
                                <col/>
                                <col width={"68"}/>
                                <col width={"98"}/>
                                <col width={"120"}/>
                                <col width={"48"}/>
                                <col width={"56"}/>
                                <col width={"175"}/>
                            </colgroup>
                            <thead className={"table-header-group align-middle border-inherit"}>
                            <tr className={"table-row align-middle border-inherit"}>
                                <th colSpan={4} className={"pl-[15px] text-left text-summoner-gray font-normal border-b-[1px] border-solid " + (!matchWon ? "border-win" : "border-loss")}>
                                    <span className={"text-xs " + (!matchWon ? "text-win" : "text-loss")}>{!matchWon ? ("Won") : ("Loss")}</span>
                                </th>
                                <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (!matchWon ? "border-win" : "border-loss")}>
                                    SS Score
                                </th>
                                <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (!matchWon ? "border-win" : "border-loss")}>
                                    KDA
                                </th>
                                <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (!matchWon ? "border-win" : "border-loss")}>
                                    Damage
                                </th>
                                <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (!matchWon ? "border-win" : "border-loss")}>
                                    Wards
                                </th>
                                <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (!matchWon ? "border-win" : "border-loss")}>
                                    CS
                                </th>
                                <th className={"h-8 text-summoner-gray text-xs font-normal text-center border-b-[1px] border-solid " + (!matchWon ? "border-win" : "border-loss")}>
                                    Items
                                </th>
                            </tr>
                            </thead>
                            <tbody className={"table-row-group align-middle bg-match-border"}>
                            {getEnemyPlayers().map((player) => (
                                <tr key={player.puuid} className={"table-row align-middle border-inherit"}>
                                    <td className={"pl-2.5 pr-1 pt-1"}>
                                        <Tooltip content={player.championName} color={"invert"}>
                                            <div className={"relative block cursor-pointer"}>
                                                <div className={"relative w-[32px] block"}>
                                                    <Image className={"block rounded-full"} src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.championName}.png`} width={"35"} height={"35"} alt={"Champion image"}/>
                                                    <div className={"absolute left-[-3px] bottom-[1px] w-[15px] h-[15px] bg-gray-800 rounded-full text-white text-xs text-center leading-[15px]"}>
                                                        {player.champLevel}
                                                    </div>
                                                </div>
                                            </div>
                                        </Tooltip>
                                    </td>
                                    <td className={"pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                        <div className={"relative mb-0.5 w-4 h-4 block"}>
                                            <img className={"w-4 h-4 rounded"} src={getSummonerSpell(player.summoner1Id)?.icon} alt={"summonerSpell"}/>
                                        </div>
                                        <div className={"relative w-4 h-4 block"}>
                                            <img className={"w-4 h-4 rounded"} src={getSummonerSpell(player.summoner2Id)?.icon} alt={"summonerSpell"}/>
                                        </div>
                                    </td>
                                    <td className={"pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                        <div className={"relative mb-0.5 bg-black rounded-full w-4 h-4"}>
                                            <img className={"w-4 h-4 rounded"} src={"https://ddragon.canisback.com/img/"+getRune(player.perks.styles[0].selections[0].perk)?.icon} alt={"RuneIcon"}/>
                                        </div>
                                        <div className={"relative mb-0.5 bg-black rounded-full w-4 h-4"}>
                                            <img className={"w-4 h-4 rounded"} src={"https://ddragon.canisback.com/img/"+getRuneStyle(player.perks.styles[1].style)?.icon} alt={"RuneStyleIcon"}/>
                                        </div>
                                    </td>
                                    <td className={"pl-[5px] whitespace-nowrap text-ellipsis overflow-hidden pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                        <div className={"leading-4 text-white text-xs decoration-0 cursor-pointer"}>
                                            {player.summonerName}
                                            <div className={"text-gray-400 text-[11px] leading-[14px] block"}>
                                                <div className={"relative capitalize block"}>
                                                    gold 3
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={"text-xs text-center text-white font-bold"}>
                                        7.7
                                    </td>
                                    <td className={"text-center whitespace-nowrap pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                        <div className={"text-gray-500 leading-[14px] text-xs block"}>
                                            {player.kills}/{player.deaths}/{player.assists}
                                            <div className={"relative inline"}>
                                                ({calculateKillPerticipation(player.teamId,player.kills,player.assists)}%)
                                            </div>
                                        </div>
                                        <div className={"text-[11px] font-bold text-gray-500 block"}>
                                            {calculateKDA(player.kills,player.deaths,player.assists)}:1
                                        </div>
                                    </td>
                                    <td className={"pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                        <div className={"flex justify-center"}>
                                            <Tooltip content={"Total damage inflicted to champion: " + player.totalDamageDealtToChampions} color={"invert"}>
                                                <div className={"relative block"}>
                                                    <div className={"text-center text-gray-500 text-[11px] leading-[14px] block"}>
                                                        {player.totalDamageDealtToChampions}
                                                        <div></div>
                                                    </div>
                                                </div>
                                            </Tooltip>
                                            <Tooltip content={"Total taken damage: " + player.totalDamageTaken.toLocaleString()} color={"invert"}>
                                                <div className={"relative block"}>
                                                    <div className={"text-center text-gray-500 text-[11px] leading-[14px] ml-2 block"}>
                                                        {player.totalDamageTaken.toLocaleString()}
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </td>
                                    <td className={"text-center text-gray-500 text-[11px] pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                        <div className={"relative block"}>
                                            <div className={"block"}>
                                                {player.visionWardsBoughtInGame}
                                            </div>
                                            <div className={"block"}>
                                                {player.wardsPlaced} / {player.wardsKilled}
                                            </div>
                                        </div>
                                    </td>
                                    <td className={"text-center text-gray-500 text-[11px] pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                        <div className={"block"}>
                                            {player.totalMinionsKilled + player.neutralMinionsKilled}
                                        </div>
                                        <div className={"block"}>
                                            {calculateCsPerMin(player.totalMinionsKilled + player.neutralMinionsKilled)}/m
                                        </div>
                                    </td>
                                    <td className={"text-center pt-2.5 pr-0 pl-0 pb-[3px] align-middle"}>
                                        <div className={"ml-0 inline-block w-[22px] h-[22px] align-middle"}>
                                            {player.item0 != 0 ? (
                                                <div className={"relative block"}>
                                                    <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item0}.png`} alt=""/>
                                                </div>
                                            ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                        </div>
                                        <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                            {player.item1 != 0 ? (
                                                <div className={"relative block"}>
                                                    <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item1}.png`} alt=""/>
                                                </div>
                                            ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                        </div>
                                        <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                            {player.item2 != 0 ? (
                                                <div className={"relative block"}>
                                                    <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item2}.png`} alt=""/>
                                                </div>
                                            ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                        </div>
                                        <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                            {player.item3 != 0 ? (
                                                <div className={"relative block"}>
                                                    <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item3}.png`} alt=""/>
                                                </div>
                                            ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                        </div>
                                        <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                            {player.item4 != 0 ? (
                                                <div className={"relative block"}>
                                                    <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item4}.png`} alt=""/>
                                                </div>
                                            ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                        </div>
                                        <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                            {player.item5 != 0 ? (
                                                <div className={"relative block"}>
                                                    <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item5}.png`} alt=""/>
                                                </div>
                                            ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                        </div>
                                        <div className={"inline-block w-[22px] h-[22px] ml-px align-middle"}>
                                            {player.item6 != 0 ? (
                                                <div className={"relative block"}>
                                                    <img className={"rounded-sm align-middle"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${player.item6}.png`} alt=""/>
                                                </div>
                                            ) : (<div className={"w-full h-full rounded bg-summoner-dark"}></div>)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            : ("")}
        </>
    )
}

export default Match