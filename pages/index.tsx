import type { NextPage } from 'next'
import Image from 'next/image'
import Modal from "../components/Modal";
import {ChangeEvent, useState} from "react";
import {motion} from "framer-motion";
import Link from "next/link";
import {FiSearch} from "react-icons/fi"


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

	return (
		<main className={"flex flex-col w-full items-center"}>
			<div className={"flex h-full w-full h-52"}>
				<div className={"flex flex-col justify-center items-center w-full"}>
					<div>
						<h1 className={"text-white text-8xl py-8"}>VELKOZ.LOL</h1>
					</div>
					<SearchBar/>
					<div className={"pt-6"}>
					</div>
					<div className={"flex flex-row"}>
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

const SearchBar = () => {
	const [search, setSearch] = useState("");

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const value = event.target.value;
		setSearch(value);
	}
	return (
		<>
			<div className={"relative w-full max-w-4xl px-4"}>
				<div className={"relative text-gray-400 flex justify-center"}>
					<input type={"text"} autoComplete={"off"} placeholder={"Search Summoner or a Champion"}
						   spellCheck={"false"} value={search} onChange={handleChange}
						   className={"text-black p-4 rounded-full text-2xl w-full max-w-4xl px-8 pr-16"}/>
					<div className={"flex justify-center items-center"}>
						<FiSearch className={"absolute h-8 w-8 mr-6 right-0"}/>
					</div>
				</div>
			</div>
		</>
	)
};

export default Home;