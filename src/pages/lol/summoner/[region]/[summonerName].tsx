import {NextPage} from "next";
import {useRouter} from "next/router";
import Image from "next/future/image"
import Container from "../../../../components/Container";
import {trpc} from "@/utils/trpc";
import {useContext, useState} from "react";
import {VersionContext} from "@/data/VersionContext";
import {TMatch, TMatches} from "@/server/routers/lol/matchRouter";
import {TSummoner} from "@/server/routers/lol/summonerRouter";
import {ChampionContext} from "@/data/ChampionContext";
import {formatTime} from "@/utils/formatTime";
import {time} from "@motionone/utils";
import {convertLaneName} from "@/utils/lanePosition";
import {ItemContext} from "@/data/ItemContext";
import {useItem} from "@/hooks/useItem";
import {LeagueIcon} from "@/components/LeagueHoverIcon/LeagueIcon";
import LeagueHoverIcon from "@/components/LeagueHoverIcon";
import {calcKDA} from "@/utils/calcMatchInfo";

const SummonerPage: NextPage = () => {
	const version = useContext(VersionContext);
	const router = useRouter();
	const region = router.query.region as string;
	const summonerName = router.query.summonerName as string;

	const summoner = trpc.summoner.byName.useQuery({name: summonerName, region: region});

	const matches = trpc.match.getMatches.useQuery({name: summonerName, region: region});
	const mutateMatch = trpc.match.update.useMutation({
		onSuccess: async () => {
			await summoner.refetch();
			await matches.refetch();
		}
	});

	const handleUpdate = async () => {
		mutateMatch.mutate({name: summonerName, region: region});
	}

	if (!summoner.data || !matches.data) return <div className={"text-white"}>Loading...</div>


	return (
		<Container>
			<div className={"py-6 flex flex-row w-full"}>
				<div className={"block"}>
					<Avatar
						img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.data.profileIconId}.png`}
						lvl={summoner.data.summonerLevel}
					/>
				</div>
				<div className={"flex flex-col ml-4"}>
					<h2 className={"text-white font-bold text-4xl"}>{summoner.data.name}</h2>
					<div className={"flex justify-start mt-4"}>
						<button
							className={"bg-neutral-900 text-white rounded-2xl px-4 py-2 border-2 border-neutral-900 hover:border-neutral-700 outline-none focus:border-neutral-700 transition-all duration-100"}
							onClick={handleUpdate}
							disabled={mutateMatch.isLoading}
						>
							{mutateMatch.isLoading ? (
								"Updating..."
							) : (
								<>
									{mutateMatch.isError ? (
										"Update failed!"
									) : null}
									{mutateMatch.isSuccess ? "Updated" : null}
									{!mutateMatch.isLoading && !mutateMatch.isSuccess && "Update"}
								</>
							)}
						</button>
						<div>
							{mutateMatch.error && <p>Fetch from server failed :( <br/> {mutateMatch.error.message}</p>}
						</div>
					</div>
				</div>
			</div>
			<div className={"flex flex-row"}>
				<MatchHistory summoner={summoner.data} matches={matches.data}/>
			</div>
		</Container>
	)
}

const MatchHistory = ({summoner, matches}: { summoner: TSummoner, matches: TMatches }) => {
	const sortedMatches = matches?.sort((a, b) => parseInt(b.info!.gameEndTimestamp) - parseInt(a.info!.gameEndTimestamp));
	return (
		<>
			<div className={"w-full py-2 rounded-2xl"}>
				{sortedMatches.map((match) => (
					<Match key={match.matchId} match={match} summoner={summoner}/>
				))}
			</div>
		</>
	)
}

const Match = ({match, summoner}: { match: TMatch, summoner: TSummoner }) => {
	const champContext = useContext(ChampionContext);
	const itemContext = useContext(ItemContext);
	if (!match || !match.info || !match.metaData || !summoner) return <div>Loading...</div>


	const sumInfo = match.info.participants.find(e => e.puuid == summoner?.puuid);
	const win = sumInfo?.win;
	const winBorder = win ? "border-blue-400" : "border-red-500";
	const winText = win ? "text-blue-400" : "text-red-500";
	const timeSince = formatTime(match.info.gameEndTimestamp);
	const lane = convertLaneName(sumInfo?.individualPosition ?? "Invalid");
	console.log(sumInfo?.individualPosition);

	const champ = champContext?.find((c) => parseInt(c.key) == sumInfo?.championId);

	return (
		<>
			<div
				className={`bg-grad w-full my-2 rounded-md bg-neutral-900 hover:bg-neutral-800 border-l-8 ${winBorder} cursor-pointer transition-all duration-100`}>
				<div className={"flex flex-col px-4"}>
					<div className={"mx-2 flex flex-row items-center justify-between"}>
						<h2 className={`text-2xl font-bold ${winText}`}>{win ? "Victory" : "Defeat"}</h2>
						<div className={"flex flex-row text-neutral-500 font-semibold items-center justify-end gap-2"}>
							<div className={"w-4 h-4 relative"}>
								<Image src={lane.imgUrl} alt={lane.role} fill sizes={"16px"}/>
							</div>
							<p>{lane.role}</p>
							<p> • </p>
							<p>{timeSince}</p>
						</div>
					</div>
					<div className={"flex flex-row px-2 py-4"}>
						<div className={"w-16 h-16 relative rounded-xl overflow-hidden mx-2"}>
							{champ ? (
								<Image src={champ ? champ.image.sprite : ""} alt={`Image of ${champ?.name}`}
									   className={"scale-[1.1]"} fill sizes={"128px"}/>
							) : (
								<div className={"bg-neutral-900 w-full h-full"}/>
							)}
						</div>

						<div className={"flex flex-col"}>
							<div className={"text-neutral-500"}>
								<h3 className={"text-md font-semibold"}>{calcKDA(sumInfo!.kills, sumInfo!.deaths, sumInfo!.assists)} KDA</h3>
								<p>{sumInfo?.kills}/{sumInfo?.deaths}/{sumInfo?.assists}</p>
							</div>
							<div className={"flex flex-row items-end gap-1.5"}>
								<ItemIcon itemId={sumInfo?.item0}/>
								<ItemIcon itemId={sumInfo?.item1}/>
								<ItemIcon itemId={sumInfo?.item2}/>
								<ItemIcon itemId={sumInfo?.item3}/>
								<ItemIcon itemId={sumInfo?.item4}/>
								<ItemIcon itemId={sumInfo?.item5}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const ItemIcon = ({itemId}: { itemId: number | undefined }) => {
	const item = useItem(itemId);
	return (
		<LeagueHoverIcon img={item?.image.full}>
			<div className={"flex flex-row items-center"}>
				<LeagueIcon img={item?.image.full}/>
				<div className={"flex flex-col pl-4"}>
					<h2>{item?.name}</h2>
					<p>{item?.gold.total}</p>
				</div>
			</div>
		</LeagueHoverIcon>
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
				<div className={"w-24 h-24"}>
					<Image src={img} alt={`Profile icon`} fill priority/>
				</div>
			</div>
		</div>
	)
}

export default SummonerPage