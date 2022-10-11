import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/Layout/Layout"
import VersionContext from "../store/VersionContext";
import ChampionListProvider from "../store/ChampionContext";
import StaticProvider from "../store/StaticProvider";
import {Transition} from "@headlessui/react";

function MyApp({Component, pageProps}: AppProps) {
	return (
		<StaticProvider>
			<Layout>
				<Component {...pageProps}/>
			</Layout>
		</StaticProvider>
	)
}

export default MyApp
