import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";

/*
* Name: Mikkel Bentsen
* Date: 14/9-2022
*/

const Navbar = () => {
    /*Usestate for game that is chosen on navbar*/
    const [game, setGame] = useState("")

    /*UseEffect that sets game-useState as localStorage*/
    useEffect(()  => {
        const tempgame = localStorage.getItem("game") as string
        if(tempgame){
            setGame(tempgame)
        }
    }, [])

    /*Setes localStorage to valorant*/
    const valorant = () => {
        setGame("valorant")
        localStorage.setItem("game", "valorant")
    }

    /*Sets localStorage to league of legends*/
    const leagueoflegends = () => {
        setGame("lol")
        localStorage.setItem("game", "lol")
    }

    /*Sets localStorage to teamfight tactics*/
    const tft = () => {
        setGame("tft")
        localStorage.setItem("game", "tft")
    }

    /*Sets localStorage to leagends of runterrea*/
    const lor = () => {
        setGame("lor")
        localStorage.setItem("game","lor")
    }

    /*Sets localStorage to none*/
    const home = () => {
        setGame("")
        localStorage.setItem("game","")
    }

    return (
        <>
            <nav className={" h-10 shadow-lg"}>
                <div className={"flex flex-row"}>
                    <div className={"h-10 " + (game === "valorant" ? 'bg-valorant-color w-52' : game === "lol" ? 'w-72 bg-leagueoflegends-color' : game === "tft" ? 'bg-tft-color w-64' : game === "lor" ? 'w-72 bg-lor-color' :"w-20 bg-default-color")}>
                        <div className="container mx-auto">
                            <div className="flex justify-between items-center ml-2 h-10">
                                <div className={"flex cursor-pointer items-center text-white text-lg font-bold"}>
                                    <div className={"flex"}>
                                        <Link href={"/"}>
                                            <h1 onClick={home}>SS.gg</h1>
                                        </Link>
                                        {game === "valorant" ?
                                        <div className={"flex items-center cursor-pointer ml-3"}>
                                            <Image src={"/game-icons/valorant.svg"} width={30} height={20}/>
                                            <p className={"text-xs"}>Valorant</p>
                                        </div>
                                        :
                                        game === "lol" ?
                                        <div className={"flex items-center cursor-pointer ml-3"}>
                                            <Image src={"/game-icons/leagueoflegends.svg"} width={30} height={20}/>
                                            <p className={"text-xs"}>League of Legends</p>
                                        </div>
                                        :
                                        game === "tft" ?
                                        <div className={"flex items-center cursor-pointer ml-3"}>
                                            <Image src={"/game-icons/teamfighttactics.png"} width={20} height={20}/>
                                            <p className={"text-xs"}>Teamfight Tactics</p>
                                        </div>
                                        :
                                        game === "lor" ?
                                        <div className={"flex items-center cursor-pointer ml-3"}>
                                            <Image src={"/game-icons/legendsofrunterra.png"} width={30} height={20}/>
                                            <p className={"text-xs"}>Legends of Runterra</p>
                                        </div>
                                        :""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"h-10 w-full bg-navbar-color items-center"}>
                        <div className="items-center md:flex hidden h-10 ml-4">
                            <ul className="space-x-5 text-2xl text-white">
                                {game !== "valorant" ? (
                                <li className="li sm:inline-block">
                                    <Link href={"/valorant"}>
                                        <div onClick={valorant} className={"flex items-center cursor-pointer hover:bg-game-hover rounded h-8 w-24"}>
                                            <Image src={"/game-icons/valorant.svg"} width={30} height={20}/>
                                            <p className={"text-xs"}>Valorant</p>
                                        </div>
                                    </Link>
                                </li>
                                ):""}
                                {game !== "lol" ? (
                                <li className="li sm:inline-block">
                                    <Link href={"/lol"}>
                                        <div onClick={leagueoflegends} className={"flex items-center cursor-pointer hover:bg-game-hover rounded h-8 w-36"}>
                                            <Image src={"/game-icons/leagueoflegends.svg"} width={30} height={20}/>
                                            <p className={"text-xs"}>League of Legends</p>
                                        </div>
                                    </Link>
                                </li>
                                ):""}
                                {game !== "tft" ? (
                                <li className="li sm:inline-block">
                                    <Link href={"/tft"}>
                                        <div onClick={tft} className={"flex items-center cursor-pointer hover:bg-game-hover rounded h-8 w-32"}>
                                            <Image src={"/game-icons/teamfighttactics.png"} width={20} height={20}/>
                                            <p className={"text-xs"}>Teamfight Tactics</p>
                                        </div>
                                    </Link>
                                </li>
                                ):""}
                                {game !== "lor" ? (
                                <li className="li sm:inline-block">
                                    <Link href={"/lor"}>
                                        <div onClick={lor} className={"flex items-center cursor-pointer hover:bg-game-hover rounded h-8 w-36"}>
                                            <Image src={"/game-icons/legendsofrunterra.png"} width={25} height={20}/>
                                            <p className={"text-xs"}>Legends of Runterra</p>
                                        </div>
                                    </Link>
                                </li>
                                ):""}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className={"h-12 items-center " + (game === "valorant" ? 'bg-valorant-color' : game === "lol" ? 'bg-leagueoflegends-color' : game === "tft" ? 'bg-tft-color' : game === "lor" ? 'bg-lor-color':"bg-default-color")}>
                <div className="items-center md:flex h-12 hidden ml-40">
                    {game === "lol" ?
                    <ul className={"space-x-5 text-gray-300"}>
                        <Link href={"/"+game}>
                            <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Home</li>
                        </Link>
                        <Link href={"/lol/champions"}>
                            <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 cursor-pointer"}>Champions</li>
                        </Link>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 cursor-pointer"}>Game Mode</li>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 cursor-pointer"}>Stats</li>
                        <Link href={"/lol/leaderboard"}>
                            <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 cursor-pointer"}>Leaderboard</li>
                        </Link>
                    </ul>
                    :
                    game === "valorant" ?
                    <ul className={"space-x-5 text-gray-300"}>
                        <Link href={"/"+game}>
                            <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Home</li>
                        </Link>
                        <Link href={"/valorant/agents"}>
                            <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Agents</li>
                        </Link>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Game Mode</li>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Stats</li>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Leaderboard</li>
                    </ul>
                    :
                    game === "tft" ?
                    <ul className={"space-x-5 text-gray-300"}>
                        <Link href={"/"+game}>
                            <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Home</li>
                        </Link>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Champions</li>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Game Mode</li>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Stats</li>
                        <Link href={"/tft/leaderboard"}>
                            <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Leaderboard</li>
                        </Link>
                    </ul>
                    :
                    game === "lor" ?
                    <ul className={"space-x-5 text-gray-300"}>
                        <Link href={"/"+game}>
                            <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Home</li>
                        </Link>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Cards</li>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Game Mode</li>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Stats</li>
                        <li className={"li sm:inline-block hover:text-white hover:border-b-4 hover:border-white h-9 mt-3 cursor-pointer"}>Leaderboard</li>
                    </ul>
                    :""}
                </div>
            </nav>
        </>
    )
}

export default Navbar