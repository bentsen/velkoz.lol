import {useRune} from "@/hooks/useRune";
import LeagueHoverIcon from "@/components/LeagueHoverIcon";
import {LeagueIcon} from "@/components/LeagueHoverIcon/LeagueIcon";

const RuneIcon = ({keystoneId}: { keystoneId: number | undefined }) => {
	const rune = useRune(keystoneId);
	// Please dont question my typescript shenanigans down there in longDesc.
	// I check if longDesc is present in rune and if it is not undefined and only then I will show the description.
	return (
		<LeagueHoverIcon img={rune?.icon} size={"lg"}>
			{rune && (

				<div className={"flex flex-row max-w-sm"}>
					<LeagueIcon img={rune?.icon} size={"lg"}/>
					<div className={"flex flex-col pl-4"}>
						<h2 className={"font-bold text-md"}>{rune?.name}</h2>
						<p
							className={"text-neutral-400"}
							dangerouslySetInnerHTML={{__html: rune.longDesc}}
						/>
					</div>
				</div>
			)}
		</LeagueHoverIcon>
	);
};

export default RuneIcon;