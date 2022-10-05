import Image from "next/image";
import {motion} from "framer-motion";
import axios from "axios";
import useSWR from "swr";
import {ISummoner} from "reksai/src/@types/summoner";
import {useRouter} from "next/router";
import {ILeagueEntry} from "reksai/src/@types/league";
import {useState} from "react";
import Tftmatch from "../../components/Tftmatch";
import Match from "../../components/Match";
import {TFTMatch, Participant} from "../../utils/types/tft/matches.t";
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


    /*Update summoner in database*/
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

    /*Identifies the summoner in all matches*/
    const getSummerParticipantFromMatch = (match: TFTMatch) => {
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

    return(
        <>
            <div className={"block w-full my-0 mx-auto"}>
                {summonerError ? (
                    <div className={"flex justify-center items-center mt-10"}>
                        <h1 className={"text-white text-xl"}>This summoner does not exist. Please check spelling</h1>
                    </div>
                ) : summoner ? (
                    <div className={"sm:block flex flex-col w-[1080px] sm:w-full overflow-hidden sm:overflow-auto"}>
                        <div className={"bg-[url('/tft/main_bg.png')] h-[350px] w-full bg-cover overflow-hidden"}>
                        </div>
                        <div className={"absolute flex items-center top-72 ml-52 w-full h-24"}>
                            <div className={"w-28 h-28 rounded border-2 border-black left-0 relative"}>
                                <img className={""} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`} alt=""/>
                                <div className={"absolute right-2.5 bottom-2.5 w-[14px] h-[14px] block mb-0.5"}>
                                    <div className={`flex text-white items-center justify-center w-[24px] h-[26px] rounded-tl rounded-br-sm bg-default-color text-[11px] font-bold leading-[1]`}>
                                        {summoner.summonerLevel}
                                    </div>
                                </div>
                            </div>
                            <div className={"text-white align-top ml-10"}>
                                <h1 className={"text-3xl pb-5"}>{summoner.name}</h1>
                            </div>
                        </div>
                        <div className={"bg-white h-14 bg-gradient-to-r from-gray-700 via-gray-900 to-black"}>
                            hej
                        </div>
                        <div className={"flex flex-col w-[1080px] my-0 mx-auto"}>
                            <div className={"w-[900px] align-top"}>
                                {ranks?.length != 0 && (
                                    <>
                                        {ranks?.map((rank) => (
                                            <div key={rank.leagueID} className={"bg-gradient-to-r from-summoner-dark via-zinc-900 to-summoner-dark mt-2 w-full h-60 text-white rounded border-solid border-[1px] border-summoner-light"}>
                                                <div className={"flex items-center h-16"}>
                                                    <p className={"text-lg ml-2"}>{rank.queueType} - Recent Matches Overview</p>
                                                </div>
                                                <div className={"flex flex-row bg-gradient-to-r from-summoner-light via-zinc-900 to-summoner-light h-32 relative"}>
                                                    <div className={"flex items-center w-[600px] mb-7"}>
                                                        <div className={"mt-2 flex justify-center items-center w-20 h-20 ml-2"}>
                                                            <Image src={`/lol/medals/${rank.tier.toLowerCase()}.webp`} width={60} height={60} alt={"flex-rank-emblem"}/>
                                                        </div>
                                                        <div className={"flex flex-col ml-2 capitalize"}>
                                                            <p className={"text-md font-bold"}>{rank.tier.toLowerCase()} {romanToInt(rank.rank)}</p>
                                                            <div className={"relative z-10"}>
                                                                <div className={"bg-summoner-gray w-40 h-3 rounded opacity-70"}></div>
                                                                <div style={{width: `${rank.leaguePoints}%`}} className={"absolute top-0 bottom-0 left-0 bg-tft-yellow rounded-full"}></div>
                                                            </div>
                                                            <p className={"text-xs text-summoner-gray mt-1"}>{rank.leaguePoints} LP</p>
                                                        </div>
                                                    </div>
                                                    <div className={"mr-10"}>
                                                        <div className={"inline-block"}>
                                                            <span className={"ml-1"}>recent matches</span>
                                                            {matches && (
                                                                <>
                                                                    <div className={"flex flow-row h-7 gap-0.5"}>
                                                                        {matches.slice(0, 10).map((match,index) => (
                                                                            <div key={match.metadata.match_id} className={"ml-1 w-7 flex items-center justify-center " + (index == 0 ? "rounded-tl-md rounded-bl-md ": index == 9 ? "rounded-tr-md rounded-br-md " : " ") + (getSummerParticipantFromMatch(match)?.placement == 1 ? "bg-tft-yellow": getSummerParticipantFromMatch(match)?.placement == 2 ? "bg-gray-300": getSummerParticipantFromMatch(match)?.placement == 3 ? "bg-amber-700" : "bg-summoner-dark")}>
                                                                                {getSummerParticipantFromMatch(match)?.placement}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className={"flex flex-row h-7 mt-1.5 gap-0.5"}>
                                                                        {matches.slice(10).map((match,index) => (
                                                                            <div key={match.metadata.match_id} className={"ml-1 w-7 flex items-center justify-center " + (index == 0 ? "rounded-tl-md rounded-bl-md ": index == 9 ? "rounded-tr-md rounded-br-md " : " ") + (getSummerParticipantFromMatch(match)?.placement == 1 ? "bg-tft-yellow": getSummerParticipantFromMatch(match)?.placement == 2 ? "bg-gray-300": getSummerParticipantFromMatch(match)?.placement == 3 ? "bg-amber-700" : "bg-summoner-dark")}>
                                                                                {getSummerParticipantFromMatch(match)?.placement}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={"flex flex-row gap-10 absolute pt-[105px] pl-16"}>
                                                        <div className={"bg-summoner-light w-40 h-14 rounded"}>
                                                            <div className={"p-3"}>
                                                                <span className={"text-lg"}>Wins: {rank.wins}</span>
                                                            </div>
                                                        </div>
                                                        <div className={"bg-summoner-light w-40 h-14 rounded"}>
                                                            <div className={"p-3"}>
                                                                <span className={"text-lg"}>Losses: {rank.losses}</span>
                                                            </div>
                                                        </div>
                                                        <div className={"bg-summoner-light w-40 h-14 rounded"}>
                                                            <div className={"p-3"}>
                                                                <span className={"text-lg"}>Win Rate: {calculateWinRate(rank.wins, rank.losses)}%</span>
                                                                <div className={"relative z-10"}>
                                                                    <div className={"bg-summoner-gray w-32 h-1 rounded opacity-70"}></div>
                                                                    <div style={{width: `${calculateWinRate(rank.wins,rank.losses)}%`}} className={"absolute top-0 bottom-0 left-0 rounded-full " + (calculateWinRate(rank.wins,rank.losses) < 50 ? "bg-loss-border" : "bg-win")}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={"bg-summoner-light w-40 h-14 rounded"}>
                                                            <div className={"p-3"}>
                                                                <span className={"text-lg"}>Matches: {rank.losses + rank.wins}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className={"w-[900px] mt-2 align-top"}>
                                <div className={"bg-gradient-to-r from-summoner-dark via-zinc-900 to-summoner-dark w-full border-solid border-l-[1px] border-t-[1px] border-r-[1px] border-summoner-light h-32 text-white rounded-t overflow-hidden"}>
                                    <div className={"h-7 flex items-center pt-10 pl-5"}>
                                        <p className={"text-lg ml-2 font-medium"}>Match History Stats</p>
                                    </div>
                                    <div className={"inline-block align-top"}>
                                        
                                    </div>
                                </div>
                                <div className={"flex bg-gradient-to-r from-summoner-dark via-zinc-900 to-summoner-dark border-solid border-r-[1px] border-l-[1px] border-b-[1px] border-summoner-light items-center rounded-b"}>
                                    <div className={"flex flex-col w-full h-auto mb-3 items-center"}>
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