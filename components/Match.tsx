import Link from "next/link";
import {useEffect, useState} from "react";
import {IMatch, Participant} from "reksai/src/@types/match";
import {ISummoner} from "reksai/src/@types/summoner";
import axios from "axios";
import {Runes} from "../utils/types/runes.t";
import {Spell} from "../utils/types/spell.t"
import {ddragon} from "reksai";

/*
* Name: Mikkel Bentsen
* Date: 14/9-2022
*/

const Match = ({match, summoner} : {match: IMatch, summoner: ISummoner}) => {
    /*useStake for match state*/
    const [matchWon, setMatchWon] = useState<boolean>()
    /*useStake for summoner*/
    const [summonerParticipant, setSummonerParticipant] = useState<ISummoner>(summoner)
    /*useState for Runes array*/
    const [runes, setRunes] = useState<Runes[]>([])
    /*useState for Spell array*/
    const [spells, setSpells] = useState<Spell[]>([])

    /*useEffect to fetch all spells*/
    useEffect(() => {
        async function getSpells(){
            const response = await axios.get<Spell[]>("/api/spells/")
            const data:Spell[] = await response.data
            setSpells(data)
        }
        getSpells()
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
            const response = await axios.get<Runes[]>("/api/runes/")
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
                    return spells[i].icon
                }
            }
        }
    }

    /*Get runeIcon by id*/
    const getRuneIcon = (id: number | undefined) => {
        if(id != undefined) {
            for(let i = 0; i < runes.length; i++) {
                for(let j = 0; j < runes[i].slots.length; j++){
                    for(let l = 0; l < runes[i].slots[j].runes.length; l++) {
                        if(runes[i].slots[j].runes[l].id == id){
                            return runes[i].slots[j].runes[l].icon
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
                    return runes[i].icon
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
    const calculateTotalCs = () => {
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
    const calculateCsPerMin = () => {
        const matchDuration = match.info.gameDuration
        const totalMinions = calculateTotalCs()
       if(matchDuration != undefined && totalMinions != undefined) {
           const lort: number = totalMinions / (matchDuration / 60)
           const lort2: number = Math.round(lort * 10) / 10
           return lort2
       }
       else{
           console.log("undefined")
       }
    }

    /*Get summoners team total kills*/
    const getTeamKills = () => {
        for(let i = 0; i < match.info.teams.length; i++){
            if(match.info.teams[i].teamId == getSummerParticipant()?.teamId){
               return match.info.teams[i].objectives.champion.kills
            }
        }
    }

    /*Calculate summoner kill participation*/
    const calculateKillPerticipation = () => {
        const teamKill = getTeamKills()
        const personalAssists = getSummerParticipant()?.assists
        const personalKills = getSummerParticipant()?.kills

        if(teamKill != undefined && personalKills != undefined && personalAssists != undefined){
            const sum = personalKills + personalAssists
            const kp = (sum / teamKill) * 100
            return Math.round(kp)
        }
    }

    return(
        <>
            {!matchWon ? (
            <div className={"w-full my-0 mx-auto"}>
                <li className={"relative list-none mt-2 bg-loss"}>
                    <div className={"flex items-center h-24 rounded border-l-4 border-solid border-loss-border"}>
                        <div className={"ml-3 w-28 leading-4 text-xs"}>
                            <div className={"text-loss-border"}>Ranked Solo</div>
                            <div>
                                <div className={"relative text-summoner-gray"}>{timeSince()}</div>
                            </div>
                            <div className={"w-12 h-px"}></div>
                            <div className={"text-summoner-gray"}>Loss</div>
                            <div className={"text-summoner-gray"}>{match.info.teams[0].objectives.champion.kills} {match.info.teams[1].objectives.champion.kills}</div>
                        </div>
                        <div className={"ml-2"}>
                            <div className={"flex"}>
                                <div className={"flex items-center"}>
                                    <div>
                                        <Link className={"relative block w-12 h-12"} href={"habib"}>
                                            <img className={"rounded-full block w-12 h-12"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${getSummerParticipant()?.championName}.png`} alt={"champion image"}/>
                                        </Link>
                                    </div>
                                    <div className={"block ml-1"}>
                                        <div className={"w-6 h-6 mb-0.5 block"}>
                                            <div className={"relative block"}>
                                                <img className={"block rounded border-0"} src={getSummonerSpell(getSummerParticipant()?.summoner1Id)} alt="summonerSpell"/>
                                            </div>
                                        </div>
                                        <div className={"w-6 h-6 mb-0.5 block"}>
                                            <div className={"relative block"}>
                                                <img className={"block rounded border-0"} src={getSummonerSpell(getSummerParticipant()?.summoner2Id)} alt="summonerSpell"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"block ml-1"}>
                                        <div className={"w-6 h-6 mb-0.5 block bg-black rounded-full"}>
                                            <div className={"relative block"}>
                                                <img className={"block rounded border-0"} src={"https://ddragon.canisback.com/img/"+getRuneIcon(getSummerParticipant()?.perks.styles[0].selections[0].perk)} alt=""/>
                                            </div>
                                        </div>
                                        <div className={"w-6 h-6 mb-0.5 block"}>
                                            <div className={"relative block"}>
                                                <img className={"block rounded border-0"} src={"https://ddragon.canisback.com/img/"+getRuneStyle(getSummerParticipant()?.perks.styles[0].style)} alt=""/>
                                            </div>
                                        </div>
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
                                    <div className={"absolute top-0 right-0 w-px h-full bg-loss-button"}></div>
                                </div>
                                <div className={"flex flex-col items-start w-36 text-summoner-gray text-xs"}>
                                    <div className={"text-loss-border block"}>
                                        <div className={"relative block"}>
                                            P/Kill
                                            {calculateKillPerticipation()}
                                            %
                                        </div>
                                    </div>
                                    <div>Control Ward {getSummerParticipant()?.detectorWardsPlaced}</div>
                                    <div className={"block"}>
                                        <div className={"relative"}>
                                            <span>CS </span>
                                            {calculateTotalCs()}
                                            (
                                            {calculateCsPerMin()}
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
                                        <li className={"w-6 h-6 bg-loss-button rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item0}.png`} alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item1}.png`} alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item2}.png`} alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item3}.png`} alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item4}.png`} alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item5}.png`} alt=""/>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={"w-6 h-6 ml-0.5 mr-1 bg-loss-button rounded-full"}>
                                        <div className={"relative block"}>
                                            <img className={"rounded-full"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item6}.png`} alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"flex ml-3"}>
                            <ul className={"mr-2 list-none"}>
                                {getFirstHalf().map((player, index) => (
                                <li key={index} className={"flex items-center w-[88px] h-4 text-center whitespace-nowrap list-none mt-px"}>
                                    <div className={"relative inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${player.championName}.png`} alt=""/>
                                    </div>
                                    <div className={"inline-block max-w-[60px] align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-ellipsis whitespace-nowrap overflow-hidden " + (player.puuid == summonerParticipant.puuid ? "text-white" : "")}>{player.summonerName}</p>
                                    </div>
                                </li>
                                ))}
                            </ul>
                            <ul className={"list-none"}>
                                {getLastHalf().map((player, index) => (
                                <li key={index + 10} className={"flex items-center w-[88px] h-4 text-left whitespace-nowrap mt-px"}>
                                    <div className={"relative inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${player.championName}.png`} alt=""/>
                                    </div>
                                    <div className={"inline-block max-w-[60px] align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-ellipsis whitespace-nowrap overflow-hidden " + (player.puuid == summonerParticipant.puuid ? "text-white" : "")}>{player.summonerName}</p>
                                    </div>
                                </li>
                                ))}
                            </ul>
                        </div>
                        <div className={"relative w-10 h-24 rounded-tr rounded-br overflow-hidden"}>
                            <button className={"w-10 h-24 bg-loss-button flex justify-center items-end hover:bg-loss"}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-loss-border mb-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
            </div>
            ) : (
                <div className={"w-full h-auto"}>
                    <li className={"relative list-none mt-2 bg-win"}>
                        <div className={"flex items-center h-24 rounded border-l-4 border-solid border-win-border"}>
                            <div className={"ml-3 w-28 leading-4 text-xs"}>
                                <div className={"text-win-border"}>Ranked Solo</div>
                                <div>
                                    <div className={"relative text-summoner-gray"}>{timeSince()}</div>
                                </div>
                                <div className={"w-12 h-px"}></div>
                                <div className={"text-summoner-gray"}>Won</div>
                                <div className={"text-summoner-gray"}>{match.info.teams[0].objectives.champion.kills} {match.info.teams[1].objectives.champion.kills}</div>
                            </div>
                            <div className={"ml-2"}>
                                <div className={"flex"}>
                                    <div className={"flex items-center"}>
                                        <div>
                                            <Link className={"relative block w-12 h-12"} href={"habib"}>
                                                <img className={"rounded-full block w-13 h-12 object-cover"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${getSummerParticipant()?.championName}.png`}/>
                                            </Link>
                                        </div>
                                        <div className={"block ml-1"}>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src={getSummonerSpell(getSummerParticipant()?.summoner1Id)} alt="summonerSpell"/>
                                                </div>
                                            </div>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src={getSummonerSpell(getSummerParticipant()?.summoner2Id)} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"block ml-1"}>
                                            <div className={"w-6 h-6 mb-0.5 block bg-black rounded-full"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src={"https://ddragon.canisback.com/img/"+ getRuneIcon(getSummerParticipant()?.perks.styles[0].selections[0].perk)} alt=""/>
                                                </div>
                                            </div>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src={"https://ddragon.canisback.com/img/"+getRuneStyle(getSummerParticipant()?.perks.styles[0].style)} alt=""/>
                                                </div>
                                            </div>
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
                                        <div className={"absolute top-0 right-0 w-px h-full bg-win-button"}></div>
                                    </div>
                                    <div className={"flex flex-col items-start w-36 text-summoner-gray text-xs"}>
                                        <div className={"text-win-border block"}>
                                            <div className={"relative block"}>
                                                P/Kill
                                                {calculateKillPerticipation()}
                                                %
                                            </div>
                                        </div>
                                        <div>Control Ward {getSummerParticipant()?.detectorWardsPlaced}</div>
                                        <div className={"block"}>
                                            <div className={"relative"}>
                                                <span>CS </span>
                                                {calculateTotalCs()}
                                                (
                                                {calculateCsPerMin()}
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
                                            <li className={"w-6 h-6 bg-win-button rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item0}.png`} alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item1}.png`} alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item2}.png`} alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item3}.png`} alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item4}.png`} alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item5}.png`} alt=""/>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className={"w-6 h-6 ml-0.5 mr-1 bg-win-button rounded-full"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded-full"} src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/${getSummerParticipant()?.item6}.png`} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex ml-3"}>
                                <ul className={"mr-2 list-none"}>
                                    {getFirstHalf().map((player, index) => (
                                        <li key={index} className={"flex items-center w-[88px] h-4 text-center whitespace-nowrap list-none mt-px"}>
                                            <div className={"relative inline-block align-middle mr-1"}>
                                                <img className={"block w-4 h-4 rounded"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${player.championName}.png`} alt=""/>
                                            </div>
                                            <div className={"inline-block max-w-[60px] align-middle text-summoner-gray"}>
                                                <p className={"text-xs block text-ellipsis whitespace-nowrap overflow-hidden " + (player.puuid == summonerParticipant.puuid ? "text-white" : "")}>{player.summonerName}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <ul className={"list-none"}>
                                    {getLastHalf().map((player, index) => (
                                        <li key={index + 10} className={"flex items-center w-[88px] h-4 text-left whitespace-nowrap mt-px"}>
                                            <div className={"relative inline-block align-middle mr-1"}>
                                                <img className={"block w-4 h-4 rounded"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${player.championName}.png`} alt=""/>
                                            </div>
                                            <div className={"inline-block max-w-[60px] align-middle text-summoner-gray"}>
                                                <p className={"text-xs block text-ellipsis whitespace-nowrap overflow-hidden " + (player.puuid == summonerParticipant.puuid ? "text-white" : "")}>{player.summonerName}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={"relative w-10 h-24 rounded-tr rounded-br overflow-hidden"}>
                                <button className={"w-10 h-24 bg-win-button flex justify-center items-end hover:bg-win"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-win-border mb-2" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </li>
                </div>
            )}
        </>
    )
}

export default Match