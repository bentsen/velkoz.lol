import {NextPage} from "next";
import {useRouter} from "next/router";
import {inferProcedureOutput} from "@trpc/server";
import Image from "next/future/image"
import Container from "../../../../components/Container";
import {trpc} from "@/utils/trpc";
import {AppRouter} from "@/server/routers/_app";
import {IMatch} from "@/utils/@types/lol/match";
import {useContext} from "react";
import {VersionContext} from "@/store/VersionContext";
import {TMatches} from "@/server/routers/lol/matchRouter";

const SummonerPage: NextPage = () => {
	const version = useContext(VersionContext);
	const router = useRouter();
	const region = router.query.region as string;
	const summonerName = router.query.summonerName as string;

	const {data: summoner} = trpc.summoner.byName.useQuery({name: summonerName, region: region});

	const {data: matches} = trpc.match.getMatches.useQuery({name: summonerName, region: region});
	const mutateMatch = trpc.match.update.useMutation();

	const handleUpdate = () => {
		mutateMatch.mutate({name: summonerName, region: region});
	}
	if (!summoner || !matches) return <div className={"text-white"}>Loading...</div>


	return (
		<Container>
			<div className={"py-6 flex flex-row w-full"}>
				<div className={"block"}>
					<Avatar
						img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
						lvl={summoner!.summonerLevel}
					/>
				</div>
				<div className={"flex flex-col ml-4"}>
					<h2 className={"text-white font-bold text-4xl"}>{summoner!.name}</h2>
					<div className={"flex justify-start mt-4"}>
						<button
							className={"bg-neutral-800 text-white rounded-2xl px-4 py-2 border-2 border-neutral-800 hover:border-neutral-600 outline-none focus:border-neutral-600 transition-all duration-100"}
							onClick={handleUpdate}
							disabled={mutateMatch.isLoading}
						>
							Update
						</button>
						<div>
							{mutateMatch.error && <p>Fetch from server failed :( <br /> {mutateMatch.error.message}</p>}
						</div>
					</div>
				</div>
			</div>
			<div className={"flex flex-row"}>
				<MatchHistory summonerName={summonerName} matches={matches}/>
			</div>
		</Container>
	)
}

const MatchHistory = ({summonerName, matches}: {summonerName: string, matches: TMatches}) => {
	return (
		<>
			<div className={"w-full px-4 py-2 rounded-2xl"}>
				{matches.map((match) => (
					<Match key={match.matchId} match={match} summonerName={summonerName}/>
				))}
			</div>
		</>
	)
}

const Match = ({match, summonerName}: {match: TMatches[0], summonerName: string}) => {
	const sumInfo = match.info?.participants.find(e => e.summonerName);
	const winColor = sumInfo?.win ? "bg-blue-700" : "bg-red-600";
	return (
		<>
			<div className={`w-full ${winColor} my-2 rounded-lg`}>
				<div className={"flex flex-row px-2 py-4"}>
					{match.matchId}
				</div>
			</div>
		</>
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