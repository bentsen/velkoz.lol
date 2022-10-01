import {ChangeEvent, useEffect, useState} from "react";
import {ISummoner} from "reksai/src/@types/summoner";
import {Combobox} from "@headlessui/react";
import {IChampion} from "reksai/src/@types/champion";
import {ddragon} from "reksai";
import Image from "next/image"
import {icon} from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import reksai from "reksai/src/Reksai";
import DDragonVersions from "reksai/dist/clients/ddragon/DDragonVersions";


const Searchbar = () => {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState();
	const [summoners, setSummoners] = useState<ISummoner[]>([]);
	const [champions, setChampions] = useState<IChampion[]>([]);
	const [champAssets, setChampAssets] = useState(new Map<string, string>());
	const [summonerIcons, setSummonerIcons] = useState(new Map<string, string>());


	/** Handle champ data **/
	useEffect(() => {
		const handleChamps = async () => {
			const res = await ddragon.champion.getAll();
			let champs = [];
			for (let key in res.data) {
				champs.push(res.data[key]);
				await handleChampAsset(res.data[key].id)
			}
			setChampions(champs);
		}
		handleChamps();

		const handleChampAsset = async (champId: string) => {
			const img = await ddragon.asset.champion(champId);
			setChampAssets(champAssets.set(champId, img));
		}
	}, [champAssets])

	useEffect(() => {
		const handleSummonerIcons = async () => {
			const x = Date.now();
			const latest = await DDragonVersions.getLatestVersion();
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

	}, [summonerIcons])


	const filteredSummoners = !search
		? summoners
		: summoners.filter((s) => s.name.toLowerCase().startsWith(search.toLowerCase()));

	const filteredChamps = !search
		? champions
		: champions.filter((c) => c.name.toLowerCase().startsWith(search.toLowerCase()));

	return (
		<>
			<div className={"relative w-full rounded-full max-w-4xl"}>
				<Combobox value={selected} onChange={setSelected}>
					<div className={"w-full flex flex-row"}>
						<Combobox.Input onChange={(e) => setSearch(e.target.value)}
										className={`relative w-full text-black p-4 text-2xl w-full max-w-4xl px-8 pr-16 ${search ? "rounded-t-3xl" : "rounded-3xl"}`}
										placeholder={"Search Summoner og Champion..."}
						/>
					</div>
					{search && (
						<Combobox.Options className={"absolute max-h-96 w-full overflow-auto rounded-b-3xl bg-white"}>
							{filteredChamps.length > 0 && (
								<>
									<div className={"bg-gray-300"}>
										<p className={"ml-5 text-gray-600"}>Champion</p>
									</div>
									{filteredChamps.map((c) => (
										<Combobox.Option key={c.id} value={c}>
											<UnifiedSearchOption img={champAssets.get(c.id)} name={c.name}/>
										</Combobox.Option>
									))}
								</>
							)}

							<div className={"bg-gray-300"}>
								<p className={"ml-5 text-gray-600"}>Summoner</p>
							</div>
							{filteredSummoners.length === 0 ? (
								<UnifiedSearchOption img={summonerIcons.get("0")} name={search}/>
							) : (
								filteredSummoners.map((s) => (
									<Combobox.Option key={s.puuid} value={s}
													 className={"relative cursor-pointer py-2"}>
										<UnifiedSearchOption img={summonerIcons.get(s.profileIconId.toString())} name={s.name}/>
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
	summonerLvl?: number
}

const UnifiedSearchOption = (props: UnifiedSearchOptionProps) => {
	return (
		<>
			<div className={"bg-white"}>
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