import {useEffect, useState} from "react";
import {ddragon} from "reksai";
import {IChampion} from "reksai/src/@types/champion";
import {useRouter} from "next/router";
import axios from "axios";
import useSWR from "swr";

const Champion = () => {
    const [champion, setChampion] = useState<IChampion>()
    const router = useRouter()
    /*fetcher engine*/
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    /*ddragon vesion*/
    const { data: version } = useSWR("/api/lol/versions", fetcher)


    useEffect(() => {
        async function getChampions(){
            if(typeof router.query.championName != "string") return
            const response = await ddragon.champion.get(router.query.championName)
            setChampion(response)
        }
        getChampions()
    }, [])

    const getSpellKey = (index: number) => {
        const spell = new Map([
            ["0", {
                spellKey:"Q",
                color:"text-win-border"
            }],
            ["1", {
                spellKey: "W",
                color: "text-teal-400"
            }],
            ["2", {
                spellKey: "E",
                color: "text-orange-400"
            }],
            ["3", {
                spellKey: "R",
                color: "text-white"
            }]
        ])

        return spell.get(String(index))
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
                                    <img className={"w-full h-full rounded-2xl overflow-hidden border-0 items-center"} src={`http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${champion?.name == "FiddleSticks" ? "Fiddlesticks" : champion?.name}.png`} alt=""/>
                                </div>
                                <div className={"flex flex-col justify-end"}>
                                    <h1 className={"font-normal leading-[0] text-[0] m-0 p-0 block"}>
                                        <span className={"inline-block text-[24px] font-bold text-gray-300 leading-[32px]"}>
                                            {champion?.name}
                                        </span>
                                        <span className={"text-[24px] ml-[6px] text-summoner-gray tracking-tighter capitalize"}>
                                            {champion?.title}
                                        </span>
                                    </h1>
                                    <div className={"leading-[18px] text-xs text-summoner-gray font-[400] block"}>
                                        <span>4 Tier</span>
                                    </div>
                                    <div className={"flex mt-[8px]"}>
                                        {champion?.spells.map((spell,index) => (
                                            <div key={spell.id} className={"cursor-pointer rounded w-[24px] h-[24px] overflow-hidden ml-[4px] block"}>
                                                <div className={"relative block"}>
                                                    <div className={"absolute right-0 bottom-0 w-[14px] h-[14px] block"}>
                                                        <div className={`flex items-center justify-center w-[14px] h-[16px] rounded-tl bg-win text-[11px] font-bold leading-[1] ${getSpellKey(index)?.color}`}>
                                                            {getSpellKey(index)?.spellKey}
                                                        </div>
                                                    </div>
                                                    <img className={"block border-0 align-middle w-[24px] h-[24px]"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`} alt=""/>
                                                </div>
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

export default Champion