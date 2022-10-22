import {ReactNode} from "react";
import VersionContext from "./VersionContext";
import ChampionProvider from "./ChampionContext";
import VersionProvider from "./VersionContext";
import ItemProvider from "./ItemContext";
import SummonerSpellProvider from "@/data/SummonerSpellContext";
import RunesProvider from "@/data/RunesContext";

const StaticProvider = ({children}: { children: ReactNode }) => {
	return (
		<>
			<VersionProvider>
				<ChampionProvider>
					<ItemProvider>
						<RunesProvider>
							<SummonerSpellProvider>
								{children}
							</SummonerSpellProvider>
						</RunesProvider>
					</ItemProvider>
				</ChampionProvider>
			</VersionProvider>
		</>
	)
}
export default StaticProvider