import {ChangeEvent, useEffect, useState} from "react";
import {ISummoner} from "reksai/src/@types/summoner";
import {Combobox} from "@headlessui/react";
import {IChampion} from "reksai/src/@types/champion";
import {ddragon} from "reksai";
import Image from "next/image"


const Searchbar = () => {
	const [selected, setSelected] = useState();
	const [summoners, setSummoners] = useState<ISummoner[]>([]);
	const [champions, setChampions] = useState<IChampion[]>([]);
	const [search, setSearch] = useState("");


	/** Handle champ data **/
	useEffect(() => {
		 async function handleChamps() {
			const res = await ddragon.champion.getAll();
			let champs = [];
			for (let key in res.data) {
				champs.push(res.data[key]);
			}
			setChampions(champs);
		}

		handleChamps();
	}, [])


	const filteredSummoners = !search
		? summoners
		: summoners.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

	const filteredChamps = !search
		? champions
		: champions.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

	useEffect(() => {
		filteredChamps.forEach((c) => console.log("ff: " + c.name))
		console.log(search)
	}, [search, champions, filteredChamps])

	return (
		<div className={"relative w-full rounded-full max-w-4xl px-4"}>
			<Combobox value={selected} onChange={setSelected}>
				<Combobox.Input onChange={(e) => setSearch(e.target.value)}
								className={`relative w-full max-w-4xl text-black p-4 text-2xl w-full max-w-4xl px-8 pr-16 ${search ? "rounded-t-3xl" : "rounded-3xl"}`}
								placeholder={"Search Summoner og Champion..."}
				/>
				{search && (
					<Combobox.Options className={"absolute max-h-70 w-full overflow-auto rounded-b-3xl bg-white"}>
						{filteredSummoners.length > 0 && (
							<>
								<div className={"bg-gray-300"}>
									<p className={"ml-5 text-gray-600"}>Summoner</p>
								</div>
								{filteredSummoners.map((s) => (
									<Combobox.Option key={s.puuid} value={s}>

									</Combobox.Option>
								))}
							</>
						)}

						{filteredChamps.length > 0 && (
							<>
								<div className={"bg-gray-300"}>
									<p className={"ml-5 text-gray-600"}>Champion</p>
								</div>
								{filteredChamps.map((c) => (
									<Combobox.Option key={c.id} value={c}>
										<UnifiedSearchOption img={c.image.sprite} name={c.name}/>
									</Combobox.Option>
								))}
							</>
						)}
					</Combobox.Options>
				)}
			</Combobox>
		</div>
	)
}

interface UnifiedSearchOptionProps {
	img: string,
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
						<p>{props.img}</p>
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