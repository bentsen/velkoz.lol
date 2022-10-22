import {useSecRune} from "@/hooks/useSecRune";
import LeagueHoverIcon from "@/components/LeagueHoverIcon";
import {LeagueIcon} from "@/components/LeagueHoverIcon/LeagueIcon";

const SecRuneIcon = ({keystoneId}: { keystoneId: number | undefined }) => {
	const rune = useSecRune(keystoneId);
	// Please dont question my typescript shenanigans down there in longDesc.
	// I check if longDesc is present in rune and if it is not undefined and only then I will show the description.
	return (
		<LeagueHoverIcon img={rune?.icon} size={"sm"}>
			{rune && (

				<div className={"flex flex-row max-w-sm"}>
					<LeagueIcon img={rune?.icon} size={"md"}/>
					<div className={"flex flex-col pl-4"}>
						<h2 className={"font-bold text-md"}>{rune?.name}</h2>
						{"longDesc" in rune && rune.longDesc && (
							<p
								className={"text-neutral-400"}
								dangerouslySetInnerHTML={{__html: rune.longDesc}}
							/>
						)}
					</div>
				</div>
			)}
		</LeagueHoverIcon>
	);
};

export default SecRuneIcon;