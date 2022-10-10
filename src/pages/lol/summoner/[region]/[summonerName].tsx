import {NextPage} from "next";
import {useRouter} from "next/router";
import {ISummoner} from "../../../../utils/@types/summoner.t";
import {fetcher, useSummoner} from "../../../../hooks/useSummoner";
import useSWR from "swr";
import {useProfileIcon} from "../../../../data/useProfileIcon";
import Image from "next/future/image"

const SummonerPage: NextPage = () => {
	const router = useRouter();
	let {region, summonerName} = router.query;

	const {
		data: summoner,
		error
	} = useSWR<ISummoner>(summonerName ? `/api/lol/summoners/by-name/${summonerName}?region=${region}` : null, fetcher)

	if (!summoner) return <div className={"text-white"}>Loading...</div>

	return (
		<div className={"flex mx-auto px-52"}>
			<SummonerHeader summoner={summoner}/>
		</div>
	)
}

const SummonerHeader = ({summoner}: { summoner: ISummoner }) => {
	return (
		<div className={"mt-28"}>
			<div className={"flex flex-row"}>
				<Avatar
					img={useProfileIcon(summoner.profileIconId)}
					lvl={summoner.summonerLevel}
				/>
				<div className={"flex flex-col ml-4"}>
					<h2 className={"text-white font-bold text-4xl"}>{summoner.name}</h2>
				</div>
			</div>
		</div>
	)
}

const Avatar = ({img, lvl}: { img: string, lvl: number }) => {
	return (
		<div className={"relative"}>
			<div
				className={"absolute flex justify-center items-center border-2 border-neutral-800 z-10 -bottom-4 left-1/2 -translate-x-1/2 bg-brand text-white rounded-2xl px-2"}>
				{lvl}
			</div>
			<div className={"relative border-2 border-neutral-800 rounded-2xl overflow-hidden"}>
				<div className={"w-28 h-28"}>
					<Image src={img} alt={`Profile icon`} fill/>
				</div>
			</div>
		</div>
	)
}

export default SummonerPage