import type {NextPage} from 'next'
import Image from 'next/future/image'
import React, { Fragment, useContext, useEffect, useState} from "react";
import Link from "next/link";
import {FiX} from "react-icons/fi"
import {ISummoner} from "../utils/@types/summoner.t";
import {ChampionContext} from "../store/ChampionContext";
import {Combobox} from "@headlessui/react";
import {useRouter} from "next/router";
import axios from "axios";
import {VersionContext} from "../store/VersionContext";
import Head from "next/head";

const regions = ["NA", "EUW", "EUNE", "KR", "BR", "JP", "RU", "OCE", "TR", "LAN", "LAS"];
const regionColors = ["bg-yellow-400", "bg-blue-400", "bg-teal-400", "bg-purple-600", "bg-emerald-400",
	"bg-pink-400", "bg-red-500", "bg-teal-400", "bg-amber-600", "bg-yellow-400", "bg-amber-600"];
const regionMap: Map<string, {region: string, color: string}> = new Map([
	["na1", {region: "NA", color: "bg-yellow-400"}],
	["euw1", {region: "EUW", color: "bg-blue-400"}],
	["eun1", {region: "EUNE", color: "bg-teal-400"}],
	["kr1", {region: "KR", color: "bg-purple-600"}],
	["br1", {region: "BR", color: "bg-emerald-400"}],
	["jp1", {region: "JP", color: "bg-pink-400"}],
	["ru1", {region: "RU", color: "bg-red-500"}],
	["oc1", {region: "OCE", color: "bg-teal-400"}],
	["tr1", {region: "TR", color: "bg-amber-600"}],
	["la1", {region: "LAN", color: "bg-yellow-400"}],
	["la2", {region: "LAS", color: "bg-amber-600"}],
]);

/*
* Name: Mikkel Bentsen
* Dat: 14/9-2022
*/

const Home: NextPage = () => {
	const [summoner, setSummoner] = useState("")

	return (
		<>
			<Head>
				<title>Velkoz.lol</title>
			</Head>
			<main className={"flex flex-col w-full items-center"}>
				<div className={"flex w-full h-full"}>
					<div className={"flex flex-col justify-center items-center h-full w-full"}>
						<div>
							<h1 className={"text-white text-6xl sm:text-8xl font-medium py-8"}>VELKOZ.LOL</h1>
						</div>
						<div className={"mx-2 md:mx-0"}>
							<Searchbar/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

const Searchbar = () => {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<UnifiedOption>();
	const [summoners, setSummoners] = useState<ISummoner[]>([]);
	const [_region, setRegion] = useState("na1");
	const champions = useContext(ChampionContext);
	const router = useRouter();
	const version = useContext(VersionContext);

	const handleLink = async(state: UnifiedOption) => {
		if (state == null) return;
		state.link && await router.push(state.link);
		setSelected(state);
	}

	useEffect(() => {
		const handleSummoners = async() => {
			if (search.length == 1) {
				const res = await axios.get<ISummoner[]>(`/api/lol/summoners/by-part/?name=${search[0]}`);
				const summoner = await res.data;
				summoner.length == 0
					? setSummoners([])
					: setSummoners(summoner)
			}
		}
		handleSummoners()
	}, [search])

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
									key={search}
									name={search}
									img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/0.png`}
									link={`/lol/summoner/wip/${_region}/${search}`}
									region={_region}
								/>
							) : (
								filteredSummoners.map((s) => (
									<UnifiedOption
										key={s.id}
										img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${s.profileIconId}.png`}
										name={s.name}
										summonerLvl={s.summonerLevel}
										link={`/lol/summoner/wip/${s.region}/${s.name}`}
										region={s.region}
									/>
								))
							)}
						</Combobox.Options>
					)}
				</Combobox>
			</div>
			<div className={"flex flex-row flex-wrap justify-center pt-6"}>
				{[...regionMap.keys()].map((r, i) => (
					<button
						className={`px-3 py-1 mr-2 text-white font-bold rounded-xl ${r == _region ? regionColors[i] : "bg-gray-900 hover:bg-gray-700"}`}
						onClick={() => setRegion(r)}
						key={r}>
						{regionMap.get(r)!.region}
					</button>
				))}
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

	return (
		<Combobox.Option value={props} >
			{({active, selected}) => (
			<>
				<Link href={link} passHref>
					<div className={`cursor-pointer hover:bg-gray-200 ${active ? "bg-gray-200" : "bg-white"} ${selected ? "bg-blue-500": "bg-white"}`}>
						<div className={"flex w-full flex-row p-2 ml-2"}>
							<div className={"relative w-6 h-6"}>
								{img && (
									<Image priority src={img} alt={`${name} splash art`} sizes={"100vw"} fill/>
								)}
							</div>
							<div className={"ml-2 w-fit"}>
								<p className={"text-gray-700 text-lg"}>{name}</p>
							</div>
							{ summonerLvl && (
								<div className={"flex items-center ml-2 w-16"}>
									<p className={"text-gray-500 text-sm"}>Lvl {summonerLvl}</p>
								</div>
							)}
							{ region && (
                                <div className={"flex ml-auto items-center mr-4"}>
									<div className={`${regionMap.get(region)!.color} flex rounded-2xl`}>
										<p className={"text-white text-sm px-2"}>{regionMap.get(region)!.region}</p>
									</div>
                                </div>
							)}
						</div>
					</div>
				</Link>
			</>
			)}
		</Combobox.Option>
	)
}

export default Home;