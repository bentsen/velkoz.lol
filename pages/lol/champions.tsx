import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import {Champion} from "../../utils/types/champion.t";
import {motion} from "framer-motion";
import {ChampionContext} from "../../store/ChampionContext/ChampionList";
import {VersionContext} from "../../store/VersionContext/VersionList";
import Reksai from "reksai";


const Champions = () => {
    const reksai = new Reksai()
    const Champions: Champion[] = useContext();
    const Version = useContext(VersionContext);
    const [role, setRole] = useState("all")
    const [inputValue, setInputValue] = useState<string>("")
    const [filteredList, setFilteredList] = useState<Champion[] | undefined>([])

    useEffect(() => {
        setFilteredList(Champions)
    }, []);


    const filterChampion = (e: any) => {
        const keyword = e.target.value

        if(keyword !== ''){
            if(Champions) {
                const results: Champion[] | undefined = Champions?.filter((items) => {
                    return items.name.toLowerCase().startsWith(keyword.toLowerCase())
                })
                //if text fields has an input
                setFilteredList(results)
            }
            else
                console.log('no champions exits')
        } else {
            //if text fields is empty
            setFilteredList(Champions)
        }
        setInputValue(keyword)
    }

    // @ts-ignore
    // @ts-ignore
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
                            <FontAwesomeIcon className={"text-summoner-gray mr-3"} icon={faSearch}/>
                        </div>
                    </div>
                </div>
                <div className={"bg-summoner-light rounded-b overflow-hidden flex justify-center"}>
                    <div className="mt-3 mb-2 grid grid-cols-12 gap-x-5 gap-y-5 text-summoner-gray text-xs text-center">
                        {filteredList?.map((item) => (
                            <motion.div key={item.id} initial={"hidden"} animate={"show"}>
                                <motion.div key={item.id}>
                                    <Image className={"cursor-pointer"} key={item.id} src={`https://ddragon.leagueoflegends.com/cdn/${Version}/img/champion/${item.image.full}`} unoptimized={true} width={60} height={60} alt={`picture of ${item.name}`}/>
                                    <span>{item.name}</span>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Champions