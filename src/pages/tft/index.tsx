import Image from "next/image";
import {NextPage} from "next";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {ISummoner} from "reksai/src/@types/summoner";
import axios from "axios";
import useSWR from "swr";

const Tft: NextPage = () => {
    const fetcher = async (url: any) => await axios.get(url).then((res) => res.data)
    const { data: version } = useSWR("/api/lol/versions", fetcher)
    const [search, setSearch] = useState("");
    const [summoners, setSummoners] = useState<ISummoner[]>([]);
    const divRef = useRef<any>();
    const [inputActive, setInputActive] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [region, setRegion] = useState("EUW")
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


    const inputDelete = () => {
        setSearch('')
    }

    const handleRegion = (regionValue: string) => {
        setRegion(regionValue)
        setDropdown(!dropdown)
    }

    const filteredSummoners = !search
        ? null
        : summoners.filter((s) => s.name.toLowerCase().startsWith(search.toLowerCase()));

    return (
        <>
            <div className={"block w-full my-0 mx-auto"}>
                <div className={"h-[600px] w-full bg-gradient-to-r from-gray-700 via-gray-900 to-black"}>
                    <div className={"bg-[url('/tft/main_bg_pc.jpeg')] h-[550px] w-full bg-cover overflow-hidden rounded-bl-[100px]"}>
                        <div className={"flex flex-col w-full h-full items-center mt-10"}>
                            <Image src={"/tft/logo.svg"} width={400} height={200}/>
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
                                    <input onBlur={() => setInputActive(false)} onFocus={() => setInputActive(true)} className={"ml-2 w-[350px] font-medium rounded-r"} type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder={"Search Summoner"}/>
                                    <svg onClick={inputDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                         stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </div>
                            </div>
                            {inputActive ? (
                                <div className={"bg-tft-dropdown-color w-[495px] h-auto mt-1 rounded"}>
                                    <p className={"ml-3 text-summoner-gray"}>Summoners</p>
                                    {filteredSummoners != null ? (
                                    filteredSummoners.length === 0 ? (
                                    <ul className={"text-white"}>
                                        <li className={"hover:bg-button-color p-3 cursor-pointer"}>
                                            <div>
                                                {search}
                                            </div>
                                        </li>
                                    </ul>
                                    ) : (
                                        filteredSummoners.map((s) => (
                                            <ul key={s.puuid} className={"text-white"}>
                                                <Link href={`/tft/${s.name}?region=${regions.get(region)}`}>
                                                    <li className={"hover:bg-button-color p-3 cursor-pointer"}>
                                                        <div className={"flex items-center"}>
                                                            <Image loading={"eager"} priority={true} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${s.profileIconId}.png`} width={20} height={20}/>
                                                            <span className={"ml-1"}>{s.name}</span>
                                                        </div>
                                                    </li>
                                                </Link>
                                            </ul>
                                        ))
                                    )
                                    ):""}
                                </div>
                            ): ""}
                            {dropdown ? (
                                <div className={"flex w-[495px]"}>
                                    <div className={"bg-tft-color mt-0.5 rounded w-52 h-auto text-white"}>
                                        <ul className={"flex flex-col list-none"}>
                                            <li onClick={() => handleRegion("EUW")} className={"hover:bg-button-color p-3 cursor-pointer"}>
                                                <div>
                                                    Europa West
                                                </div>
                                            </li>
                                            <li onClick={() => handleRegion("EUN")} className={"hover:bg-button-color p-3 cursor-pointer"}>
                                                <div>
                                                    Europe Nordic & East
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ): ""}
                        </div>
                    </div>
                </div>
                <div className={"w-full h-30 text-white"}>
                    
                </div>
            </div>
        </>
    )
}

export default Tft