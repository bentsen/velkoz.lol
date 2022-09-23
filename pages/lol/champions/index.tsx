import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {VersionContext} from "../../../store/VersionContext/VersionList";
import axios from "axios";
import {Champion} from "../../../utils/types/champion.t";
import {useRouter} from "next/router";

const Champions = () => {
    const router = useRouter()
    const [champions, setChampions] = useState<Champion[]>([])
    const Version = useContext(VersionContext);
    const [role, setRole] = useState("all")
    const [inputValue, setInputValue] = useState<string>("")
    const [filteredList, setFilteredList] = useState<Champion[] | undefined>()

    useEffect(() => {
        async function getChampions(){
            axios.get<any>("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json")
                .then(response => {
                    let championData = []
                    for(let key in response.data['data']){
                        championData.push(response.data['data'][key])
                    }
                    setChampions(championData)
                })
        }
        getChampions()
    }, [])


    const filterChampion = (e: any) => {
        const keyword = e.target.value

        if(keyword !== ''){
            if(champions) {
                const results: Champion[] | undefined = champions?.filter((items) => {
                    return items.name.toLowerCase().startsWith(keyword.toLowerCase())
                })
                //if text fields has an input
                setFilteredList(results)
            }
            else
                console.log('no champions exits')
        } else {
            //if text fields is empty
            setFilteredList(champions)
        }
        setInputValue(keyword)
    }

    const goToChampion = (e: any, championName: string) => {
        router.push(`/lol/champions/${championName}`)
    }


    return(
        <>
            <div className={"flex flex-col divide-black divide-y"}>
                <div className={"bg-summoner-light w-full h-16 flex items-center"}>
                    <h1 className={"text-white text-2xl font-bold ml-40"}>Champions</h1>
                </div>
                <div className={"bg-summoner-light w-full h-12"}>

                </div>
            </div>
            <div className={"container mx-auto px-20 mt-10"}>
                <div className={"flex justify-between text-xs text-summoner-gray"}>
                    <div>
                        There are currently x Champions available on Summoner&apos;s Rift
                    </div>
                    <div>
                        Displaying Champions active in the game. Champions are updated periodically.
                    </div>
                </div>
                <div className={"w-full h-auto mt-4"}>
                    <div className={"w-full h-12 rounded-t bg-summoner-dark flex justify-between items-center"}>
                        <div className={"flex flex-row items-center divide-summoner-gray divide-x border border-summoner-gray rounded w-auto h-10 ml-2"}>
                            <div onClick={() => setRole("all")} className={"px-2 h-10 rounded-l flex items-center cursor-pointer " + (role === "all" ?  "bg-leagueoflegends-color":"")}>
                                <Image src={`/lol/positions/icon-position-all-${role === "all" ? "wh" : "dark"}.svg`} width={30} height={30}/>
                            </div>
                            <div onClick={() => setRole("top")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "top" ? "bg-leagueoflegends-color":"")}>
                                <Image src={`/lol/positions/icon-position-top-${role === "top" ? "wh" : "dark"}.svg`} width={30} height={30}/>
                            </div>
                            <div onClick={() => setRole("mid")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "mid" ? "bg-leagueoflegends-color":"")}>
                                <Image src={`/lol/positions/icon-position-mid-${role === "mid" ? "wh" : "dark"}.svg`} width={30} height={30}/>
                            </div>
                            <div onClick={() => setRole("jng")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "jng" ? "bg-leagueoflegends-color":"")}>
                                <Image src={`/lol/positions/icon-position-jng-${role === "jng" ? "wh" : "dark"}.svg`} width={30} height={30}/>
                            </div>
                            <div onClick={() => setRole("bot")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "bot" ? "bg-leagueoflegends-color":"")}>
                                <Image src={`/lol/positions/icon-position-bot-${role === "bot" ? "wh" : "dark"}.svg`} width={30} height={30}/>
                            </div>
                            <div onClick={() => setRole("sup")} className={"px-2 h-10 flex items-center cursor-pointer " + (role === "sup" ? "bg-leagueoflegends-color":"")}>
                                <Image src={`/lol/positions/icon-position-sup-${role === "sup" ? "wh" : "dark"}.svg`} width={30} height={30}/>
                            </div>
                        </div>
                        <div className={"bg-summoner-light rounded w-60 mr-2 h-9 flex justify-between items-center"}>
                            <input className={"bg-summoner-light indent-3 ml-1 text-xs text-white w-48 h-9 rounded"} value={inputValue} onChange={filterChampion} type="text" placeholder={"Champion Name"}/>
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
                        {filteredList?.map((item) => (
                            <div onClick={() => goToChampion(event, item.name)} key={item.id}>
                                <Image className={"cursor-pointer"} key={item.id} src={`https://ddragon.leagueoflegends.com/cdn/${Version}/img/champion/${item.image.full}`} unoptimized={true} width={60} height={60} alt={`picture of ${item.name}`}/>
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Champions