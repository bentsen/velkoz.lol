import {useItem} from "@/hooks/useItem";
import LeagueHoverIcon from "@/components/LeagueHoverIcon";
import {LeagueIcon} from "@/components/LeagueHoverIcon/LeagueIcon";
import {RiCopperCoinLine} from "react-icons/ri";

const ItemIcon = ({itemId}: { itemId: number | undefined }) => {
	const item = useItem(itemId);
	return (
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
	);
};

export default ItemIcon;