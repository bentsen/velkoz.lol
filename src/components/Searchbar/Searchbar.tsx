import React, {Fragment, ReactNode, ReactText, useContext, useEffect, useState} from "react";
import {ISummoner} from "../../utils/@types/summoner.t";
import {ChampionContext} from "../../store/ChampionContext";
import {useRouter} from "next/router";
import {VersionContext} from "../../store/VersionContext";
import axios from "axios";
import {Combobox, Menu, Transition} from "@headlessui/react";
import {FiChevronDown, FiX} from "react-icons/fi";
import Link from "next/link";
import Image from "next/future/image";
import RegionTag from "../RegionTag";

interface IRegion {
	short: string,
	long: string,
	color: string,
	keyValue: string,
}

const games = [
	{
		nick: "lol",
		name: "League of Legends",
		link: "/",
		color: "bg-lol-color",
		svg: "/game-icons/leagueoflegends.svg"
	},
	{
		nick: "val",
		name: "Valorant",
		link: "/valorant",
		color: "bg-valorant-color",
		svg: "/game-icons/valorant.svg"
	},
	{
		nick: "tft",
		name: "Teamfight Tactics",
		link: "/tft",
		color: "bg-tft-color",
		svg: "/game-icons/teamfighttactics.png"
	},
	{
		nick: "lor",
		name: "League of Runeterra",
		link: "/lor",
		color: "bg-lor-color",
		svg: "/game-icons/legendsofruneterra.png"
	},
]


const regionMap = new Map<string, IRegion>([
	["na1", {short: "NA", long: "North America", color: "bg-yellow-400 hover:bg-yellow-500", keyValue: "na1"}],
	["euw1", {short: "EUW", long: "Europe West", color: "bg-blue-400 hover:bg-blue-500", keyValue: "euw1"}],
	["eun1", {short: "EUNE", long: "Europe Nordic East", color: "bg-teal-400 hover:bg-teal-500", keyValue: "eun1"}],
	["kr1", {short: "KR", long: "Korea", color: "bg-purple-600 bg-purple-700", keyValue: "kr1"}],
	["br1", {short: "BR", long: "Brazil", color: "bg-emerald-400 bg-emerald-500", keyValue: "br1"}],
	["jp1", {short: "JP", long: "Japan", color: "bg-pink-400 bg-pink-500", keyValue: "jp1"}],
	["ru1", {short: "RU", long: "Russia", color: "bg-red-500 bg-red-500", keyValue: "ru1"}],
	["oc1", {short: "OCE", long: "Oceania", color: "bg-teal-400 bg-teal-500", keyValue: "oc1"}],
	["tr1", {short: "TR", long: "Turky", color: "bg-amber-600 bg-amber-700", keyValue: "tr1"}],
]);

const Searchbar = () => {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState<UnifiedOption>();
	const [summoners, setSummoners] = useState<ISummoner[]>([]);
	const [region, setRegion] = useState<IRegion>({
		short: "EUW",
		long: "Europe West",
		color: "bg-blue-400 hover:bg-blue-500",
		keyValue: "euw1"
	});
	const champions = useContext(ChampionContext);
	const router = useRouter();
	const version = useContext(VersionContext);

	const handleLink = async (state: UnifiedOption) => {
		if (state == null) return;
		state.link && await router.push(state.link);
		setSelected(state);
	}

	useEffect(() => {
		const handleSummoners = async () => {
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
			<div className={"px-3 lg:px-0 w-full max-w-4xl"}>
				<div className={`relative bg-neutral-200 ${search ? "rounded-t-xl" : "rounded-xl"}`}>
					<Combobox value={selected} onChange={handleLink} nullable>
						<div
							className={`flex flex-row justify-center items-center text-black text-2xl`}>
							<div
								className={`flex flex-row justify-center items-center w-fit h-16 border-r-2 border-neutral-300 cursor-pointer bg-neutral-200 hover:bg-neutral-300 ${search ? "rounded-tl-xl" : "rounded-l-xl"}`}>
								<GameMenu/>
								<div className={"hidden md:block"}>
									<RegionMenu region={region} setRegion={setRegion}/>
								</div>
							</div>
							<Combobox.Input
								as={Fragment}
								onChange={(e) => {}}
							>
								<input
									placeholder={"Search Summoner or Champion..."}
									autoComplete={"off"}
									className={`w-full mx-4 h-16 text-lg ${search ? "text-neutral-800" : "text-neutral-400"} bg-neutral-200 font-bold rounded-2xl`}
									onChange={(e) => setSearch(e.target.value)}
									value={search}
								/>
							</Combobox.Input>

							{search && (
								<button
									className={"flex justify-center mr-4 items-center"}
									onClick={() => setSearch("")}
								>
									<FiX className={"w-6 h-6"}/>
								</button>
							)}
							<div className={"block md:hidden"}>
								<RegionMenu region={region} setRegion={setRegion} />
							</div>
						</div>
						<Transition
							show={search.length > 0}
							as={Fragment}
							enter="transition ease-out duration-300"
							enterFrom="transform -translate-y-6 opacity-0"
							enterTo="transform opacity-y-0 opacity-100"
							leave="transition ease-in duration-100"
							leaveFrom="transform opacity-100 -translate-y-0 scale-100"
							leaveTo="transform opacity-0 -translate-y-6 scale-95"
						>
							<Combobox.Options
								className={"absolute max-h-96 w-full overflow-auto rounded-b-xl bg-neutral-200 border-t border-neutral-400"}
								static
							>
								{filteredChamps.length > 0 && (
									<>
										<div className={"bg-neutral-200 py-2"}>
											<p className={"ml-5 text-gray-600 font-bold"}>Champion</p>
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

								<div className={"bg-neutral-200 py-2"}>
									<p className={"ml-5 text-gray-600 font-bold"}>Summoner</p>
								</div>
								{filteredSummoners.length === 0 ? (
									<UnifiedOption
										key={search}
										name={search}
										img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/0.png`}
										link={`/lol/summoner/${region}/${search}`}
										region={region.short}
									/>
								) : (
									filteredSummoners.map((s) => (
										<UnifiedOption
											key={s.id}
											img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${s.profileIconId}.png`}
											name={s.name}
											summonerLvl={s.summonerLevel}
											link={`/lol/summoner/${s.region}/${s.name}`}
											region={s.region}
										/>
									))
								)}
							</Combobox.Options>
						</Transition>
					</Combobox>
				</div>
			</div>
		</>
	)
}

const GameMenu = () => {
	return (
		<div className={"flex h-full pr-2"}>
			<Menu as={"div"} className={"inline-block"}>
				<Menu.Button
					className={"inline-flex items-center text-gray-700 h-full text-base whitespace-nowrap font-bold pl-4 pr-1"}>
					<span className={"hidden md:inline-block"}>All games</span>
					<span className={"inline-block md:hidden"}>All</span>
					<span><FiChevronDown/></span>
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-300"
					enterFrom="transform -translate-y-6 opacity-0"
					enterTo="transform opacity-y-0 opacity-100"
					leave="transition ease-in duration-100"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className={"absolute left-0 bg-neutral-200 mt-2 rounded w-64"}>
						<div className={"p-3"}>
							{games.map((game) => (
								<MenuItem key={game.name}>
									<Link href={game.link} passHref>
										<a className={"w-full h-full flex items-center p-4"}>
											{game.name}
										</a>
									</Link>
								</MenuItem>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}

const RegionMenu = ({
						region,
						setRegion
					}: { region: IRegion, setRegion: React.Dispatch<React.SetStateAction<IRegion>> }) => {
	return (
		<div className={"flex h-full pr-2 items-center"}>
			<Menu as={"div"} className={"w-full inline-block"}>
				<Menu.Button>
					<RegionTag {...region} />
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-300"
					enterFrom="transform -translate-x-6 opacity-0"
					enterTo="transform opacity-x-0 opacity-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className={"absolute left-0 bg-neutral-200 mt-6 rounded w-64"}>
						<div className={"p-3"}>
							{[...regionMap.values()].map((r) => (
								<MenuItem key={r.keyValue}>
									<button onClick={() => setRegion(r)}
											className={"w-full h-full flex items-center justify-between p-4"}>
										<p>{r.long}</p>
									</button>
								</MenuItem>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}

const MenuItem = ({children}: { children: ReactNode }) => {
	return (
		<Menu.Item as={Fragment}>
			{({active}) => (
				<div
					className={`w-full h-8 flex justify-start text-sm font-bold rounded-md ${active && "bg-neutral-300"}`}>
					{children}
				</div>
			)}
		</Menu.Item>
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
		<Combobox.Option value={props}>
			{({active, selected}) => (
				<>
					<Link href={link} passHref>
						<div
							className={`cursor-pointer ${active ? "bg-neutral-300" : "bg-neutral-200"}`}>
							<div className={"flex w-full flex-row p-2 pl-4"}>
								<div className={"relative w-6 h-6"}>
									{img && (
										<Image priority src={img} alt={`${name} splash art`} sizes={"100vw"} fill/>
									)}
								</div>
								<div className={"ml-2 w-fit"}>
									<p className={"text-gray-700 text-lg"}>{name}</p>
								</div>
								{summonerLvl && (
									<div className={"flex items-center ml-2 w-16"}>
										<p className={"text-gray-500 text-sm"}>Lvl {summonerLvl}</p>
									</div>
								)}
								{region && (
									<div className={"flex ml-auto items-center pr-4"}>
										<div className={`${regionMap.get(region)?.color} flex rounded-2xl`}>
											<p className={"text-white text-sm px-2"}>{regionMap.get(region)?.short}</p>
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

export default Searchbar