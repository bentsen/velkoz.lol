import items from "../data/tft/set7.5/items.json"
import champions from "../data/tft/set7.5/champions.json"
import traits from "../data/tft/set7/traits.json"
import {TFTChampion} from "../utils/@types/tft/champion.t";
import {ISummoner} from "reksai/src/@types/summoner";
import {TFTMatch, Participant} from "../utils/@types/tft/matches.t";
import {Tooltip} from "@nextui-org/react";
import axios from "axios";
import {useEffect, useState} from "react";
import useSWR from "swr";

const Tftmatch = ({match, summoner, region} : {match: TFTMatch, summoner: ISummoner, region: string}) => {
    const [participants, setParticipants] = useState<ISummoner[]>([])
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    const { data: version } = useSWR("/api/lol/versions", fetcher)

    /*
    useEffect(() => {
        async function getParticipants() {
            if(match == undefined) return
            let participant: ISummoner[] = []
            for (let i = 0; i < match.info.participants.length; i++) {
                const response = await axios.get<ISummoner>("/api/tft/summoner/by-puuid/" + match.info.participants[i].puuid + "?region=" + region)
                participant.push(response.data)
            }
            setParticipants(participant)
        }
        getParticipants()
    })
    */

    const getParticipantByPuuid = (puuid: string) => {
        for(let i = 0; i < participants.length; i++){
            if(participants[i].puuid == puuid){
                return participants[i]
            }
        }
    }


    /*Get summoner from match*/
    const getSummerParticipant = () => {
        let participant: Participant

        for (let i=0;i < match.info.participants.length; i++){
            if(match.info.participants[i]?.puuid != undefined) {
                if (match.info.participants[i]?.puuid == summoner?.puuid) {
                    return participant = match.info.participants[i]
                }
            }
            else {
                console.log("undefined")
                return null
            }
        }
    }

    const getBorderColor = (championId: string) => {
        const champ: TFTChampion | undefined = champions.find(champ => champ.id == championId)
        if(champ == undefined) return

        const tierMap = new Map([
            [1, "border-tft-gray"],
            [2, "border-tft-green"],
            [3, "border-tft-blue"],
            [4, "border-tft-pink"],
            [5, "border-tft-yellow"],
        ])

        return tierMap.get(champ.cost)
    }

    /*Get time since match was played*/
    const timeSince = () => {
        const timeStamp = Number(match.info.game_datetime)
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

    const getOrdinalNumber = (placement: number | undefined) => {
        if(placement == undefined) return
        if(placement == 1){
            return "1st"
        }
        else if(placement == 2){
            return "2nd"
        }
        else{
            return placement+"th"
        }
    }

    const getStars = (tier: number) => {
        if(tier == 3) return "★★★"
        else if(tier == 2) return "★★"
        else return ""
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

    const getItemById = (itemId: number) => {
        for(let i = 0; i < items.length; i++){
            if(items[i].id == itemId){
                return items[i]
            }
        }
    }

    return(
        <>
            <div className={"w-[900px] my-0 mx-auto"}>
                <li className={"relative list-none mt-2 bg-gradient-to-r from-summoner-light via-zinc-900 to-summoner-light"}>
                    <div className={"flex items-center h-24  border-l-4 border-solid " + (getSummerParticipant()?.placement == 1 ? "border-tft-yellow" : getSummerParticipant()?.placement == 2 ? "border-gray-300": getSummerParticipant()?.placement == 3 ? "border-amber-700": "border-gray-500")}>
                        <div className={"ml-3 w-20 leading-4 text-xs"}>
                            <div className={"font-bold text-summoner-gray " + (getSummerParticipant()?.placement == 1 ? "text-tft-yellow" : getSummerParticipant()?.placement == 2 ? "text-gray-300": getSummerParticipant()?.placement == 3 ? "text-amber-700": "text-gray-500")}>Ranked</div>
                            <div>
                                <div className={"relative text-summoner-gray pb-1"}>{timeSince()}</div>
                            </div>
                            <div className={"absolute top-13 left-4 h-px w-10 bg-match-text"}></div>
                            <div className={"w-12 h-px pt-0.5"}></div>
                            <div className={"text-summoner-gray font-semibold"}>{getOrdinalNumber(getSummerParticipant()?.placement)}</div>
                            <div className={"text-summoner-gray"}>{(match.info.game_length / 60).toFixed()} minutes</div>
                        </div>
                        <div className={"flex w-96"}>
                            <ul className={"flex list-none"}>
                                {getSummerParticipant()?.units.map((unit) => (
                                    <Tooltip key={unit.character_id} content={unit.character_id.split("_")[1]} color={"invert"}>
                                        <li key={unit.character_id} className={`w-10 h-10 rounded ml-2 border-2 ${getBorderColor(unit.character_id)}`}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src={`/tft/set7.5/champions/${unit.character_id}.png`} alt={unit.character_id}/>
                                                <span className={"absolute left-[0.02rem] text-[.8rem] bottom-[-0.2rem] text-center w-full " + (unit.tier == 2 ? "text-gray-300" : "text-tft-yellow")}>{getStars(unit.tier)}</span>
                                            </div>
                                            <div className={"flex flex-row gap-0.5 h-5 items-center justify-start"}>
                                                {unit.items.map((item, index) => (
                                                    <img key={index} className={"rounded w-2.5 h-2.5 text-xs"} src={`/tft/set7.5/items/${getItemById(item)?.name}.png`} alt={getItemById(item)?.name}/>
                                                ))}
                                            </div>
                                        </li>
                                    </Tooltip>
                                ))}
                            </ul>
                        </div>
                        <div className={"flex ml-16"}>
                            <ul className={"mr-2 list-none"}>
                                {getFirstHalf().map((participant) => (
                                    <li key={participant.puuid} className={"flex items-center w-[88px] h-4 text-center whitespace-nowrap list-none mt-px"}>
                                        <div className={"relative inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 " + (participant.puuid == getSummerParticipant()?.puuid ? "rounded-full" : "rounded")} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${getParticipantByPuuid(participant.puuid)?.profileIconId}.png`} alt=""/>
                                        </div>
                                        <div className={"inline-block max-w-[60px] align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-ellipsis whitespace-nowrap overflow-hidden hover:underline cursor-pointer " + (participant.puuid == getSummerParticipant()?.puuid ? "text-white" : "")}>{getParticipantByPuuid(participant.puuid)?.name}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <ul className={"list-none"}>
                                {getLastHalf().map((participant) => (
                                    <li key={participant.puuid} className={"flex items-center w-[88px] h-4 text-center whitespace-nowrap list-none mt-px"}>
                                        <div className={"relative inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 " + (participant.puuid == getSummerParticipant()?.puuid ? "rounded-full" : "rounded")} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${getParticipantByPuuid(participant.puuid)?.profileIconId}.png`} alt=""/>
                                        </div>
                                        <div className={"inline-block max-w-[60px] align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-ellipsis whitespace-nowrap overflow-hidden hover:underline cursor-pointer " + (participant.puuid == getSummerParticipant()?.puuid ? "text-white" : "")}>{getParticipantByPuuid(participant.puuid)?.name}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </li>
            </div>
        </>
    )
}

export default Tftmatch