import type {NextPage} from 'next'
import Image from 'next/future/image'
import React, {ChangeEvent, Dispatch, Fragment, SetStateAction, useContext, useEffect, useState} from "react";
import Link from "next/link";
import {FiSearch, FiX} from "react-icons/fi"
import {ISummoner} from "reksai/src/@types/summoner";
import {ChampionContext} from "../store/ChampionContext";
import {Combobox} from "@headlessui/react";
import {useRouter} from "next/router";
import {axes} from "@motionone/dom/types/animate/utils/transforms";
import axios from "axios";



/*
* Name: Mikkel Bentsen
* Dat: 14/9-2022
*/

const Home: NextPage = () => {
	const regions = ["NA", "EUW", "EUN", "KR", "BR", "JP", "RU", "OCE", "TR", "LAN", "LAS"]
	const regionsMap: Map<string, string> = new Map([
		["Europa West", "euw1"],
		["Europe Nordic & East", "eun1"],
		["North America", "NA1"],
		["Oceania", "OC1"],
		["Japan", "JP1"],
		["Russia", "RU"],
		["LAS", "LA1"],
		["LAN", "LA2"],
		["Brazil", "BR1"],
		["Korea", "KR"],
		["Türkiye", "TR1"],
	])

	const regionColors = ["bg-yellow-400", "bg-blue-400", "bg-teal-400", "bg-purple-600", "bg-emerald-400",
		"bg-pink-400", "bg-red-500", "bg-teal-400", "bg-amber-600", "bg-yellow-400", "bg-amber-600"]

	const [region, setRegion] = useState("NA");
	const [summoner, setSummoner] = useState("")

	useEffect(() => {
		console.log(summoner)
	}, [summoner])

	return (
		<main className={"flex flex-col w-full items-center"}>
			<div className={"flex w-full h-full"}>
				<div className={"flex flex-col justify-center items-center h-full w-full"}>
					<div>
						<h1 className={"text-white text-8xl font-medium py-8"}>VELKOZ.LOL</h1>
					</div>
					<Searchbar/>
					<div className={"flex flex-row pt-6"}>
						{regions.map((r, i) => (
							<button
								className={`px-3 py-1 mr-2 text-white font-bold rounded-xl ${r == region ? regionColors[i] : "bg-gray-900 hover:bg-gray-700"}`}
								onClick={() => setRegion(r)}
								key={r}>
								{r}
							</button>
						))}
					</div>
				</div>
			</div>
		</main>
	);
};

const Searchbar = () => {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<UnifiedOption>();
	const [summoners, setSummoners] = useState<ISummoner[]>([]);
	const champions = useContext(ChampionContext);
	const [summonerIcons, setSummonerIcons] = useState(new Map<string, string>());
	const router = useRouter()

	const handleLink = async(state: UnifiedOption) => {
		if (state == null) return;
		state.link && await router.push(state.link);
		setSelected(state);
	}

	useEffect(() => {
		const handleSummoners = async() => {
			if (search.length == 1) {
				console.log("hello")
				const res = await axios.get(`/api/lol/summoners/by-part/?name=${search[0]}`);
				const data = await res.data;
				console.log(data)
				data.length == 0
					? setSummoners([])
					: setSummoners(data)
			}
		}
		handleSummoners()
	})

	const filteredSummoners = !search
		? summoners
		: summoners.filter((s) => s.name.toLowerCase().startsWith(search.toLowerCase()));

	const filteredChamps = !search
		? champions!
		: champions!.filter((c) => c.name.toLowerCase().startsWith(search.toLowerCase()));

	return (
		<>
			<div className={"relative w-full rounded-full max-w-4xl"}>
				<Combobox value={selected} onChange={handleLink} nullable>
					<div className={`w-full flex flex-row bg-white w-full text-black p-4 text-2xl w-full max-w-4xl ${search ? "rounded-t-3xl" : "rounded-3xl"}`}>
						<Combobox.Input
							as={Fragment}
							onChange={(e) => setSearch(e.target.value)}
							displayValue={(selected: UnifiedOption) => selected?.name}

						>
							<input
								placeholder={"Search Summoner og Champion..."}
								autoComplete={"off"}
								className={"w-full mx-4"}
							/>
						</Combobox.Input>
						{ search && (
								<button
									className={"flex justify-center items-center"}
									onClick={() => setSearch("")}
								>
									<FiX className={"w-6 h-6"}/>
								</button>
							)}
					</div>
					{search && (
						<Combobox.Options className={"absolute max-h-96 w-full overflow-auto rounded-b-3xl bg-white"}>
							{filteredChamps.length > 0 && (
								<>
									<div className={"bg-gray-300"}>
										<p className={"ml-5 text-gray-600"}>Champion</p>
									</div>
									{filteredChamps.map((c) => (
										<UnifiedOption
											key={c.id}
											name={c.name}
											img={c.image.sprite}
											link={`/lol/champion/${c.id}`}/>
									))}
								</>
							)}

							<div className={"bg-gray-300"}>
								<p className={"ml-5 text-gray-600"}>Summoner</p>
							</div>
							{filteredSummoners.length === 0 ? (
								<UnifiedOption
									name={search}
									link={`/lol/summoner/${search}`}/>
							) : (
								filteredSummoners.map((s) => (
									<UnifiedOption
										key={s.id}
										img={summonerIcons.get(s.profileIconId.toString())}
										name={s.name}
										link={`/lol/summoner/${s.name}`}/>
								))
							)}
						</Combobox.Options>
					)}
				</Combobox>
			</div>
		</>
	)
}

interface UnifiedOption {
	img?: string,
	region?: string,
	name: string,
	summonerLvl?: number,
	link: string,
}

const UnifiedOption = (props: UnifiedOption) => {
	const {img, region, name, summonerLvl, link} = props;
	const router = useRouter();

	return (
		<Combobox.Option value={props} >
			{({active, selected}) => (
			<>
				<Link href={link} passHref>
					<div className={`cursor-pointer hover:bg-gray-200 ${active ? "bg-gray-200" : "bg-white"} ${selected ? "bg-blue-500": "bg-white"}`}>
						<div className={"flex flex-row p-2"}>
							<div className={"relative w-6 h-6"}>
								{img && (
									<Image priority src={img} alt={`${name} splash art`} fill/>
								)}
							</div>
							<div className={"ml-2"}>
								<p className={"text-gray-700 text-lg"}>{name}</p>
							</div>
						</div>
					</div>
				</Link>
			</>
			)}
		</Combobox.Option>
	)
}

export default Home;