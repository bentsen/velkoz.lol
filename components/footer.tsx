import {useEffect, useState} from "react";
import { useRouter } from 'next/router'

const Footer = () => {
    const router = useRouter()
    /*Usestate for game that is chosen on navbar*/
    const [game, setGame] = useState(router.pathname)

    useEffect(() => {
        let pathname = router.pathname.split("/")
        setGame("/"+pathname[1]);
    }, [router.pathname]);

    return (
        <>
            <footer className="p-4 rounded-lg shadow md:px-6 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
                        <div className={"rounded-full h-10 w-10 text-white text-xs flex items-center justify-center " + (game == "/lol" ? "bg-leagueoflegends-color" : game == "/valorant" ? "bg-valorant-color" : game == "/tft" ? "bg-tft-color" : game == "lor" ? "bg-lor-color" : "bg-summoner-dark")}>
                            ss.gg
                        </div>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-2">Summoner Searcher</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"/>
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a
                    href="https://flowbite.com/" className="hover:underline">summoner searcher™</a>. All Rights Reserved.
                </span>
            </footer>
        </>
    )
}

export default Footer