import Image from "next/image";
import {useState} from "react";

const Modal = ({visible, onClose, getRegion}) => {
    const [region, setRegion] = useState("Europa West")

    const handleOnClose = (e: any) => {
        if(e.target.id === "container")
        onClose()
    }

    const handleChange = (e) => {
        setRegion(e.target.value)
    }

    const handleClick = () => {
        getRegion(region)
        onClose()
    }

    if(!visible) return null;
    return (
        <>
            <div id={"container"} onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-30 backdrop-30 backdrop-blur-sm flex justify-center">
                <div className={"w-1/3 mt-5"}>
                    <div className={"bg-summoner-light flex items-center justify-center text-white text-2xl font-bold outline outline-1 h-16 outline-black"}>
                        <h1>Region & Language Setting</h1>
                    </div>
                    <div className="bg-summoner-dark p-2 h-auto flex flex-row">
                        <div className={"bg-blue flex items-center ml-5"}>
                            <div className={"flex flex-row text-summoner-gray"}>
                                <div>
                                    <h1>Region</h1>
                                    <div className={"grid grid-cols-3 gap-4 mt-1"}>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input className={""} onChange={handleChange} type="radio" name={"region"} value={"Europe Nordic & East"} checked={region === "Europe Nordic & East"}/>
                                            <Image src={"/lol/regions/icon-eune.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>Europe Nordic & East</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"North America"} checked={region === "North America"}/>
                                            <Image src={"/lol/regions/icon-na.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>North America</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"Europa West"} checked={region === "Europa West"}/>
                                            <Image src={"/lol/regions/icon-euw.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>Europa West</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"Oceania"} checked={region === "Oceania"}/>
                                            <Image src={"/lol/regions/icon-oce.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>Oceania</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"Korea"} checked={region === "Korea"}/>
                                            <Image src={"/lol/regions/icon-kr.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>Korea</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"Japan"} checked={region === "Japan"}/>
                                            <Image src={"/lol/regions/icon-jp.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>Japan</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"Brazil"} checked={region === "Brazil"}/>
                                            <Image src={"/lol/regions/icon-br.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>Brazil</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"LAS"} checked={region === "LAS"}/>
                                            <Image src={"/lol/regions/icon-las.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>LAS</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"LAN"} checked={region === "LAN"}/>
                                            <Image src={"/lol/regions/icon-lan.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>LAN</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"Russia"} checked={region === "Russia"}/>
                                            <Image src={"/lol/regions/icon-ru.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>Russia</p>
                                        </div>
                                        <div className={"flex flex-row gap-2 items-center text-sm"}>
                                            <input onChange={handleChange} type="radio" name={"region"} value={"Turkiye"} checked={region === "Turkiye"}/>
                                            <Image src={"/lol/regions/icon-tr.svg"} width={25} height={25}/>
                                            <p className={"ml-1"}>Turkiye</p>
                                        </div>
                                    </div>
                                    <div className={"mt-3"}>
                                        <h1>Garena Regions</h1>
                                        <div>
                                        </div>
                                    </div>
                                    <h1>Language</h1>
                                    <div>

                                    </div>
                                    <div className={"flex justify-center"}>
                                        <button className={"bg-leagueoflegends-color text-white w-20 h-10 rounded mt-8"} onClick={handleClick}>save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal