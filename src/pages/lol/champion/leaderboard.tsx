import Image from "next/image";
import {useEffect, useState} from "react";
import {League, Entry} from "../../../utils/@types/league.t";
import {motion} from "framer-motion";
import Modal from "../../../components/Modal";
import axios from "axios";
import useSWR from "swr";
import {ISummoner} from "reksai/src/@types/summoner";
import summonerName from "../../../legacy/[summonerName]";
import Link from "next/link";

const Leaderboard = () => {
    const regions: Map<string, string> = new Map([
        ["Europa West", "euw1"],
        ["Europe Nordic & East", "eun1"],
        ["North America", "NA1"],
        ["Oceania", "OC1"],
        ["Japan", "JP1"],
        ["Russia", "RU"],
        ["LAS", "LA1"],
        ["LAN", "LA2"],
        ["Brazil", "BR1"],
        ["Korea", "KR"],
        ["Türkiye", "TR1"],
    ])
    const [isOpen, setIsOpen] = useState(false)
    const [region, setRegion] = useState("Europa West")
    const [gameMode, setGameMode] = useState("RANKED_SOLO_5x5")
    const [page, setPage] = useState(1)
    const [summoners, setSummoners] = useState<ISummoner[]>([])
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    const { data: ladder } = useSWR<League>("/api/lol/leaderboard?gameMode="+gameMode+"&region="+regions.get(region), fetcher)
    const { data: version } = useSWR("/api/lol/versions", fetcher)
    const icon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/1665.png`

    useEffect(() => {
        if(ladder == undefined)return
        ladder.entries.sort((a,b)=> b.leaguePoints - a.leaguePoints)
    })

    useEffect(() => {
        async function getSummoners() {
            if (ladder == undefined) return
            let summoners: ISummoner[] = []
            for (let i = 0; i < ladder?.entries.length; i++) {
                const response = await axios.get<ISummoner>("/api/lol/summoners?summonerId=" + ladder.entries[i].summonerId + "&region=" + regions.get(region))
                summoners.push(response.data)
            }
            setSummoners(summoners)
        }
        getSummoners()
    },[region])


    const getIcon = (summonerId: string) => {
        for(let i = 0; i < summoners.length; i++){
            if(summoners[i].id == summonerId){
                return summoners[i].profileIconId
            }
        }
    }


    const calculateWinRate = (wins: any, loss: any) => {
        const sum = wins + loss
        const deci = wins / sum
        const winrate = deci * 100

        return Math.round(winrate)
    }

    const calculateRange = (data: League | undefined, rowsPerPage: any) => {
        if(data == undefined) return
        const range: number[] = []
        const num = Math.ceil(data.entries.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }

        return range;
    }

    const sliceData = (data: League | undefined, page: any, rowsPerPage: any) => {
        if(data == undefined) return
        return data.entries.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    }

    const useTable = (data: League | undefined, page: any, rowsPerPage: any) => {
        const [tableRange, setTableRange] = useState<any>([]);
        const [slice, setSlice] = useState<Entry[]>([]);

        useEffect(() => {
            const range: number[] | undefined = calculateRange(data, rowsPerPage);
            if(range == undefined) return
            setTableRange([...range]);

            const slice: Entry[] | undefined = sliceData(data, page, rowsPerPage);
            if(slice == undefined) return;
            setSlice([...slice]);
        }, [data, setTableRange, page, setSlice]);

        return { slice, range: tableRange };
    };

    const {slice, range} : {slice: Entry[], range:any} = useTable(ladder, page, 100)



    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(1);
        }
    }, [slice, page, setPage]);

    const nextPage = () => {
        setPage(page + 1)
        window.scrollTo({top: 0, left: 0});
    }

    const specificPage = (numb : number) => {
        setPage(numb)
        window.scrollTo({top:0, left: 0})
    }

    const previousPage = () => {
        if(page === 1){
            setPage(3)
            window.scrollTo({top:0, left: 0})
        }
        else{
            setPage(page - 1)
            window.scrollTo({top:0, left: 0})
        }
    }

    return(
        <>
            <div className={"flex flex-col divide-black divide-y"}>
                <div className={"bg-summoner-light w-full h-16 flex items-center"}>
                    <h1 className={"text-white text-2xl font-bold ml-40"}>Leaderboards</h1>
                </div>
                <div className={"bg-summoner-light w-full h-12"}>

                </div>
            </div>
            <div className={"container mx-auto px-20 mt-10"}>
                <div className={"flex justify-between text-xs text-summoner-gray"}>
                    <div>
                        There are currently {ladder?.entries.length} challengers summoners on Summoner&apos;s Rift
                    </div>
                    <div>
                        Displaying summoners that are in the challenger. Rankings are updated periodically.
                    </div>
                </div>
                <div className={"w-full h-auto mt-4"}>
                    <div className={"w-full h-12 rounded bg-summoner-light flex justify-between items-center"}>
                        <button onClick={() => setIsOpen(true)} className={"flex flex-row text-summoner-gray ml-2 border rounded text-sm w-auto justify-center h-10 items-center border-summoner-dark"}>
                            <span>{region}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                        <div className={"bg-summoner-dark rounded w-60 mr-2 h-9 flex justify-between items-center"}>
                            <input className={"bg-summoner-dark indent-3 ml-1 text-xs text-white w-48 h-9 rounded"} type="text" placeholder={"Summoner Name"}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 text-summoner-gray">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                            </svg>
                        </div>
                    </div>
                    <div className={"w-full h-auto mt-2"}>
                        <table className={"border-collapse border-spacing-0"}>
                            <colgroup className={"display: table-caption;"}>
                                <col width={"40"}/>
                                <col width="560"/>
                                <col width="110"/>
                                <col width="60"/>
                                <col width="130"/>
                                <col width="50"/>
                                <col width="172"/>
                            </colgroup>
                            <thead className={"table-header-group align-middle border-inherit"}>
                                <tr className={"table-row border-inherit"}>
                                    <th className={"relative h-8 select-none bg-summoner-dark text-summoner-gray text-xs leading-4 border-b-2 border-solid border-summoner-dark box-border pl-3 rounded-t"} align="left" scope="col">#</th>
                                    <th className={"relative h-8 select-none bg-summoner-dark text-summoner-gray text-xs leading-4 border-b-2 border-solid border-summoner-dark box-border"} align="left" scope="col">Summoners</th>
                                    <th className={"relative h-8 select-none bg-summoner-dark text-summoner-gray text-xs leading-4 border-b-2 border-solid border-summoner-dark box-border"} align="left" scope="col">Tier</th>
                                    <th className={"relative h-8 select-none bg-summoner-dark text-summoner-gray text-xs leading-4 border-b-2 border-solid border-summoner-dark box-border"} align="left" scope="col">LP</th>
                                    <th className={"relative h-8 select-none bg-summoner-dark text-summoner-gray text-xs leading-4 border-b-2 border-solid border-summoner-dark box-border"} align="left" scope="col">Most champions</th>
                                    <th className={"relative h-8 select-none bg-summoner-dark text-summoner-gray text-xs leading-4 border-b-2 border-solid border-summoner-dark box-border"} align="left" scope="col">Level</th>
                                    <th className={"relative h-8 select-none bg-summoner-dark text-summoner-gray text-xs leading-4 border-b-2 border-solid border-summoner-dark box-border rounded-t"} align="left" scope="col">Win Ratio</th>
                                </tr>
                            </thead>
                            <tbody className={"table-row-group align-middle border-inherit"}>
                                {slice.map((el, index) => (
                                    <tr className={"table-row border-inherit text-xs text-summoner-gray"} key={el.summonerId}>
                                        <td className={"border-b-2 border-solid border-summoner-dark bg-summoner-light pl-3"}>
                                                {page === 1 ? index+1 : page === 2 ? index + 1 + 100 : page === 3 ? index+1 + 200 : ""}
                                        </td>
                                        <td className={"border-b-2 border-solid border-summoner-dark bg-summoner-light box-border font-normal align-middle p-1"}>
                                            <Link href={"/lol/"+el.summonerName+"?region="+regions.get(region)}>
                                                <div className={"flex items-center cursor-pointer"}>
                                                    <Image className={"rounded-full"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${getIcon(el.summonerId)}.png`} height={30} width={30}/>
                                                    <strong className={"pl-2 flex-1 box-border text-white text-xs"}>
                                                        {el.summonerName}
                                                    </strong>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className={"border-b-2 border-solid border-summoner-dark bg-summoner-light"}>
                                            Challenger
                                        </td>
                                        <td className={"border-b-2 border-solid border-summoner-dark bg-summoner-light"}>
                                            {el.leaguePoints}
                                            LP
                                        </td>
                                        <td className={"border-b-2 border-solid border-summoner-dark bg-summoner-light"}>
                                            <a className={"align-middle inline-block cursor-pointer p-1"} href="">
                                                <div className={"relative block"}>
                                                    <Image className={"rounded-full"} src={icon} loader={() => icon} height={30} width={30}/>
                                                </div>
                                            </a>
                                            <a className={"align-middle inline-block p-1"} href="">
                                                <div className={"relative block cursor-pointer"}>
                                                    <Image className={"rounded-full"} src={icon} loader={() => icon} height={30} width={30}/>
                                                </div>
                                            </a>
                                            <a className={"align-middle inline-block cursor-pointer"} href="">
                                                <div className={"relative block"}>
                                                    <Image className={"rounded-full"} src={icon} loader={() => icon} height={30} width={30}/>
                                                </div>
                                            </a>
                                        </td>
                                        <td className={"border-b-2 border-solid border-summoner-dark bg-summoner-light"}>
                                            100
                                        </td>
                                        <td className={"border-b-2 border-solid border-summoner-dark bg-summoner-light"}>
                                            <div className={""}>
                                                <div>
                                                    {calculateWinRate(el.wins,el.losses)}%
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={"bg-summoner-light w-full h-24 rounded-b text-center text-summoner-gray text-xs overflow-hidden"}>
                            <p className={"mb-6 mt-5"}>
                                #{page === 1 ? 1: page === 2 ? 101: page === 3 ? 201: "x"} ~#{page === 1 ? 100 : page === 2 ? 200 : page === 3 ? 300: "x"}/Total {ladder?.entries.length} Summoners
                            </p>
                            <div className={"flex justify-between"}>
                                <motion.div whileHover={{scale: 1.1}} onClick={previousPage} className={"box-border block w-7 h-7 bg-summoner-dark leading-7 rounded ml-3 cursor-pointer"}>
                                    <Image src={"/lol/icon-arrow-left.svg"} width={20} height={28}/>
                                </motion.div>
                                <div className={"flex justify-between space-x-1"}>
                                    <div onClick={() => specificPage(1)} className={"box-border block w-7 h-7 leading-7 rounded border border-solid font-bold text-center cursor-pointer " + (page === 1 ? "bg-summoner-light text-white border-black" : "bg-summoner-dark border-summoner-light text-summoner-gray")}>
                                        1
                                    </div>
                                    <div onClick={() => specificPage(2)} className={"box-border block w-7 h-7 leading-7 rounded border border-solid font-bold text-center cursor-pointer " + (page === 2 ? "bg-summoner-light text-white border-black" : "bg-summoner-dark border-summoner-light text-summoner-gray")}>
                                        2
                                    </div>
                                    <div onClick={() => specificPage(3)} className={"box-border block w-7 h-7 leading-7 rounded border border-solid font-bold text-center cursor-pointer " + (page === 3 ? "bg-summoner-light text-white border-black" : "bg-summoner-dark border-summoner-light text-summoner-gray")}>
                                        3
                                    </div>
                                </div>
                                <motion.div whileHover={{scale: 1.1}} onClick={nextPage} className={"box-border block w-7 h-7 bg-summoner-dark leading-7 rounded mr-3 cursor-pointer"}>
                                    <Image src={"/lol/icon-arrow-right.svg"} width={20} height={28}/>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"mt-20"}>

                </div>
                <Modal isOpen={isOpen} setIsOpen={setIsOpen} region={region} setRegion={setRegion}/>
            </div>
        </>
    )
}

export default Leaderboard