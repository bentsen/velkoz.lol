import type { NextPage } from 'next'
import Image from 'next/image'
import logo from '/public/lol/logo.webp'
import Modal from "../../components/Modal";
import {useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {Summoner} from "../../utils/types/summoner.t";
import DoughnutChart from "../../components/DoughnutChart";

const Lol: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [region, setRegion] = useState<string>("Europa West")
    const [summonerName, setSummonerName] = useState("")
    const regions: Map<string, string> = new Map([
        ["Europa West", "euw1"],
        ["Europe Nordic & East", "eun1"]
    ])

    const handleClick = () => {
        localStorage.setItem("region", regions.get(region)!)

        localStorage.setItem("summonerName", summonerName)
    }

    const handleChange = (e : any) => {
        setSummonerName(e.target.value)
    }

    return (
        <>
            <div className={"flex flex-col justify-center items-center mt-20 space-y-10"}>
                <div>
                    <Image src={logo} width={300} height={200}/>
                </div>
                <div className={"flex flex-row bg-summoner-light w-2/5 h-14 rounded-3xl items-center"}>
                    <div>
                        <div onClick={() => setIsOpen(true)} className={"text-sm ml-4 w-44 text-white cursor-pointer"}>
                            <p>Region</p>
                            <div className={"flex flex-row text-summoner-gray"}>
                                <span>{region}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clip-rule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={"ml-2"}>
                        |
                    </div>
                    <div className={"ml-4 text-sm text-white"}>
                        <p>Search</p>
                        <input onChange={handleChange} className={"w-80 h-7 bg-summoner-light text-summoner-gray"} type="text" placeholder={"Summoner Name"}/>
                    </div>
                </div>
                <Link href={"/lol/" + summonerName}>
                    <motion.button onClick={handleClick} whileHover={{scale: 1.1}} className={"bg-leagueoflegends-color text-white w-32 h-10 rounded"}>Search</motion.button>
                </Link>
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} region={region} setRegion={setRegion}/>
        </>
    )
}

export default Lol