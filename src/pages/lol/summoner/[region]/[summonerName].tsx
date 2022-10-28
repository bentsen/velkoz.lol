import {NextPage} from "next";
import {useRouter} from "next/router";
import Image from "next/future/image";
import Container from "../../../../components/Container";
import {trpc} from "@/utils/trpc";
import {useContext, useEffect, useState} from "react";
import {VersionContext} from "@/data/VersionContext";
import {TMatch, TMatches} from "@/server/routers/lol/matchRouter";
import {TSummoner} from "@/server/routers/lol/summonerRouter";
import {ChampionContext} from "@/data/ChampionContext";
import {formatTime} from "@/utils/formatTime";
import {convertLaneName} from "@/utils/lanePosition";
import {calcChampFreq, calcChampWinRate, calcKDA, calcWinRate} from "@/utils/calcMatchInfo";
import Link from "next/link";
import ItemIcon from "@/components/LeagueIcons/ItemIcon";
import SumSpellIcon from "@/components/LeagueIcons/SumSpellIcon";
import SecRuneIcon from "@/components/LeagueIcons/SecRuneIcon";
import RuneIcon from "@/components/LeagueIcons/RuneIcon";
import Avatar from "@/components/LeagueIcons/Avatar";
import ChampImg from "@/components/LeagueIcons/ChampImg";
import {Participant} from "@/utils/@types/lol/match";
import {ISummoner} from "@/utils/@types/summoner.t";
import {set} from "zod";

const SummonerPage: NextPage = () => {
	const version = useContext(VersionContext);
	const router = useRouter();
	const region = router.query.region as string;
	const summonerName = router.query.summonerName as string;

	const summoner = trpc.summoner.byName.useQuery({
		name: summonerName,
		region: region,
	});
	const mutateSummoner = trpc.summoner.update.useMutation({
		onSuccess: async () => {
			await summoner.refetch();
		},
	});

	const matches = trpc.match.getMatches.useQuery({
		name: summonerName,
		region: region,
	});
	const mutateMatch = trpc.match.update.useMutation({
		onSuccess: async () => {
			await matches.refetch();
		},
	});

	const handleUpdate = async () => {
		mutateMatch.mutate({name: summonerName, region: region});
		mutateSummoner.mutate({name: summonerName, region: region});
	};

	return (
		<Container>
			<SummonerHeader
				summoner={summoner.data}
				handleUpdate={handleUpdate}
				isLoading={mutateSummoner.isLoading}
			/>
			{summoner.data && (
				<div className={"flex flex-row"}>
					<MatchHistory summoner={summoner.data} matches={matches.data}/>
				</div>
			)}
		</Container>
	);
};

const SummonerHeader = ({
							summoner,
							handleUpdate,
							isLoading,
						}: {
	summoner: TSummoner | undefined;
	handleUpdate: () => void;
	isLoading: boolean;
}) => {
	const version = useContext(VersionContext);
	const date = new Date(summoner ? summoner.lastUpdated : Date.now());
	const lastUpdated = formatTime(date.getTime());
	const [scrolled, setScrolled] = useState(false);

	const scrollDistance = 150;

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScrolled(window.scrollY < scrollDistance);
		});
	}, [setScrolled])

	return (
		<>
			<header className={`${!scrolled ? "opacity-0" : "opacity-100 translate-y-8"} flex bg-bg-brand-600 flex-row w-full transition-all duration-200`}>
				{!summoner ? (
					<>
						<div className={"block"}>
							<div
								className={
									"relative border-2 border-neutral-900 bg-neutral-800 rounded-2xl w-24 h-24"
								}
							/>
						</div>
					</>
				) : (
					<>
						<div className={"block"}>
							<Avatar
								img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
								lvl={summoner.summonerLevel}
							/>
						</div>
						<div className={"flex flex-col ml-4"}>
							<h2 className={"text-white font-bold text-4xl"}>
								{summoner.name}
							</h2>
							<div className={"flex justify-start mt-4"}>
								<button
									className={
										"bg-brand-500 text-white rounded-2xl px-4 py-2 outline-none border-2 border-brand-500 hover:border-brand-400 focus:border-brand-400 transition-all duration-100"
									}
									onClick={handleUpdate}
									disabled={isLoading}
								>
									{isLoading ? "Updating..." : "Update"}
								</button>
							</div>
							{summoner.lastUpdated && (
								<p className={"text-sm text-neutral-700 font-semibold"}>
									{lastUpdated}
								</p>
							)}
						</div>
					</>
				)}
			</header>
			<header className={`${scrolled ? "opacity-0" : "opacity-100"} transition-all duration-200 bg-bg-brand sticky top-0 py-4 z-50`}>
				{!summoner ? (
					<>
						<div className={"block"}>
							<div
								className={
									"relative border-2 border-neutral-900 bg-neutral-800 rounded-2xl w-12 h-12"
								}
							/>
						</div>
					</>
				) : (
					<>
						<div className={`flex flex-row ${scrolled ? "translate-y-5" : "translate-y-0"} transition-all duration-200`}>
							<div className={"block mx-3"}>
								<Avatar
									img={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`}
									size={"sm"}
								/>
							</div>
							<h2 className={"text-white font-bold text-2xl"}>
								{summoner.name}
							</h2>
						</div>
					</>
				)}
			</header>
		</>
	);
};

const MatchHistory = ({
						  summoner,
						  matches,
					  }: {
	summoner: TSummoner;
	matches: TMatches | undefined;
}) => {
	if (!matches) return <div>Loading...</div>;
	const sortedMatches = matches?.sort(
		(a, b) =>
			parseInt(b.info!.gameEndTimestamp) - parseInt(a.info!.gameEndTimestamp)
	);

	const times = 20;

	const champFreq = calcChampFreq(summoner?.puuid, matches, times);
	const [wins, loses] = calcWinRate(summoner?.puuid, matches, times);
	return (
		<>
			<div className={"w-full flex flex-col"}>
				<div className={"bg-brand-500 mb-2 rounded-xl"}>
					<div
						className={"flex flex-row justify-between items-center px-7 py-2"}
					>
						<div className={"inline-block"}>
							<p>Last {times} games</p>
							<p>
								{wins}W-{loses}L
							</p>
						</div>
						<div className={"flex flex-row gap-4"}>
							{champFreq ? (
								champFreq.map((c) => (
									<div key={c.champId} className={"flex flex-row items-center"}>
										<ChampImg champId={c.champId} size={"lg"}/>
										<div className={"mx-3 flex flex-col"}>
											<div className={"inline-flex"}>
												<p>
													{calcChampWinRate(c.wins, c.played)}% - {c.wins}W - {c.played - c.wins}L
												</p>
											</div>
										<p className={"text-neutral-500"}>{calcKDA(c.kills, c.deaths, c.assists)} KDA</p>
										</div>
									</div>
							)
							)): <p>Could not calculate :(</p>}
						</div>
					</div>
				</div>
				<div className={"rounded-xl bg-brand-500 overflow-auto"}>
					{sortedMatches.map((match) => (
						<Match key={match.matchId} match={match} summoner={summoner}/>
					))}
				</div>
			</div>
		</>
	);
};

const Match = ({match, summoner}: { match: TMatch; summoner: TSummoner }) => {
	const champContext = useContext(ChampionContext);
	if (!match || !match.info || !match.metaData || !summoner)
		return <div>Loading...</div>;

	const team1Participants = match.info.participants.slice(0, 5);
	const team2Participants = match.info.participants.slice(5, 10);

	const sumInfo = match.info.participants.find(
		(e) => e.puuid == summoner?.puuid
	);
	const win = sumInfo?.win;
	const winBorder = win ? "border-blue-400" : "border-red-500";
	const winText = win ? "text-blue-400" : "text-red-500";
	const timeSince = formatTime(match.info.gameEndTimestamp);
	const lane = convertLaneName(sumInfo?.individualPosition ?? "Invalid");

	const keyStoneId = sumInfo?.perks?.styles[0].selections[0].perk;
	const secondRune = sumInfo?.perks?.styles[1].style;

	const champ = champContext?.find(
		(c) => parseInt(c.key) == sumInfo?.championId
	);
	return (
		<>
			<Link href={"/"} passHref>
				<div
					className={`w-full bg-brand-500 active:bg-brand-400 hover:bg-brand-400 border-l-8 ${winBorder} cursor-pointer transition-all duration-100`}
				>
					<div className={"flex flex-col px-4 border-b border-b-neutral-800"}>
						<div className={"mx-2 flex flex-row items-center justify-end"}>
							<div
								className={
									"flex flex-row text-neutral-500 font-semibold items-center justify-end gap-2"
								}
							>
								<div className={"w-4 h-4 relative"}>
									<Image
										src={lane.imgUrl}
										alt={lane.role}
										fill
										sizes={"16px"}
									/>
								</div>
								<p>{lane.role}</p>
								<p> • </p>
								<p>{timeSince}</p>
							</div>
						</div>
						<div className={"flex flex-row items-center justify-between px-2 py-4"}>
							<div className={"flex flex-row items-center"}>
								{champ && <ChampImg champId={champ.key} size={"2xl"}/>}
								<div className={"flex flex-col items-center pr-2 gap-1.5"}>
									<RuneIcon keystoneId={keyStoneId}/>
									<SecRuneIcon keystoneId={secondRune}/>
								</div>
								<div className={"flex flex-col items-center pr-2 gap-1.5"}>
									<SumSpellIcon spellId={sumInfo?.summoner1Id}/>
									<SumSpellIcon spellId={sumInfo?.summoner2Id}/>
								</div>
							</div>

							<div className={"flex flex-col text-center text-white gap-1.5"}>
								<h2 className={`text-3xl font-bold ${winText} justify-center`}>
									{win ? "Victory" : "Defeat"}
								</h2>
								<div className={"block text-neutral-400 text-4xl"}>
									<span className={"text-white font-semibold"}>
										{sumInfo?.kills}
									</span>
									{" / "}
									<span className={"font-semibold text-white"}>
										{sumInfo?.deaths}
									</span>
									{" / "}
									<span className={"text-white font-semibold"}>
										{sumInfo?.assists}
									</span>
								</div>
								<p className={"font-semibold text-neutral-400 text-lg"}>
									{calcKDA(sumInfo!.kills, sumInfo!.deaths, sumInfo!.assists)}{" "}
									KDA
								</p>
							</div>
							<div className={"flex flex-col gap-1"}>
								<div className={"flex flex-row items-end gap-1"}>
									<ItemIcon itemId={sumInfo?.item0}/>
									<ItemIcon itemId={sumInfo?.item1}/>
									<ItemIcon itemId={sumInfo?.item2}/>
									<ItemIcon itemId={sumInfo?.item6}/>
								</div>
								<div className={"flex flex-row items-end gap-1"}>
									<ItemIcon itemId={sumInfo?.item3}/>
									<ItemIcon itemId={sumInfo?.item4}/>
									<ItemIcon itemId={sumInfo?.item5}/>
								</div>
							</div>
							<div className={"flex flex-row gap-2"}>
								<div className={"flex flex-col text-neutral-500"}>
									{team1Participants.map((p) => (
										<div key={p.summonerName}>
											<Link href={`/lol/summoner/euw1/${p.summonerName}`} passHref>
												<div className={"flex flex-row items-center w-32"}>
													<ChampImg champId={p.championId.toString()}/>
													<a className={`pl-1 pt-1 truncate ${p.summonerName == summoner.name && "font-bold"} hover:underline`}>
														{p.summonerName}
													</a>
												</div>
											</Link>
										</div>
									))}
								</div>
								<div className={"flex flex-col text-neutral-500"}>
									{team2Participants.map((p) => (
										<div key={p.summonerName}>
											<Link href={`/lol/summoner/euw1/${p.summonerName}`} passHref>
												<div className={"flex flex-row items-center w-32"}>
													<ChampImg champId={p.championId.toString()}/>
													<a className={`pl-1 pt-1 truncate ${p.summonerName == summoner.name && "font-bold"} hover:underline`}>
														{p.summonerName}
													</a>
												</div>
											</Link>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default SummonerPage;
