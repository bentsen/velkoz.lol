import Image from "next/image";
import {motion} from "framer-motion";
import axios from "axios";
import useSWR from "swr";
import {ISummoner} from "reksai/src/@types/summoner";
import {useRouter} from "next/router";
import {ILeagueEntry} from "reksai/src/@types/league";
import {IMatch} from "reksai/src/@types/match";
import {useState} from "react";
import Tftmatch from "../../components/Tftmatch";
import Match from "../../components/Match";
import {TFTMatch} from "../../utils/types/tft/matches.t";
import DoughnutChart from "../../components/DoughnutChart";

const Account = () => {
    const router = useRouter()
    const [updateLoading, setUpdateLoading] = useState(false)
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    const { data: summoner, error: summonerError, mutate: mutateSummoner } = useSWR<ISummoner>("/api/tft/summoners/by-name/"+router.query.summonerName+"?region="+router.query.region, fetcher)
    const { data: version } = useSWR("/api/lol/versions", fetcher)
    const { data: ranks, mutate: mutateRank } = useSWR<ILeagueEntry[]>("/api/tft/league/"+summoner?.id+"?region="+router.query.region, fetcher)
    const { data: matches, mutate: mutateMatch } = useSWR<TFTMatch[]>("/api/tft/summoners/matches?puuid="+summoner?.puuid+"&region="+router.query.region, fetcher)
    const icon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner?.profileIconId}.png`


    /*Update summoners in database*/
    const updateSummoner = async () => {

    }

    const calculateWinRate = (wins: number, loss: number) => {
        const sum = wins + loss
        const deci = wins / sum
        const winrate = deci * 100

        return Math.round(winrate)
    }

    const romanToInt = (roman: string) => {

        const values = new Map([
            ['I', 1],
            ['V', 5],
            ['X', 10]
        ]);

        let result = 0,
            current, previous = 0;
        for (const char of roman.split("").reverse()) {
            current = values.get(char);
            if(current != undefined) {
                if (current >= previous) {
                    result += current;
                } else {
                    result -= current;
                }
                previous = current;
            }
        }
        return result;
    }

    return(
        <>
            <div className={"block w-full my-0 mx-auto"}>
                {summonerError ? (
                    <div className={"flex justify-center items-center mt-10"}>
                        <h1 className={"text-white text-xl"}>This summoner does not exist. Please check spelling</h1>
                    </div>
                ) : summoner ? (
                    <div className={"w-[1080px] my-0 mx-auto"}>
                        <div className={"h-64 overflow-hidden"}>
                            <div className={`mt-8 w-[1080px] h-52 pb-2 bg-summoner-light rounded bg-cover relative`}>
                                <div className={"inline-block w-80"}>
                                    <div className={"pl-6 mt-2"}>
                                        <div className={"inline-block"}>
                                            <Image className={"rounded-3xl"} src={icon} width={100} height={100}/>
                                            <div className={"relative -mt-5 text-center text-white"}>
                                                <span className={"inline-block bg-summoner-dark leading-5 rounded-lg px-2 text-xs"}>{summoner.summonerLevel}</span>
                                            </div>
                                        </div>
                                        <div className={"inline-block align-top pt-6 pl-5"}>
                                            <p className={"text-white text-2xl font-bold font-heading"}>{summoner.name}</p>
                                            <p className={"text-summoner-gray text-xs mt-2"}>Ladder Rank:</p>
                                        </div>
                                    </div>
                                    <div className={"pl-6"}>
                                        <div className={"mt-3"}>
                                            <motion.button whileHover={{scale: 1.1}} className={"bg-tft-color text-white w-16 h-10 rounded text-sm font-heading"}>
                                                {updateLoading ? (
                                                    <div className={"w-auto flex items-center justify-center h-auto"}>
                                                        <div role="status">
                                                            <svg aria-hidden="true" className="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                            </svg>
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                ): ("Update")}
                                            </motion.button>
                                            <motion.button whileHover={{scale: 1.1}} className={"bg-transparent border-tft-color border ml-2 text-tft-color w-20 h-10 rounded text-sm font-heading"}>Tier-Graph</motion.button>
                                        </div>
                                        <p className={"text-summoner-gray text-xs mt-2"}>Last updated:</p>
                                    </div>
                                </div>
                                <div className={"inline-block align-top"}>
                                    hej
                                </div>
                            </div>
                        </div>
                        <div className={"block w-[1080px] my-0 mx-auto"}>
                            <div className={"inline-block w-[332] align-top min-h-[870px]"}>
                                {ranks?.length != 0 ? (
                                    ranks?.map((rank) => (
                                        <div key={rank.leagueID} className={"divide-y divide-black bg-summoner-light mt-2 w-80 h-auto text-white rounded"}>
                                            <div className={"h-7 flex items-center"}>
                                                <p className={"text-sm ml-2"}>{rank.queueType}</p>
                                            </div>
                                            <div className={"flex flex-row"}>
                                                <div className={"flex items-center w-[600px] mb-2"}>
                                                    <div className={"bg-summoner-dark mt-2 rounded-full flex justify-center items-center w-20 h-20 ml-2"}>
                                                        <Image src={`/lol/medals/${rank.tier.toLowerCase()}.webp`} width={60} height={60} alt={"flex-rank-emblem"}/>
                                                    </div>
                                                    <div className={"flex flex-col ml-2 capitalize"}>
                                                        <p className={"text-md font-bold"}>{rank.tier.toLowerCase()} {romanToInt(rank.rank)}</p>
                                                        <p className={"text-xs text-summoner-gray"}>{rank.leaguePoints} LP</p>
                                                    </div>
                                                </div>
                                                <div className={"flex w-full justify-end items-center mr-2"}>
                                                    <div className={"flex flex-col text-xs"}>
                                                        <div className={"flex justify-end"}>
                                                            <p className={"text-md text-summoner-gray"}>{rank.wins}W {rank.losses}L</p>
                                                        </div>
                                                        <p className={"text-xs text-summoner-gray"}>Win Rate {calculateWinRate(rank.wins, rank.losses)}%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div>
                                        <div className={"mt-[8px] rounded bg-summoner-dark block"}>
                                            <div className={"flex justify-between leading-[35px] pt-0 pb-0 pl-[12px] pr-[12px] text-[14px] text-white"}>
                                                Ranked Solo
                                                <span className={"text-[14px] font-bold text-gray-600"}>Unranked</span>
                                            </div>
                                        </div>
                                        <div className={"mt-[8px] rounded bg-summoner-dark block"}>
                                            <div className={"flex justify-between leading-[35px] pt-0 pb-0 pl-[12px] pr-[12px] text-[14px] text-white"}>
                                                Ranked Flex
                                                <span className={"text-[14px] font-bold text-gray-600"}>Unranked</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={"inline-block w-[752px] mt-2 ml-2 align-top"}>
                                <div className={"divide-y divide-black bg-summoner-light w-full h-48 text-white rounded-t"}>
                                    <div className={"h-7 flex items-center"}>
                                        <p className={"text-md ml-2 font-medium"}>Match History Stats</p>
                                    </div>
                                    <div>
                                        {matches ? (
                                            <div className={"flex flex-row gap-4"}>
                                                <div className={"bg-summoner-dark w-60"}>
                                                    Wins 11
                                                </div>
                                            </div>
                                        ): <div></div>}
                                    </div>
                                </div>
                                <div className={"flex bg-summoner-light items-center rounded-b rounded"}>
                                    <div className={"flex flex-col w-full h-auto mb-3 items-center"}>
                                        <span className={"text-summoner-gray font-medium"}>Match History</span>
                                        <div className={"h-px w-96 bg-match-text"}></div>
                                        {matches ? (
                                            matches.map((match) => (
                                                <div key={match.metadata.match_id}>
                                                    <Tftmatch key={match.metadata.match_id} match={match} summoner={summoner} region={String(router.query.region)}/>
                                                </div>
                                            ))
                                        ): (
                                        <div className={"w-full flex items-center justify-center h-14"}>
                                            <div role="status">
                                                <svg aria-hidden="true"
                                                     className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="currentColor"/>
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ): <div className={"w-full flex items-center justify-center h-14"}>
                    <div role="status">
                        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Account