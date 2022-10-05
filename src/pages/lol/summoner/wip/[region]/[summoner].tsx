import {NextPage} from "next";
import {useRouter} from "next/router";
import {ISummoner} from "reksai/src/@types/summoner";
import {useContext} from "react";
import {VersionContext} from "../../../../../store/VersionContext";

const SummonerPage: NextPage = () => {
	const router = useRouter();
	const {region, summoner} = router.query;
	return (
		<div className={"flex"}>
			<SummonerHeader />
		</div>
	)
}

const SummonerHeader = ({summoner}: {summoner: ISummoner}) => {
	const version = useContext(VersionContext)
	return (
		<div className={"mt-28"}>
			<Avatar
				img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
				lvl={summoner.summonerLevel}
			/>
		</div>
	)
}

const Avatar = ({img, lvl}: {img: string, lvl: number}) => {
	return (
		<div className={"relative border-2 border-amber-500 rounded"}>
			<div className={"absolute flex justify-center items-center z-10 -top-9 bg-black text-white"}>
				{lvl}
			</div>
			<div className={"w-full"}>

			</div>
		</div>
	)
}

export default SummonerPage