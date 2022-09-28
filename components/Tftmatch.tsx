import items from "../data/tft/items.json"
import champions from "../data/tft/champions.json"
import traits from "../data/tft/traits.json"

const Tftmatch = () => {

    const getBorderColor = (championId: string) => {
        const champ = champions.find(champ => champ.championId == championId)

        const tierMap = new Map([
            [1, "border-tft-gray"],
            [2, "border-tft-green"],
            [3, "border-tft-blue"],
            [4, "border-tft-pink"],
            [5, "border-tft-yellow"],
        ])

        return tierMap.get(champ!.cost)
    }

    return(
        <>
            <div className={"w-[740px] my-0 mx-auto"}>
                <li className={"relative list-none mt-2 bg-summoner-dark"}>
                    <div className={"flex items-center h-24 rounded border-l-4 border-solid border-summoner-gray"}>
                        <div className={"ml-3 w-28 leading-4 text-xs"}>
                            <div className={"font-bold text-summoner-gray"}>Ranked</div>
                            <div>
                                <div className={"relative text-summoner-gray pb-1"}>1 day ago</div>
                            </div>
                            <div className={"absolute top-13 left-4 h-px w-10 bg-match-text"}></div>
                            <div className={"w-12 h-px pt-0.5"}></div>
                            <div className={"text-summoner-gray font-semibold"}>5th</div>
                            <div className={"text-summoner-gray"}>38:13</div>
                        </div>
                        <div className={"flex"}>
                            <ul className={"flex list-none"}>
                                <li className={`w-10 h-10 rounded border-2 ${getBorderColor("TFT5_Aatrox")}`}>
                                    <div className={"relative block"}>
                                        <img className={"rounded"} src="/tft/champions/TFT5_Aatrox.png" alt=""/>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </div>
        </>
    )
}

export default Tftmatch