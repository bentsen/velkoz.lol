import {ReactNode} from "react";
import VersionContext from "./VersionContext";
import ChampionProvider from "./ChampionContext";
import VersionProvider from "./VersionContext";
import ItemProvider from "./ItemContext";

const StaticProvider = ({children}: {children: ReactNode}) => {
	return (
		<>
			<VersionProvider>
				<ChampionProvider>
					<ItemProvider>
						{children}
					</ItemProvider>
				</ChampionProvider>
			</VersionProvider>
		</>
	)
}
export default StaticProvider