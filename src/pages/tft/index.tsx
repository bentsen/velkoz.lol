import Image from "next/image";
import {NextPage} from "next";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {ISummoner} from "reksai/src/@types/summoner";
import axios from "axios";
import useSWR from "swr";
import {Entry} from "../../utils/@types/league.t";

interface customLeague {
    entry: Entry,
    region: string
}

const Tft: NextPage = () => {
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    const { data: version } = useSWR("/api/lol/versions", fetcher)
    const { data: league } = useSWR<customLeague[]>("/api/tft/league/topPlayers", fetcher)
    const [topSummoners, setTopSummoners] = useState<ISummoner[]>([]);

    useEffect(() => {
        async function getTopSummoners(){
            if(league == undefined) return
            let topSummonersTemp: ISummoner[] = []
            for(let i = 0; i < league?.length; i++){
                const response = await axios.get<ISummoner>(`/api/tft/summoners/by-summonerId/${league[i].entry.summonerId}?region=${league[i].region}`)
                topSummonersTemp.push(response.data)
            }
            setTopSummoners(topSummonersTemp)
        }
        getTopSummoners()
    },[league])

    const getIcon = (summonerId: string) => {
        for(let i = 0; i < topSummoners.length; i++){
            if(topSummoners[i].id == summonerId){
                return topSummoners[i].profileIconId
            }
        }
    }

    const calculateWinRate = (wins: number, loss: number) => {
        const sum = wins + loss
        const deci = wins / sum
        const winrate = deci * 100

        return Math.round(winrate)
    }

    return (
        <>
            <div className={"sm:block flex flex-col w-[1080px] sm:w-full overflow-hidden sm:overflow-auto"}>
                <div className={"h-[600px] w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black"}>
                    <div className={"bg-[url('/tft/main_bg.png')] h-[550px] w-full bg-cover overflow-hidden rounded-bl-[100px]"}>
                        <div className={"flex flex-col w-full h-full items-center mt-10"}>
                            <Image src={"/tft/logo.svg"} width={400} height={200}/>
                            <SearchBar version={version}/>
                        </div>
                    </div>
                </div>
                <div className={"block w-auto my-0 mx-auto"}>
                    <div className={"flex items-center mt-20 text-white justify-center"}>
                        <h1 className={"text-2xl font-bold font-heading"}>View Top Players</h1>
                        <hr className={"w-1/2 bg-white ml-2 bg-gray-600 border-none h-0.5"}/>
                    </div>
                    <div className={"flex flex-col md:flex-row items-center md:justify-center gap-5 h-auto mt-5"}>
                        {league?.map((summoner) => (
                            <div key={summoner.entry.summonerId} className={"bg-summoner-dark w-72 h-72 rounded relative cursor-pointer"}>
                                <div className={"absolute top-0 right-0 text-summoner-dark bg-tft-yellow rounded-bl-2xl font-semibold text-lg pl-2.5 pt-1 w-10 h-10 z-10"}>#1</div>
                                <div className={"flex justify-center items-center relative block h-40 w-72 overflow-hidden"}>
                                    <img className={"h-auto w-72 rounded filter hover:blur-sm hover:brightness-50 hover:scale-[1.15] transition-all duration-300"} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${getIcon(summoner.entry.summonerId)}.png`}/>
                                </div>
                                <div className={"flex flex-col pt-[1px] pr-[1.5px] pl-[1.5px] pb-[1.5px]"}>
                                    <div className={"flex justify-between p-2 text-white"}>
                                        <span>{summoner.entry.wins + summoner.entry.losses} games</span>
                                        <span>{summoner.entry.leaguePoints} LP</span>
                                        <span>{calculateWinRate(summoner.entry.wins,summoner.entry.losses)} win%</span>
                                    </div>
                                    <div className={"text-white p-2"}>
                                        <h1 className={"text-xl font-semibold inline-block"}>{summoner.entry.summonerName}</h1>
                                        <span className={"ml-2"}>- {summoner.region.replace(/\d/g,'').toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

const SearchBar = ({version} : {version: string}) => {
    const divRef = useRef<any>();
    const [search, setSearch] = useState("")
    const [summoners, setSummoners] = useState<ISummoner[]>([]);
    const [region, setRegion] = useState("EUW")
    const [dropdown, setDropdown] = useState(false)
    const regions: Map<string, string> = new Map([
        ["EUW", "euw1"],
        ["EUN", "eun1"],
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

    const changeRegion = (regionValue: string) => {
        setRegion(regionValue)
    }

    const ChangeDropdown = () => {
        setDropdown(!dropdown)
    }

    const inputDelete = () => {
        setSearch('')
    }

    useEffect(() => {
        async function getSummoners() {
            const response = await axios.get<ISummoner[]>("/api/tft/summoners/fromDB/"+regions.get(region))
            setSummoners(response.data)
        }
        getSummoners()
    })

    useEffect(() => {

        const closeDropsown = (e: any) => {
            if(dropdown && divRef.current && !divRef.current.contains(e.target)){
                setDropdown(false)
            }
        }
        document.addEventListener("click", closeDropsown)
        return () => {
            document.removeEventListener("click", closeDropsown)
        }
    },[dropdown])

    const filteredSummoners = !search
        ? null
        : summoners.filter((s) => s.name.toLowerCase().startsWith(search.toLowerCase()));

    return(
        <>
            <div className={"flex flex-row"}>
                <div ref={divRef} onClick={() => setDropdown(prev => !prev)} className={"cursor-pointer bg-tft-color w-24 rounded-l h-16"}>
                    <div className={"flex flex-col h-full justify-center ml-2"}>
                        <div className={"text-gray-500 text-sm font-semibold"}>
                            Region
                        </div>
                        <div className={"text-lg text-white -mt-2.5"}>
                            {region}
                            <div className={"inline-block ml-2 mb-1"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                     stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex items-center bg-white w-[400px] h-16 rounded-r"}>
                    <input className={"ml-2 w-[350px] font-medium rounded-r"} type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder={"Search Summoner"}/>
                    <svg onClick={inputDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
            </div>
            {search && (
                <div className={"bg-tft-dropdown-color w-[495px] max-h-56 mt-1 rounded overflow-y-scroll"}>
                    <p className={"ml-3 text-summoner-gray"}>Summoners</p>
                    {filteredSummoners != null && (
                        filteredSummoners.length === 0 ? (
                            <SearchOptions name={search} region={region} link={`/lol/summoner/${search}?region=${regions.get(region)}`}/>
                        ) : (
                            filteredSummoners.map((s) => (
                                <SearchOptions key={s.id} name={s.name} region={region} iconId={s.profileIconId} version={version} link={`/lol/summoner/${s.name}?region=${regions.get(region)}`}/>
                            ))
                        )
                    )}
                </div>
            )}
            {dropdown && (
                <>
                    <RegionOptions onRegionChange={changeRegion} onDropdownChange={ChangeDropdown}/>
                </>
            )}
        </>
    )
}

interface SearchOptions {
    region: string,
    name: string,
    iconId?: number,
    version?: string,
    link: string
}

const SearchOptions = (props: SearchOptions) => {
    const {region, name, iconId, version, link} = props;

    return(
        <>
            <ul className={"text-white"}>
                <Link href={link}>
                    <li className={"hover:bg-button-color p-3 cursor-pointer"}>
                        <div className={"flex items-center"}>
                            <Image loading={"eager"} priority={true} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`} width={20} height={20}/>
                            <span className={"ml-1"}>{name}</span>
                        </div>
                    </li>
                </Link>
            </ul>
        </>
    )
}

const RegionOptions = ({onRegionChange, onDropdownChange} : {onRegionChange: any, onDropdownChange: any}) => {

    const handleStates = (regionValue: string) => {
        onRegionChange(regionValue)
        onDropdownChange()
    }
    return(
        <>
            <div className={"flex w-[495px]"}>
                <div className={"bg-tft-color mt-0.5 rounded w-52 h-auto text-white"}>
                    <ul className={"flex flex-col list-none"}>
                        <li onClick={() => handleStates("EUW")} className={"hover:bg-button-color p-3 cursor-pointer"}>
                            <div>
                                Europa West
                            </div>
                        </li>
                        <li onClick={() => handleStates("EUN")} className={"hover:bg-button-color p-3 cursor-pointer"}>
                            <div>
                                Europe Nordic & East
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Tft