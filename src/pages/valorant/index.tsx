import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {NextPage} from "next";

const Valorant: NextPage = () => {
    return (
        <>
            <div className={"bg-[url('/valorant/main_bg_pc.png')] h-screen w-full bg-cover overflow-hidden"}>
                <div className={"flex flex-col justify-center items-center mt-20 space-y-10"}>
                    <div>
                        <Image src={"/valorant/valorant.png"} width={300} height={50}/>
                    </div>
                    <div className={"bg-white flex items-center rounded h-14 w-1/2"}>
                        <input className={"w-10/12 h-10 indent-4 text-sm rounded bg-white h-14"} type="text" placeholder={"Search Player Name#Tagline"}/>
                        <div className={"w-14 rounded border border-valorant-color flex justify-center ml-10 items-center bg-gradient-to-r from-index-color via-red-600 to-index-color h-9"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 text-valorant-color">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Valorant