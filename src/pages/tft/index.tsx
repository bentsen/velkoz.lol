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

    const [region, setRegion] = useState("Europa West")
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


    const handleChange = (e: any) => {
        setSummonerName(e.target.value)
    }

    return (
        <>
            <div className={"bg-[url('/tft/poster.jpeg')] h-[550px] w-full bg-cover overflow-hidden rounded-bl-[100px]"}>
                <div className={"flex flex-col justify-center items-center mt-20 space-y-10"}>
                    <div>
                        <Image src={"/tft/logo.svg"} width={400} height={200}/>
                    </div>
                    <div className={"flex flex-row bg-summoner-light w-2/5 h-14 rounded-3xl items-center"}>
                        <div>
                            <div onClick={() => setIsOpen(true)} className={"text-sm ml-4 w-44 text-white cursor-pointer"}>
                                <p>Region</p>
                                <div className={"flex flex-row text-summoner-gray"}>
                                    <span>{region}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className={"ml-2"}>
                            |
                        </div>
                        <div className={"ml-4 text-sm text-white"}>
                            <p>Search</p>
                            <input onChange={handleChange} className={"w-72 h-7 bg-summoner-light text-summoner-gray"} type="text" placeholder={"Summoner Name"}/>
                        </div>
                    </div>
                    <Link href={"/tft/" + summonerName + "?region="+regions.get(region)}>
                        <motion.button whileHover={{scale: 1.1}} className={"bg-tft-color text-white w-32 h-10 rounded"}>Search</motion.button>
                    </Link>
                </div>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} region={region} setRegion={setRegion}/>
        </>
    )
}

export default Tft