import {useEffect, useState} from "react";
import Image from "next/image";
import Match from "../../components/Match";
import {motion} from "framer-motion";
import axios from "axios";
import {ISummoner} from "reksai/src/@types/summoner";
import {IMatch, Participant} from "reksai/src/@types/match";
import useSWR from 'swr'
import DoughnutChart from "../../components/DoughnutChart";

/*
* Name: Mikkel Bentsen
* Date: 14/9-2022
*/

const Account = () => {
    /*Summoner Instance*/
    const [summoner, setSummoner] = useState<ISummoner>()
    /*Matches Instance*/
    const [matches, setMatches] = useState<IMatch[]>([])
    /*Icon url*/
    const icon = `https://ddragon.leagueoflegends.com/cdn/12.13.1/img/profileicon/${summoner?.profileIconId}.png`
    /*Match fetcher using SWR and axios*/
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    const { data, error } = useSWR<IMatch[]>("/api/summoner/matches?summonerName="+localStorage.getItem("summonerName")+"&region="+localStorage.getItem("region"), fetcher)

    /*Summoner fetcher using axios*/
    useEffect(()  => {
        async function getSummoner(){
            const response = await axios.get<ISummoner>("/api/summoner?name="+localStorage.getItem("summonerName")+"&region="+localStorage.getItem("region"))
            const data:ISummoner = await response.data
            setSummoner(data)
        }
        getSummoner()

    }, [])

    /*Matches fetcher should be deleted and replace everywhere with SWR fetch*/
    useEffect(() => {
        async function getMatches(){
            const response = await axios.get<IMatch[]>("/api/summoner/matches?summonerName="+localStorage.getItem("summonerName")+"&region="+localStorage.getItem("region"))
            const data:IMatch[] = await response.data
            setMatches(data)
        }
        getMatches()
    }, [])

    /*Calculates the win rate of a summoner*/
    const calculateWinRate = (wins: number, loss: number) => {
        const sum = wins + loss
        const deci = wins / sum
        const winrate = deci * 100

        return Math.round(winrate)
    }

    /*Gets the most frequent role played by a summoner (needs fix)*/
    const getMostFrequent = (arr: string[]) => {

    }

    /*Gets the most played champion played by a summoner (not done)*/
    const getMostPlayeChamps = () => {
        let champArray: string[] = []
        for(let i = 0; i < matches.length; i++){
            champArray.push(getSummerParticipantFromMatch(matches[i])?.championName as string)
        }

        return champArray
    }

    /*Calculates a summoners favorite position by reason matches*/
    const calculateFavoritePosition = () => {
        let positionArray: string[] = []
        for(let i = 0; i < matches.length; i++){
            positionArray.push(getSummerParticipantFromMatch(matches[i])?.individualPosition as string)
        }

        const hashmap = positionArray.reduce( (acc: any, val : any) => {
            acc[val] = (acc[val] || 0 ) + 1
            return acc
        },{})
        return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
    }

    /*Identifies the summoner in all matches*/
    const getSummerParticipantFromMatch = (match: IMatch) => {
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

    /*Gets the total kills by the summoners team*/
    const getTeamKillsRecentGames = () => {
        let number1: number = 0
        let number2: number = 0

        for(let i = 0; i < matches.length; i++){
            for(let j = 0; j < matches[i].info.teams.length; j++)
            {
                if (matches[i].info.teams[j].teamId == getSummerParticipantFromMatch(matches[i])?.teamId) {
                    number1 = matches[i].info.teams[j].objectives.champion.kills
                    number2 = number2 + number1
                }
            }
        }

        return number2
    }

    /*Calculates the average kills in all recent games*/
    const calculateAverageKillsRecentGames = () => {
        let totalKills: number = 0
        let numberOfmatches: number = 0
        for(let i = 0; i < matches.length; i++){
            const kills =  getSummerParticipantFromMatch(matches[i])?.kills
            if(kills != undefined) {
                totalKills = totalKills + kills
                numberOfmatches = numberOfmatches + 1
            }
        }
        const averageKills =  totalKills / numberOfmatches
        return parseFloat(String(averageKills)).toFixed(1)
    }

    /*Calculates the average assists in all recent games*/
    const calculateAverageAssistsRecentGames = () => {
        let totalAssists: number = 0
        let numberOfmatches: number = 0
        for(let i = 0; i < matches.length; i++){
            const assists =  getSummerParticipantFromMatch(matches[i])?.assists
            if(assists != undefined) {
                totalAssists = totalAssists + assists
                numberOfmatches = numberOfmatches + 1
            }
        }
        const averageAssists =  totalAssists / numberOfmatches
        return parseFloat(String(averageAssists)).toFixed(1)
    }

    /*Calculates the average deaths in all recent games*/
    const calculateAverageDeathsRecentGames = () => {
        let totalDeaths: number = 0
        let numberOfmatches: number = 0
        for(let i = 0; i < matches.length; i++){
            const deaths =  getSummerParticipantFromMatch(matches[i])?.deaths
            if(deaths != undefined) {
                totalDeaths = totalDeaths + deaths
                numberOfmatches = numberOfmatches + 1
            }
        }
        const averageDeaths =  totalDeaths / numberOfmatches
        return parseFloat(String(averageDeaths)).toFixed(1)
    }

    /*Calculates summoners kill participation in all recent games*/
    const calculateKillPerticipationRecentGames = () => {
        const teamKill = getTeamKillsRecentGames()
        let number1: number = 0
        let number2: number = 0
        let number3: number = 0

        for(let i = 0; i < matches.length; i++){
            const personalKills = getSummerParticipantFromMatch(matches[i])?.kills
            const personalAssits = getSummerParticipantFromMatch(matches[i])?.assists

            if(teamKill != undefined && personalKills != undefined && personalAssits != undefined){
                const sum = personalKills + personalAssits
                number1 = sum;
                number2 = number2 + sum
            }
        }

        const kp = (number2 / teamKill) * 100
        return Math.round(kp)
    }

    /*Calculates summoners kda in all recent games*/
    const calculateKDARecentGames = () => {
        let number1: number = 0
        let number2: number = 0
        let number3: number = 0
        for(let i = 0; i < matches.length; i++)
        {
          const kills = getSummerParticipantFromMatch(matches[i])?.kills
          const deaths = getSummerParticipantFromMatch(matches[i])?.deaths
          const assists = getSummerParticipantFromMatch(matches[i])?.assists

          if(kills != undefined && deaths != undefined && assists != undefined) {
              const KDA: number = (kills + assists) / deaths
              const temp = KDA

              number1 = temp
              number2 = number2 + temp
              number3 = number3 + 1
          }
          else{
              console.log("undefined")
          }
        }

        number2 = number2 / number3
        return parseFloat(String(number2)).toFixed(2)
    }

    /*get wins for all recent games*/
    const getWinsRecentGames = () => {
        let wins: number = 0

        for(let i = 0; i < matches.length; i++){
            for(let j = 0; j < matches[i].info.participants.length; j++) {
                if (matches[i].info.participants[j]?.puuid != undefined) {
                    if (matches[i].info.participants[j].puuid == summoner?.puuid) {
                        if (matches[i].info.participants[j].win) {
                            wins = wins + 1
                        }
                    }
                }
            }
        }

        return wins
    }

    /*get losses for all recent games*/
    const getLossesRecentGames = () => {
        let losses: number = 0

        for(let i = 0; i < matches.length; i++){
            for(let j = 0; j < matches[i].info.participants.length; j++) {
                if (matches[i].info.participants[j]?.puuid != undefined) {
                    if (matches[i].info.participants[j].puuid == summoner?.puuid) {
                        if (!matches[i].info.participants[j].win) {
                            losses = losses + 1
                        }
                    }
                }
            }
        }
        return losses
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
                                    <Image className={"rounded-3xl"} src={icon} width={100} height={100}/>
                                    <div className={"relative -mt-5 text-center text-white"}>
                                        <span className={"inline-block bg-summoner-dark leading-5 rounded-lg px-2 text-xs"}>{summoner.summonerLevel}</span>
                                    </div>
                                </div>
                                <div className={"ml-3"}>
                                    <p className={"text-white text-2xl font-bold"}>{summoner.name}</p>
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
                                                <Image src={`/ranked-emblems/Emblem_gold.png`} width={60} height={60}/>
                                            </div>
                                            <div className={"flex flex-col ml-2"}>
                                                <p className={"text-md font-bold"}>mangler</p>
                                                <p className={"text-xs text-summoner-gray"}>mangler LP</p>
                                            </div>
                                        </div>
                                        <div className={"flex w-full justify-end items-center mr-2"}>
                                            <div className={"flex flex-col text-xs"}>
                                                <div className={"flex justify-end"}>
                                                    <p className={"text-md text-summoner-gray"}>mangler-W mangler-L</p>
                                                </div>
                                                <p className={"text-xs text-summoner-gray"}>Win Rate mangler%</p>
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
                                                <Image src={`/ranked-emblems/Emblem_gold.png`} width={60} height={60}/>
                                            </div>
                                            <div className={"flex flex-col ml-2"}>
                                                <p className={"text-md font-bold "}>mangler</p>
                                                <p className={"text-xs text-summoner-gray"}>mangler LP</p>
                                            </div>
                                        </div>
                                        <div className={"flex w-full justify-end items-center mr-2"}>
                                            <div className={"flex flex-col text-xs"}>
                                                <div className={"flex justify-end"}>
                                                    <p className={"text-md text-summoner-gray"}>manglerW manglerL</p>
                                                </div>
                                                <p className={"text-xs text-summoner-gray"}>Win Rate mangler%</p>
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
                                        <p className={"text-sm ml-2"}>Match History Stats</p>
                                    </div>
                                    <div>
                                        {data ? (
                                        <div className={"flex flex-row gap-4"}>
                                            <div className={"flex flex-col items-center justify-end h-full w-32 text-xs text-summoner-gray mt-3"}>
                                                <div className={"text-left w-full ml-10"}>
                                                    20G {getWinsRecentGames()}W {getLossesRecentGames()}L
                                                </div>
                                                <div className={"mt-2"}>
                                                    <div className={"relative text-center"}>
                                                        <DoughnutChart wins={getWinsRecentGames()} losses={getLossesRecentGames()}/>
                                                        <div className={"absolute top-10 left-9 text-sm text-win-border"}>
                                                            {calculateWinRate(getWinsRecentGames(),getLossesRecentGames())}%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"flex flex-col items-left justify-end mb-3"}>
                                                <div className={"flex text-summoner-gray text-xs"}>
                                                    {calculateAverageKillsRecentGames()}
                                                    /
                                                    <span className={"text-loss-border"}>{calculateAverageDeathsRecentGames()}</span>
                                                    / {calculateAverageAssistsRecentGames()}
                                                </div>
                                                <div className={"flex text-xl font-bold"}>
                                                    {calculateKDARecentGames()}:1
                                                </div>
                                                <div className={"flex text-xs text-loss-border"}>
                                                    P/Kill {calculateKillPerticipationRecentGames()}%
                                                </div>
                                            </div>
                                            <div className={"block w-56 ml-10 mt-3"}>
                                                <div className={"text-summoner-gray text-xs leading-4 block"}>
                                                    Recent 20 Games Played Champion
                                                </div>
                                                <ul className={"flex flex-col justify-center h-20 mt-5 h-20"}>
                                                    <li className={"flex items-center"}>
                                                        <img className={"w-6 h-6 rounded-full mr-2"} src="http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/Aatrox.png" alt=""/>
                                                        <div className={"text-summoner-gray text-xs"}>
                                                            58% (7W 7L)
                                                        </div>
                                                        <div className={"inline-block text-xs m-2"}>
                                                            3.07 KDA
                                                        </div>
                                                    </li>
                                                    <li className={"flex items-center"}>
                                                        <img className={"w-6 h-6 rounded-full mr-2"} src="http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/Aatrox.png" alt=""/>
                                                        <div className={"text-summoner-gray text-xs"}>
                                                            58% (7W 7L)
                                                        </div>
                                                        <div className={"inline-block text-xs m-2"}>
                                                            3.07 KDA
                                                        </div>
                                                    </li>
                                                    <li className={"flex items-center"}>
                                                        <img className={"w-6 h-6 rounded-full mr-2"} src="http://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/Aatrox.png" alt=""/>
                                                        <div className={"text-summoner-gray text-xs"}>
                                                            58% (7W 7L)
                                                        </div>
                                                        <div className={"inline-block text-xs m-2"}>
                                                            3.07 KDA
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className={"mt-3 ml-10"}>
                                                <div className={"text-summoner-gray text-xs leading-4 block"}>
                                                    Preferred Position
                                                </div>
                                                <div>
                                                    hej
                                                </div>
                                            </div>
                                        </div>
                                        ): <div></div>}
                                    </div>
                                </div>
                                <div className={"flex flex-col mb-10"}>
                                    {data ? (
                                        data.map((match) => (
                                            <Match key={match.info.gameId} match={match} summoner={summoner}/>
                                        ))
                                    ) : error ? (<div className={"w-full flex items-center justify-center h-14 text-white font-bold text-xl"}>Something went wrong</div>) : (
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
                )}
            </div>
        </>
    )
}

export default Account