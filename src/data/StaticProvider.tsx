import {ReactNode} from "react";
import VersionContext from "./VersionContext";
import ChampionProvider from "./ChampionContext";
import VersionProvider from "./VersionContext";
import ItemProvider from "./ItemContext";
import SummonerSpellProvider from "@/data/SummonerSpellContext";

const StaticProvider = ({children}: {children: ReactNode}) => {
	return (
		<>
			<VersionProvider>
				<ChampionProvider>
					<ItemProvider>
						<SummonerSpellProvider>
							{children}
						</SummonerSpellProvider>
					</ItemProvider>
				</ChampionProvider>
			</VersionProvider>
		</>
	)
}
export default StaticProvider