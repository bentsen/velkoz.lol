import {useEffect, useState} from "react";
import {ddragon} from "reksai";
import {IChampion} from "reksai/src/@types/champion";
import {useRouter} from "next/router";
import axios from "axios";
import useSWR from "swr";
import {Agents, Agent} from "../../../utils/types/agents.t";

const Agent = () => {
    const [agent, setAgent] = useState<Agent>()
    const router = useRouter()
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    const { data: agents} = useSWR<Agents>("/api/valorant/agents", fetcher)

    useEffect(() => {
        async function getAgent(){
            if(agents == undefined) return
            for(let i = 0; i < agents?.data.length; i++){
                if(agents.data[i].displayName == router.query.agentName){
                    setAgent(agents.data[i])
                }
            }
        }
        getAgent()
    })

    const getAbilityKey = (slot: string) => {
        const spell = new Map([
            ["Ability1", {
                spellKey:"C",
                color:"text-win-border"
            }],
            ["Ability2", {
                spellKey: "Q",
                color: "text-teal-400"
            }],
            ["Grenade", {
                spellKey: "E",
                color: "text-orange-400"
            }],
            ["Ultimate", {
                spellKey: "X",
                color: "text-white"
            }]
        ])

        return spell.get(String(slot))
    }

    return(
        <>
            <div>
                <div className={"bg-summoner-dark h-64 overflow-hidden"}>
                    <div className={"flex mt-10 ml-40 items-center"}>
                        <div className={"block"}>
                            <div className={"mt-[16px] mr-0 mb-[20px] ml-0 flex"}>
                                <div className={"relative flex w-[90px] h-[90px] mr-[24px]"}>
                                    <div className={"absolute bottom-[-6px] right-[-2px] w-[22px] h-[24px] block"}>

                                    </div>
                                    <img className={"w-full h-full rounded-2xl overflow-hidden border-0 items-center"} src={agent?.displayIcon} alt=""/>
                                </div>
                                <div className={"flex flex-col justify-end"}>
                                    <h1 className={"font-normal leading-[0] text-[0] m-0 p-0 block"}>
                                        <span className={"inline-block text-[24px] font-bold text-gray-300 leading-[32px]"}>
                                            {agent?.displayName}
                                        </span>
                                        <span className={"text-[24px] ml-[6px] text-summoner-gray tracking-tighter capitalize"}>

                                        </span>
                                    </h1>
                                    <div className={"leading-[18px] text-xs text-summoner-gray font-[400] block"}>
                                        <span>4 Tier</span>
                                    </div>
                                    <div className={"flex mt-[8px]"}>
                                        {agent?.abilities.map((ability,index) => (
                                            <div key={index} className={"cursor-pointer rounded w-[24px] h-[24px] overflow-hidden block " + (index > 0 ? "ml-[4px]" : "")}>
                                                {ability.slot == "Passive" ? (
                                                    <div className={"ml-0 cursor-pointer rounded w-[24px] h-[24px] overflow-hidden block"}>
                                                        <div className={"relative block"}>
                                                            <img src={ability.displayIcon}/>
                                                        </div>
                                                    </div>
                                                ) : (
                                                <div className={"relative block"}>
                                                    <div className={"absolute right-0 bottom-0 w-[14px] h-[14px] block"}>
                                                        <div className={`flex items-center justify-center w-[14px] h-[16px] rounded-tl bg-win text-[11px] font-bold leading-[1] ${getAbilityKey(ability.slot)?.color}`}>
                                                            {getAbilityKey(ability.slot)?.spellKey}
                                                        </div>
                                                    </div>
                                                    <img className={"block border-0 align-middle w-[24px] h-[24px]"} src={ability.displayIcon} alt=""/>
                                                </div>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <hr className={"border-1 border-black mt-16"}/>
                    <div className={"flex flex-row gap-4 ml-5"}>
                        <div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Agent