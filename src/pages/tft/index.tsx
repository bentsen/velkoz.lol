import Image from "next/image";
import {NextPage} from "next";
import Link from "next/link";
import {motion} from "framer-motion";
import {useState} from "react";
import {Summoner} from "../../utils/types/summoner.t";
import Modal from "../../components/Modal";

const Tft: NextPage = () => {
    /*useState for state of modal*/
    const [isOpen, setIsOpen] = useState(false)
    const [enteredText, setEnteredText] = useState('');
    const [dropdown, setDropdown] = useState(false)
    const [region, setRegion] = useState("EUW")
    const [summonerName, setSummonerName] = useState("")
    const [summoner, setSummoner] = useState<Summoner[]>([])
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

    const inputDelete = () => {
        setEnteredText('')
    }


    const handleChange = (e: any) => {
        setSummonerName(e.target.value)
    }

    const handleRegion = (regionValue: string) => {
        setRegion(regionValue)
        setDropdown(!dropdown)
    }

    return (
        <>
            <div className={"bg-[url('/tft/main_bg_pc.jpeg')] h-[550px] w-full bg-cover overflow-hidden rounded-bl-[100px]"}>
                <div className={"flex flex-col w-full h-full items-center mt-10"}>
                    <Image src={"/tft/logo.svg"} width={400} height={200}/>
                    <div className={"flex flex-row"}>
                        <div onClick={() => setDropdown(!dropdown)} className={"cursor-pointer bg-tft-color w-24 rounded-l h-16"}>
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
                            <input className={"ml-2 w-[350px] font-medium rounded-r"} type="text" onChange={(e) => setEnteredText(e.target.value)} value={enteredText} placeholder={"Search Summoner"}/>
                            <svg onClick={inputDelete} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                    </div>
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
        </>
    )
}

export default Tft