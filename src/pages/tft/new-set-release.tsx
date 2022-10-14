import Image from "next/future/image";
import {RefObject, useRef, useState} from "react";
import traits from "@/data/tft/set7.5/updates/traits.json"
import {TFTChampion} from "@/utils/@types/tft/champion.t";
import {TFTTraits} from "@/utils/@types/tft/traits.t";
import {Tooltip} from "@nextui-org/react";

const NewSetRelease = () => {
    const traitRef = useRef(null)

    return(
        <>
            <div className={"block w-full my-0 mx-auto"}>
                <Image className={"w-full h-full object-cover absolute -z-10 brightness-50"} src={"/tft/main2_bg.jpg"} alt={"bg"} fill/>
                <div className={"block w-[1080px] my-0 mx-auto"}>
                    <div className={"flex flex-row mt-20 gap-28"}>
                        <div>
                            <Image src={"/tft/set-7-5-logo.png"} alt={"logo"} width={500} height={500}/>
                        </div>
                        <div className={"text-ellipsis w-96"}>
                            <h1 className={"text-4xl"}>Dragonlands: Uncharted TFT 7.5 Update</h1>
                            <span className={"text-blue-500"}>Live Now!</span>
                        </div>
                    </div>
                    <div className={"mt-20 bg-full"}>
                        <Categories/>
                        <div className={"bg-summoner-dark w-full h-auto mt-1 border border-match-text flex justify-center"}>
                            <div className={"w-[960px]"}>
                                <div className={"mt-20"}>
                                    <h1 className={"text-lg pl-5"}>NEW AND CHANGED TRAITS</h1>
                                    <hr className={"bg-match-text h-[1px] border-none"}/>
                                    <Traits/>
                                </div>
                                <div className={"mt-10"}>
                                    <h1 className={"text-lg pl-5"}>NEW AND CHANGED CHAMPIONS</h1>
                                    <hr className={"bg-match-text h-[1px] border-none"}/>
                                </div>
                                <div className={"mt-10"}>
                                    <h1 className={"text-lg pl-5"}>NEW AND CHANGED ITEMS</h1>
                                    <hr className={"bg-match-text h-[1px] border-none"}/>
                                </div>
                                <div className={"mt-10"}>
                                    <h1 className={"text-lg pl-5"}>NEW AND CHANGED AUGMENTS</h1>
                                    <hr className={"bg-match-text h-[1px] border-none"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Categories = () => {
    return(
        <>
            <div className={"flex flex-row"}>
                <div className={"bg-summoner-dark h-10 w-56 flex items-center justify-center border-l border-t border-b border-match-text hover:bg-tft-color cursor-pointer"}>
                    TRAITS
                </div>
                <div className={"bg-summoner-dark h-10 w-56 flex items-center justify-center border-l border-t border-b border-match-text hover:bg-tft-color cursor-pointer"}>
                    CHAMPIONS
                </div>
                <div className={"bg-summoner-dark h-10 w-56 flex items-center justify-center border-l border-t border-b border-match-text hover:bg-tft-color cursor-pointer"}>
                    ITEMS
                </div>
                <div className={"bg-summoner-dark h-10 w-56 flex items-center justify-center border-l border-t border-b border-match-text hover:bg-tft-color cursor-pointer"}>
                    AUGMENTS
                </div>
                <div className={"bg-summoner-dark h-10 w-56 flex items-center justify-center border border-match-text hover:bg-tft-color cursor-pointer"}>
                    CHEAT SHEET
                </div>
            </div>
        </>
    )
}

const Traits = () => {
    const getBorderColor = (cost: number) => {

        const tierMap = new Map([
            [1, "border-tft-gray"],
            [2, "border-tft-green"],
            [3, "border-tft-blue"],
            [4, "border-tft-pink"],
            [5, "border-tft-yellow"],
            [8, "border-tft-yellow"],
        ])

        return tierMap.get(cost)
    }
    return(
        <>
            <div className={"flex flex-wrap mt-10 w-full gap-1.5 pl-2"}>
                {traits.map((trait, index) => (
                    <div key={index} className={"bg-summoner-light w-[310px] border-[0.5px] border-summoner-gray rounded"}>
                        <div className={"bg-tft-color pl-5 h-16 rounded-t flex items-center"}>
                            <div className={"flex flex-row gap-5 items-center"}>
                                <Image className={"h-10 w-10"} src={`/tft/set7.5/traits/${trait.img}`} alt={"logo"} width={30} height={30}/>
                                <div className={"flex flex-col"}>
                                    <span>{trait.name}</span>
                                    <span className={"text-summoner-gray"}>{trait.champions.length} Champions</span>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col gap-5"}>
                            <div className={"p-2"}>
                                <span className={"text-sm text-summoner-gray"}>{trait.description}</span>
                            </div>
                            <div className={"p-2"}>
                                <span className={"text-sm text-summoner-gray"}>{trait.effect}</span>
                            </div>
                            <div className={"flex flex-col gap-2 p-2"}>
                                {trait.stats.map((stat, index) => (
                                    <div key={index} className={"flex flex-row"}>
                                        <div className={"rounded bg-summoner-gray text-sm min-w-[25px] h-6 flex items-center justify-center"}>
                                            {stat.number}
                                        </div>
                                        <div className={"pl-3 text-sm text-ellipsis flex items-center"}>
                                            {stat.stat}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr/>
                            <div className={"pl-2 mb-3"}>
                                {trait.champions.map((champion, index) => (
                                    <div className={"inline-block pl-1.5"} key={index}>
                                        <Tooltip content={champion.name} color={"invert"}>
                                            <Image className={"border " + getBorderColor(champion.cost)} src={`/tft/set7.5/champions/${champion.id}.png`} alt={"champion"} width={40} height={40}/>
                                        </Tooltip>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

const Champions = () => {
    return(
        <>

        </>
    )
}

export default NewSetRelease