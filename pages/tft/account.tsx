import {useEffect, useState} from "react";
import {Summoner} from "../../utils/types/summoner.t";
import apiFacade from "../../store/apiFacade";
import Image from "next/image";
import Match from "../../components/Match";

import Link from "next/link";
import {motion} from "framer-motion";

const Account = () => {
    const [summoner, setSummoner] = useState<Summoner>()
    const icon = `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/${summoner?.profile_icon_id}.png`

    useEffect(()  => {
        async function getSummoner(){
            apiFacade.getSummoner(localStorage.getItem("region") as string, localStorage.getItem("summonerName") as string)
                .then((data) => setSummoner(data))

        }
        getSummoner()

    }, [])

    const calculateWinRate = (wins: number, loss: number) => {
        const sum = wins + loss
        const deci = wins / sum
        const winrate = deci * 100

        return Math.round(winrate)
    }

    return(
        <>
            <div>
                {summoner == null ? (
                    <div className={"flex justify-center items-center mt-10"}>
                        <h1 className={"text-white text-xl"}>This summoner does not exist. Please check spelling</h1>
                    </div>
                ) : (
                    <div>
                        <div className={"bg-summoner-light h-64 overflow-hidden"}>
                            <div className={"flex mt-10 ml-40 items-center"}>
                                <div className={"relative"}>
                                    <Image className={"rounded-3xl"} loader={() => icon} src={icon} width={100} height={100}/>
                                    <div className={"relative -mt-5 text-center text-white"}>
                                        <span className={"inline-block bg-summoner-dark leading-5 rounded-lg px-2 text-xs"}>{summoner.summonerLevel}</span>
                                    </div>
                                </div>
                                <div className={"ml-3"}>
                                    <p className={"text-white text-2xl font-bold"}>{summoner?.name}</p>
                                    <p className={"text-summoner-gray text-xs mt-2"}>Ladder Rank</p>
                                    <div className={"mt-3"}>
                                        <motion.button whileHover={{scale: 1.1}} className={"bg-leagueoflegends-color text-white w-16 h-10 rounded text-sm"}>Update</motion.button>
                                        <motion.button whileHover={{scale: 1.1}} className={"bg-transparent border-leagueoflegends-color border ml-2 text-leagueoflegends-color w-20 h-10 rounded text-sm"}>Tier-Graph</motion.button>
                                    </div>
                                    <p className={"text-summoner-gray text-xs mt-2"}>Last updated:</p>
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
                        <div className={"flex flex-row"}>
                            <div className={""}>
                                <div className={"divide-y divide-black bg-summoner-light mt-2 ml-40 w-80 h-auto text-white rounded"}>
                                    <div className={"h-7 flex items-center"}>
                                        <p className={"text-sm ml-2"}>Ranked Solo-Matches</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <div className={"flex items-center w-96 mb-2"}>
                                            <div className={"bg-summoner-dark mt-2 rounded-full flex justify-center items-center w-20 h-20 ml-2"}>
                                                <Image src={`/ranked-emblems/Emblem_${summoner?.solo.tier.toLowerCase()}.png`} width={60} height={60}/>
                                            </div>
                                            <div className={"flex flex-col ml-2"}>
                                                <p className={"text-md font-bold"}>{summoner?.solo?.tier} {summoner?.solo?.rank}</p>
                                                <p className={"text-xs text-summoner-gray"}>{summoner?.solo?.leaguePoints} LP</p>
                                            </div>
                                        </div>
                                        <div className={"flex w-full justify-end items-center mr-2"}>
                                            <div className={"flex flex-col text-xs"}>
                                                <div className={"flex justify-end"}>
                                                    <p className={"text-md text-summoner-gray"}>{summoner?.solo?.wins}W {summoner?.solo?.losses}L</p>
                                                </div>
                                                <p className={"text-xs text-summoner-gray"}>Win Rate {calculateWinRate(summoner?.solo?.wins, summoner?.solo?.losses)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"divide-y divide-black bg-summoner-light mt-2 ml-40 w-80 h-auto text-white rounded"}>
                                    <div className={"h-7 flex items-center"}>
                                        <p className={"text-sm ml-2"}>Ranked Flex-Matches</p>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <div className={"flex items-center w-96 mb-2"}>
                                            <div className={"bg-summoner-dark mt-2 rounded-full flex justify-center items-center w-20 h-20 ml-2"}>
                                                <Image src={`/ranked-emblems/Emblem_${summoner?.flex?.tier.toLowerCase()}.png`} width={60} height={60}/>
                                            </div>
                                            <div className={"flex flex-col ml-2"}>
                                                <p className={"text-md font-bold "}>{summoner?.flex?.tier} {summoner?.flex?.rank}</p>
                                                <p className={"text-xs text-summoner-gray"}>{summoner?.flex?.leaguePoints} LP</p>
                                            </div>
                                        </div>
                                        <div className={"flex w-full justify-end items-center mr-2"}>
                                            <div className={"flex flex-col text-xs"}>
                                                <div className={"flex justify-end"}>
                                                    <p className={"text-md text-summoner-gray"}>{summoner?.flex?.wins}W {summoner?.flex?.losses}L</p>
                                                </div>
                                                <p className={"text-xs text-summoner-gray"}>Win Rate {calculateWinRate(summoner?.flex?.wins, summoner?.flex?.losses)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"divide-y divide-black bg-summoner-light mt-2 ml-40 w-80 h-96 text-white rounded"}>
                                    <div>
                                        <p className={"text-sm ml-2"}>pik</p>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                            <div className={"flex flex-col w-1/2 ml-2 mt-2 h-auto"}>
                                <div className={"divide-y divide-black bg-summoner-light w-full h-48 text-white rounded"}>
                                    <div className={"h-7 flex items-center"}>
                                        <p className={"text-sm ml-2"}>loui er sej</p>
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <div className={"flex flex-col mb-10"}>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Account