import {useItem} from "@/hooks/useItem";
import LeagueHoverIcon from "@/components/LeagueHoverIcon";
import {LeagueIcon} from "@/components/LeagueHoverIcon/LeagueIcon";
import {RiCopperCoinLine} from "react-icons/ri";
import {ReactNode} from "react";

const ItemIcon = ({itemId}: { itemId: number | undefined }) => {
	const item = useItem(itemId);
	const isMythic = item?.description.includes("rarityMythic");
	return (
		<MythicWrapper isMythic={isMythic}>
			<LeagueHoverIcon img={item?.image.full}>
				{item && (
					<>
						<div className={"flex flex-row max-w-sm"}>
							<LeagueIcon img={item.image.full} size={"lg"}/>
							<div className={"flex flex-col pl-4"}>
								<h2 className={"font-bold"}>{item.name}</h2>
								<span className={"inline-flex items-center"}>
                				<RiCopperCoinLine className={"fill-yellow-500 mr-2"}/>{" "}
									{item?.gold.total}
							</span>
							</div>
						</div>
						<div
							className={"pt-3 item-parser"}
							dangerouslySetInnerHTML={{__html: item.description}}
						/>
					</>
				)}
			</LeagueHoverIcon>
		</MythicWrapper>
	);
}

const MythicWrapper = ({isMythic, children}: { isMythic: boolean | undefined, children: ReactNode }) => {
	return (
		<>
			{isMythic ? (
				<div className={"outline outline-2 outline-amber-300 rounded-sm relative"}>
					<div className={"absolute outline outline-2 outline-neutral-800 rotate-45 bg-amber-300 w-1.5 h-1.5 z-30 -top-1 left-1/2 -translate-x-1/2"}/>
					{children}
				</div>
			) : (
				<>{children}</>
			)}
		</>
	)
}

export default ItemIcon;