import Link from "next/link";
import {useState} from "react";

const Match = ({won}) => {
    const [matchWon, setMatchWon] = useState<boolean>(won)

    return(
        <>
            {!matchWon ? (
            <div className={"w-full h-auto"}>
                <li className={"relative list-none mt-2 bg-loss"}>
                    <div className={"flex items-center h-24 rounded border-l-4 border-solid border-loss-border"}>
                        <div className={"ml-3 w-28 leading-4 text-xs"}>
                            <div className={"text-loss-border"}>Ranked Solo</div>
                            <div>
                                <div className={"relative text-summoner-gray"}>2 days ago</div>
                            </div>
                            <div className={"w-12 h-px"}></div>
                            <div className={"text-summoner-gray"}>Loss</div>
                            <div className={"text-summoner-gray"}>31 33</div>
                        </div>
                        <div className={"ml-2"}>
                            <div className={"flex"}>
                                <div className={"flex items-center"}>
                                    <div>
                                        <Link className={"relative block w-12 h-12"} href={"habib"}>
                                            <img className={"rounded-full block w-12 h-12"} src={"http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png"}/>
                                        </Link>
                                    </div>
                                    <div className={"block ml-1"}>
                                        <div className={"w-6 h-6 mb-0.5 block"}>
                                            <div className={"relative block"}>
                                                <img className={"block rounded border-0"} src="https://ddragon.leagueoflegends.com/cdn/12.13.1/img/spell/SummonerDot.png" alt="summonerSpell"/>
                                            </div>
                                        </div>
                                        <div className={"w-6 h-6 mb-0.5 block"}>
                                            <div className={"relative block"}>
                                                <img className={"block rounded border-0"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/spell/SummonerFlash.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"block ml-1"}>
                                        <div className={"w-6 h-6 mb-0.5 block bg-black rounded-full"}>
                                            <div className={"relative block"}>
                                                <img className={"block rounded border-0"} src="https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png" alt=""/>
                                            </div>
                                        </div>
                                        <div className={"w-6 h-6 mb-0.5 block"}>
                                            <div className={"relative block"}>
                                                <img className={"block rounded border-0"} src="https://ddragon.canisback.com/img/perk-images/Styles/7200_Domination.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex flex-col justify-center relative w-28 pr-3 mr-2 ml-3"}>
                                    <div className={"text-sm text-summoner-gray font-bold"}>
                                        <span className={"text-white"}>4 </span>
                                        /
                                        <span className={"text-loss-border"}> 10 </span>
                                        /
                                        <span className={"text-white"}> 1</span>
                                    </div>
                                    <div className={"block text-xs text-summoner-gray"}>
                                                        <span>
                                                            0.50
                                                            :1
                                                        </span>
                                        KDA
                                    </div>
                                    <div className={"absolute top-0 right-0 w-px h-full bg-loss-button"}></div>
                                </div>
                                <div className={"flex flex-col items-start w-36 text-summoner-gray text-xs"}>
                                    <div className={"text-loss-border block"}>
                                        <div className={"relative block"}>
                                            P/Kill
                                            19
                                            %
                                        </div>
                                    </div>
                                    <div>Control Ward 1</div>
                                    <div className={"block"}>
                                        <div className={"relative"}>
                                            CS
                                            132
                                            (
                                            4.2
                                            )
                                        </div>
                                    </div>
                                    <div className={"font-bold capitalize"}>
                                        <div className={"relative"}>
                                            gold
                                            3
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex items-center"}>
                                <div className={"flex"}>
                                    <ul className={"flex list-none"}>
                                        <li className={"w-6 h-6 bg-loss-button rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/6693.png" alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3142.png" alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3070.png" alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3133.png" alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3158.png" alt=""/>
                                            </div>
                                        </li>
                                        <li className={"w-6 h-6 bg-loss-button ml-0.5 rounded"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded"} src="" alt=""/>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className={"w-6 h-6 ml-0.5 mr-1 bg-loss-button rounded-full"}>
                                        <div className={"relative block"}>
                                            <img className={"rounded-full"} src="https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3340.png" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"flex ml-3"}>
                            <ul className={"mr-2 list-none"}>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                            </ul>
                            <ul className={"list-none"}>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                                <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                    <div className={"inline-block align-middle mr-1"}>
                                        <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                    </div>
                                    <div className={"inline-block align-middle text-summoner-gray"}>
                                        <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className={"relative w-10 h-24 rounded-tr rounded-br overflow-hidden"}>
                            <button className={"w-10 h-24 bg-loss-button flex justify-center items-end"}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-loss-border mb-2" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M19 9l-7 7-7-7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </li>
            </div>
            ) : (
                <div className={"w-full h-auto"}>
                    <li className={"relative list-none mt-2 bg-win"}>
                        <div className={"flex items-center h-24 rounded border-l-4 border-solid border-win-border"}>
                            <div className={"ml-3 w-28 leading-4 text-xs"}>
                                <div className={"text-win-border"}>Ranked Solo</div>
                                <div>
                                    <div className={"relative text-summoner-gray"}>2 days ago</div>
                                </div>
                                <div className={"w-12 h-px"}></div>
                                <div className={"text-summoner-gray"}>Loss</div>
                                <div className={"text-summoner-gray"}>31 33</div>
                            </div>
                            <div className={"ml-2"}>
                                <div className={"flex"}>
                                    <div className={"flex items-center"}>
                                        <div>
                                            <Link className={"relative block w-12 h-12"} href={"habib"}>
                                                <img className={"rounded-full block w-12 h-12"} src={"http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png"}/>
                                            </Link>
                                        </div>
                                        <div className={"block ml-1"}>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src="https://ddragon.leagueoflegends.com/cdn/12.13.1/img/spell/SummonerDot.png" alt="summonerSpell"/>
                                                </div>
                                            </div>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/spell/SummonerFlash.png" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"block ml-1"}>
                                            <div className={"w-6 h-6 mb-0.5 block bg-black rounded-full"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src="https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png" alt=""/>
                                                </div>
                                            </div>
                                            <div className={"w-6 h-6 mb-0.5 block"}>
                                                <div className={"relative block"}>
                                                    <img className={"block rounded border-0"} src="https://ddragon.canisback.com/img/perk-images/Styles/7200_Domination.png" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col justify-center relative w-28 pr-3 mr-2 ml-3"}>
                                        <div className={"text-sm text-summoner-gray font-bold"}>
                                            <span className={"text-white"}>4 </span>
                                            /
                                            <span className={"text-win-border"}> 10 </span>
                                            /
                                            <span className={"text-white"}> 1</span>
                                        </div>
                                        <div className={"block text-xs text-summoner-gray"}>
                                                        <span>
                                                            0.50
                                                            :1
                                                        </span>
                                            KDA
                                        </div>
                                        <div className={"absolute top-0 right-0 w-px h-full bg-win-button"}></div>
                                    </div>
                                    <div className={"flex flex-col items-start w-36 text-summoner-gray text-xs"}>
                                        <div className={"text-win-border block"}>
                                            <div className={"relative block"}>
                                                P/Kill
                                                19
                                                %
                                            </div>
                                        </div>
                                        <div>Control Ward 1</div>
                                        <div className={"block"}>
                                            <div className={"relative"}>
                                                CS
                                                132
                                                (
                                                4.2
                                                )
                                            </div>
                                        </div>
                                        <div className={"font-bold capitalize"}>
                                            <div className={"relative"}>
                                                gold
                                                3
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex items-center"}>
                                    <div className={"flex"}>
                                        <ul className={"flex list-none"}>
                                            <li className={"w-6 h-6 bg-win-button rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/6693.png" alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3142.png" alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3070.png" alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3133.png" alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3158.png" alt=""/>
                                                </div>
                                            </li>
                                            <li className={"w-6 h-6 bg-win-button ml-0.5 rounded"}>
                                                <div className={"relative block"}>
                                                    <img className={"rounded"} src="" alt=""/>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className={"w-6 h-6 ml-0.5 mr-1 bg-win-button rounded-full"}>
                                            <div className={"relative block"}>
                                                <img className={"rounded-full"} src="https://ddragon.leagueoflegends.com/cdn/12.13.1/img/item/3340.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex ml-3"}>
                                <ul className={"mr-2 list-none"}>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul className={"list-none"}>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                    <li className={"flex items-center w-20 h-4 text-left whitespace-nowrap mt-0.5"}>
                                        <div className={"inline-block align-middle mr-1"}>
                                            <img className={"block w-4 h-4 rounded"} src="http://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/Aatrox.png" alt=""/>
                                        </div>
                                        <div className={"inline-block align-middle text-summoner-gray"}>
                                            <p className={"text-xs block text-inherit text-ellipsis whitespace-nowrap overflow-hidden"}>bønne</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className={"relative w-10 h-24 rounded-tr rounded-br overflow-hidden"}>
                                <button className={"w-10 h-24 bg-win-button flex justify-center items-end"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-win-border mb-2" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M19 9l-7 7-7-7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </li>
                </div>
            )}
        </>
    )
}

export default Match