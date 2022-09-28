import items from "../data/tft/set7/items.json"
import champions from "../data/tft/set7.5/champions.json"
import traits from "../data/tft/set7/traits.json"
import {TFTChampion} from "../utils/types/tft/champion.t";
import {ISummoner} from "reksai/src/@types/summoner";
import {TFTMatch, Participant} from "../utils/types/tft/matches.t";
import {Tooltip} from "@nextui-org/react";

const Tftmatch = ({match, summoner} : {match: TFTMatch, summoner: ISummoner}) => {


    /*Get summoners from match*/
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

    const getChampion = (championId: string) => {
        for(let i = 0; i < champions.length; i++){
            if(champions[i].id == championId)
            {
                const champion: TFTChampion = champions[i]
                return champion
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

    return(
        <>
            <div className={"w-[740px] my-0 mx-auto"}>
                <li className={"relative list-none mt-2 bg-summoner-dark"}>
                    <div className={"flex items-center h-24 rounded border-l-4 border-solid border-summoner-gray"}>
                        <div className={"ml-3 w-28 leading-4 text-xs"}>
                            <div className={"font-bold text-summoner-gray"}>Ranked</div>
                            <div>
                                <div className={"relative text-summoner-gray pb-1"}>1 day ago</div>
                            </div>
                            <div className={"absolute top-13 left-4 h-px w-10 bg-match-text"}></div>
                            <div className={"w-12 h-px pt-0.5"}></div>
                            <div className={"text-summoner-gray font-semibold"}>5th</div>
                            <div className={"text-summoner-gray"}>38:13</div>
                        </div>
                        <div className={"flex"}>
                            <ul className={"flex list-none"}>
                                {getSummerParticipant()?.units.map((unit) => (
                                    <Tooltip key={unit.character_id} content={unit.character_id.split("_")[1]} color={"invert"}>
                                        <li key={unit.character_id} className={`w-12 h-10 rounded ml-2 border-2 ${getBorderColor(unit.character_id)}`}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src={`/tft/set7.5/champions/${unit.character_id}.jpg`} alt={unit.character_id}/>
                                            </div>
                                        </li>
                                    </Tooltip>
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