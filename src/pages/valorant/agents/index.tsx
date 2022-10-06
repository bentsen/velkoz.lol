import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
import {Agents} from "../../../utils/@types/agents.t";
import {useState} from "react";
import {useRouter} from "next/router";
import {Tooltip} from "@nextui-org/react";

const Agents = () => {
    const router = useRouter()
    const [role, setRole] = useState("all")
    const [inputValue, setInputValue] = useState<string>("")
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    const { data: agents} = useSWR<Agents>("/api/valorant/agents", fetcher)

    const handleChange = (e:any) => {
        e.preventDefault()
        setInputValue(e.target.value)
    }

    const filterAgents = () => {
        if(agents == undefined) return
        if(inputValue) {
            const filteredAgents = agents.data?.filter((agent) => agent.displayName.toLowerCase().includes(inputValue.toLowerCase()))
            if(role != "all"){
                return filteredAgents.filter((agent) => agent.role.displayName.includes(role))
            }
            return filteredAgents
        } else{
            if(role != "all"){
                return agents.data.filter((agent) => {
                    if(agent.role != null){
                       return agent.role.displayName.includes(role)
                    }
                })
            }
            return  agents.data
        }
    }

    const goToAgent = (e: any, agentName: string) => {
        e.preventDefault()
        router.push(`/valorant/agents/${agentName}`)
    }

    return(
        <>
            <div className={"flex flex-col divide-black divide-y"}>
                <div className={"bg-summoner-light w-full h-16 flex items-center"}>
                    <h1 className={"text-white text-2xl font-bold ml-40"}>Agents</h1>
                </div>
                <div className={"bg-summoner-light w-full h-12"}>

                </div>
            </div>
            <div className={"container mx-auto px-20 mt-10"}>
                <div className={"flex justify-between text-xs text-summoner-gray"}>
                    <div>
                        There are currently {agents?.data.length} Agents available in Valorant
                    </div>
                    <div>
                        Displaying Agents active in the game. Agents are updated periodically.
                    </div>
                </div>
                <div className={"w-full h-auto mt-4"}>
                    <div className={"w-full h-12 rounded-t bg-summoner-dark flex justify-between items-center"}>
                        <div className={"flex flex-row items-center divide-summoner-gray divide-x border border-summoner-gray rounded w-auto h-10 ml-2"}>
                            <div onClick={() => setRole("all")} className={"px-2 h-10 rounded-l flex items-center cursor-pointer " + (role === "all" ?  "bg-valorant-color":"")}>
                                <span className={"text-white font-bold"}>All</span>
                            </div>
                            <Tooltip content={"Initiator"} color={"invert"}>
                                <div onClick={() => setRole("Initiator")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "Initiator" ? "bg-valorant-color":"")}>
                                    <Image src={`/valorant/roles/InitiatorClassSymbol.webp`} width={30} height={30}/>
                                </div>
                            </Tooltip>
                            <Tooltip content={"Controller"} color={"invert"}>
                                <div onClick={() => setRole("Controller")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "Controller" ? "bg-valorant-color":"")}>
                                    <Image src={"/valorant/roles/ControllerClassSymbol.webp"} width={30} height={30}/>
                                </div>
                            </Tooltip>
                            <Tooltip content={"Duelist"} color={"invert"}>
                                <div onClick={() => setRole("Duelist")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "Duelist" ? "bg-valorant-color":"")}>
                                    <Image src={"/valorant/roles/DuelistClassSymbol.webp"} width={30} height={30}/>
                                </div>
                            </Tooltip>
                            <Tooltip content={"Sentinel"} color={"invert"}>
                                <div onClick={() => setRole("Sentinel")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "Sentinel" ? "bg-valorant-color":"")}>
                                    <Image src={"/valorant/roles/SentinelClassSymbol.webp"} width={30} height={30}/>
                                </div>
                            </Tooltip>
                        </div>
                        <div className={"bg-summoner-light rounded w-60 mr-2 h-9 flex justify-between items-center"}>
                            <input className={"bg-summoner-light indent-3 ml-1 text-xs text-white w-48 h-9 rounded"} value={inputValue} onChange={handleChange} type="text" placeholder={"Champion Name"}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 text-summoner-gray">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={"bg-summoner-light rounded-b overflow-hidden flex justify-center"}>
                    <div className="mt-3 mb-2 grid grid-cols-12 gap-x-5 gap-y-5 text-summoner-gray text-xs text-center">
                        {agents ? (
                        filterAgents()?.map((item) => (
                            <div onClick={() => goToAgent(event, item.displayName)} key={item.uuid}>
                                <Image className={"cursor-pointer"} src={item.displayIconSmall} unoptimized={true} width={60} height={60} alt={`picture of ${item.displayName}`}/>
                                <span>{item.displayName}</span>
                            </div>
                        ))
                        ) : "loading"}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Agents