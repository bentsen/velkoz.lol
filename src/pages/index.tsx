import type {NextPage} from 'next'
import Image from 'next/future/image'
import React, {useState} from "react";
import Head from "next/head";
import Searchbar from "../components/Searchbar";

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
						<Searchbar/>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;