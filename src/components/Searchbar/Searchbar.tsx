import {Fragment, useContext, useEffect, useState} from "react";
import {ISummoner} from "reksai/src/@types/summoner";
import {Combobox} from "@headlessui/react";
import {IChampion} from "reksai/src/@types/champion";
import {ddragon} from "reksai";
import Image from "next/image"
import axios from "axios";
import DDragonVersions from "reksai/dist/clients/ddragon/DDragonVersions";
import {ChampionContext} from "../../store/ChampionContext";


const Searchbar = () => {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState("");
	const [summoners, setSummoners] = useState<ISummoner[]>([]);
	const champions = useContext(ChampionContext);
	const [summonerIcons, setSummonerIcons] = useState(new Map<string, string>());

		/**
	useEffect(() => {
		const handleSummonerIcons = async () => {
			const latest = await DDragonVersions.getLatestVersion();
			const x = Date.now();
			const res = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/profileicon.json`);
			const data = await res.data.data;
			let icons = [];
			for (let key in data) {
				icons.push(data[key]);
				await handleIcon(data[key].id.toString());
			}

			const y = Date.now() - x;
			console.log("DONE in: " + y)

		}
		handleSummonerIcons()

		const handleIcon = async (iconId: string) => {
			const res = await ddragon.asset.profileIcon(iconId);
			setSummonerIcons(summonerIcons.set(iconId, res));
		}

	}, [])
		 **/

	const filteredSummoners = !search
		? summoners
		: summoners.filter((s) => s.name.toLowerCase().startsWith(search.toLowerCase()));

	const filteredChamps = !search
		? champions!
		: champions!.filter((c) => c.name.toLowerCase().startsWith(search.toLowerCase()));

	return (
		<>
			<div className={"relative w-full rounded-full max-w-4xl"}>
				<Combobox value={selected} onChange={setSelected}>
					<div className={"w-full flex flex-row"}>
						<Combobox.Input
							as={Fragment}
							onChange={(e) => setSearch(e.target.value)}
							displayValue={(selected: string) => selected}
						>
							<input
								placeholder={"Search Summoner og Champion..."}
								className={`relative w-full text-black p-4 text-2xl w-full max-w-4xl px-8 pr-16 ${search ? "rounded-t-3xl" : "rounded-3xl"}`}
								autoComplete={"off"}
							/>
						</Combobox.Input>
					</div>
					{search && (
						<Combobox.Options className={"absolute max-h-96 w-full overflow-auto rounded-b-3xl bg-white"}>
							{filteredChamps.length > 0 && (
								<>
									<div className={"bg-gray-300"}>
										<p className={"ml-5 text-gray-600"}>Champion</p>
									</div>
									{filteredChamps.map((c) => (
										<Combobox.Option key={c.id} value={c} onClick={() => setSelected(c.name)}>
											<UnifiedSearchOption img={c.image.sprite} name={c.name} link={`/lol/champion/${c.id}`}/>
										</Combobox.Option>
									))}
								</>
							)}

							<div className={"bg-gray-300"}>
								<p className={"ml-5 text-gray-600"}>Summoner</p>
							</div>
							{filteredSummoners.length === 0 ? (
								<UnifiedSearchOption img={summonerIcons.get("0")} name={search} link={`/summoner/${search}`}/>
							) : (
								filteredSummoners.map((s) => (
									<Combobox.Option key={s.puuid} value={s}
													 className={"relative cursor-pointer py-2"}>
										<UnifiedSearchOption img={summonerIcons.get(s.profileIconId.toString())} name={s.name} link={`/lol/summoner/${s.name}`}/>
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					)}
				</Combobox>
			</div>
		</>
	)
}

interface UnifiedSearchOptionProps {
	img?: string,
	region?: string,
	name: string,
	summonerLvl?: number,
	link: string,
}

const UnifiedSearchOption = (props: UnifiedSearchOptionProps) => {
	return (
		<>
			<div className={"bg-white cursor-pointer hover:bg-gray-200"}>
				<div className={"flex flex-row p-2"}>
					<div className={"relative w-6 h-6"}>
						{props.img && (
							<Image src={props.img} alt={`${props.name} splash art`} layout={"fill"}/>
						)}
					</div>
					<div className={"ml-2"}>
						<p className={"text-gray-700 text-lg"}>{props.name}</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Searchbar