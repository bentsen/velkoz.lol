import {NextPage} from "next";
import {useRouter} from "next/router";
import {inferProcedureOutput} from "@trpc/server";
import {useProfileIcon} from "../../../../data/useProfileIcon";
import Image from "next/future/image"
import Container from "../../../../components/Container";
import {trpc} from "@/utils/trpc";
import {AppRouter} from "@/server/routers/_app";

type Summoner = inferProcedureOutput<AppRouter['summoner']['byName']>

const SummonerPage: NextPage = () => {
	const router = useRouter();
	const region = router.query.region as string;
	const summonerName = router.query.summonerName as string;

	const {data: summoner} = trpc.summoner.byName.useQuery({summonerName: summonerName, region: region})

	if (!summoner) return <div className={"text-white"}>Loading...</div>

	return (
		<Container>
			<SummonerHeader summoner={summoner}/>
			<div>
				Matches
			</div>
		</Container>
	)
}

const SummonerHeader = ({summoner}: {summoner: Summoner}) => {
	return (
		<div className={"py-6 flex flex-row w-full"}>
			<div className={"block"}>
				<Avatar
					img={useProfileIcon(summoner!.profileIconId)}
					lvl={summoner!.summonerLevel}
				/>
			</div>
				<div className={"flex flex-col ml-4"}>
					<h2 className={"text-white font-bold text-4xl"}>{summoner!.name}</h2>
					<div className={"flex justify-start mt-4"}>
						<button className={"bg-neutral-800 text-white rounded-2xl px-4 py-2 border-2 border-neutral-800 hover:border-neutral-600 outline-none focus:border-neutral-600 transition-all duration-100"}>
							Update
						</button>
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
				<div className={"w-24 h-24					"}>
					<Image src={img} alt={`Profile icon`} fill/>
				</div>
			</div>
		</div>
	)
}

export default SummonerPage