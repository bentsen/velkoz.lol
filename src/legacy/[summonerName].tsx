import Image from "next/future/image";
import Match from "../components/Match";
import {motion} from "framer-motion";
import axios from "axios";
import {ISummoner} from "reksai/src/@types/summoner";
import {IMatch, Participant} from "reksai/src/@types/match";
import useSWR from 'swr'
import DoughnutChart from "../components/DoughnutChart";
import {useRouter} from "next/router";
import {ILeagueEntry} from "reksai/src/@types/league";
import {useContext, useState} from "react";
import Link from "next/link";
import {VersionContext} from "../store/VersionContext";


const Account = () => {
	const [updateLoading, setUpdateLoading] = useState(false)

	const router = useRouter()
	/**/
	const [matchesToShow, setMatchesToShow] = useState(20)
	/*fetcher engine*/
	const fetcher = async (url: string) => await axios.get(url).then((res) => res.data)
	const version = useContext(VersionContext);

	/*Summoner fetcher using SWR and axios*/
	const {
		data: summoner,
		error: summonerError,
		mutate: mutateSummoner
	} = useSWR<ISummoner>("/api/lol/summoners/by-name/" + router.query.summonerName + "?region=" + router.query.region, fetcher)
	/*Match fetcher using SWR and axios*/
	const {
		data: matches,
		mutate: mutateMatch
	} = useSWR<IMatch[]>("/api/lol/summoners/matches?summonerName=" + router.query.summonerName + "&region=" + router.query.region, fetcher)
	/*Rank fetcher using SWR and axios*/
	const {
		data: ranks,
		mutate: mutateRank
	} = useSWR<ILeagueEntry[]>("/api/lol/league/" + summoner?.id + "?region=" + router.query.region, fetcher)
	/*Icon url*/
	const icon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner?.profileIconId}.png`

	/*Sorting match array by TimeStamp*/
	const sortMatches = () => {
		matches?.sort(function (x, y) {
			return Number(y.info.gameEndTimestamp) - Number(x.info.gameEndTimestamp)
		})
	}

	/*Update summoner in database*/
	const updateSummoner = async () => {
		setUpdateLoading(true)
		console.log("jeg opdatere summoner")
		const response = await axios.put<ISummoner>("/api/lol/summoners/by-name/" + router.query.summonerName + "?region=" + router.query.region);
		if (response.status !== 200) {
			console.log("something went wrong updating summoner")
		} else {
			console.log("jeg blev færdig med summoner")
			await mutateSummoner();
		}
		console.log("jeg opdatere matches")
		const matchResponse = await axios.put<IMatch[]>("/api/lol/summoners/matches?summonerName=" + router.query.summonerName + "&region=" + router.query.region)
		if (matchResponse.status !== 200) {
			console.log("something went wrong updating matches")
		} else {
			console.log("jeg blev færdig med matches")
			await mutateMatch();
			setUpdateLoading(false)
		}
	}

	/*Calculates the win rate of a summoner*/
	const calculateWinRate = (wins: number, loss: number) => {
		const sum = wins + loss
		const deci = wins / sum
		const winrate = deci * 100

		return Math.round(winrate)
	}

	/*Calculates a summoner favorite position by reason matches*/
	const getFavoritePosition = () => {
		if (matches == undefined) return;
		let positionArray: string[] = []
		for (let i = 0; i < matches.length; i++) {
			positionArray.push(getSummerParticipantFromMatch(matches[i])?.individualPosition as string)
		}

		const occurrences = positionArray.reduce(function (acc: any, curr: any) {
			return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc;
		}, {})


		const favoriteLane = Object.keys(occurrences).reduce((a, b) => occurrences[a] > occurrences[b] ? a : b)

		/*gallar map*/
		const laneTypes = new Map([
			["TOP", {
				role: "Top",
				imgUrl: "/lol/positions/icon-position-top-dark.svg",
			}],
			["JUNGLE", {
				role: "Jungle",
				imgUrl: "/lol/positions/icon-position-jng-dark.svg",
			}],
			["MIDDLE", {
				role: "Mid",
				imgUrl: "/lol/positions/icon-position-mid-dark.svg"
			}],
			["BOTTOM", {
				role: "Bot",
				imgUrl: "/lol/positions/icon-position-bot-dark.svg",
			}],
			["SUPPORT", {
				role: "Support",
				imgUrl: "/lol/positions/icon-position-sup-dark.svg",
			}],
			["Invalid", {
				role: "Invalid",
				imgUrl: "/lol/positions/icon-position-sup-dark.svg",
			}],
		])


		return laneTypes.get(favoriteLane);
	}

	/*Identifies the summoner in all matches*/
	const getSummerParticipantFromMatch = (match: IMatch) => {
		let participant: Participant

		for (let i = 0; i < match.info.participants.length; i++) {
			if (match.info.participants[i]?.puuid != undefined) {
				if (match.info.participants[i]?.puuid == summoner?.puuid) {
					return participant = match.info.participants[i]
				}
			} else {
				console.log("undefined")
				return null
			}
		}
	}

	/*Gets the total kills by the summoner team*/
	const getTeamKillsRecentGames = () => {
		let number1: number = 0
		let number2: number = 0

		if (matches != undefined) {
			for (let i = 0; i < matches.length; i++) {
				for (let j = 0; j < matches[i].info.teams.length; j++) {
					if (matches[i].info.teams[j].teamId == getSummerParticipantFromMatch(matches[i])?.teamId) {
						number1 = matches[i].info.teams[j].objectives.champion.kills
						number2 = number2 + number1
					}
				}
			}
		}
		return number2
	}

	/*Calculates the average kills in all recent games*/
	const calculateAverageKillsRecentGames = () => {
		let totalKills: number = 0
		let numberOfmatches: number = 0
		if (matches != undefined) {
			for (let i = 0; i < matches.length; i++) {
				const kills = getSummerParticipantFromMatch(matches[i])?.kills
				if (kills != undefined) {
					totalKills = totalKills + kills
					numberOfmatches = numberOfmatches + 1
				}
			}
		}
		const averageKills = totalKills / numberOfmatches
		return parseFloat(String(averageKills)).toFixed(1)
	}

	/*Calculates the average assists in all recent games*/
	const calculateAverageAssistsRecentGames = () => {
		let totalAssists: number = 0
		let numberOfmatches: number = 0
		if (matches != undefined) {
			for (let i = 0; i < matches.length; i++) {
				const assists = getSummerParticipantFromMatch(matches[i])?.assists
				if (assists != undefined) {
					totalAssists = totalAssists + assists
					numberOfmatches = numberOfmatches + 1
				}
			}
		}
		const averageAssists = totalAssists / numberOfmatches
		return parseFloat(String(averageAssists)).toFixed(1)
	}

	/*Calculates the average deaths in all recent games*/
	const calculateAverageDeathsRecentGames = () => {
		let totalDeaths: number = 0
		let numberOfmatches: number = 0
		if (matches != null) {
			for (let i = 0; i < matches.length; i++) {
				const deaths = getSummerParticipantFromMatch(matches[i])?.deaths
				if (deaths != undefined) {
					totalDeaths = totalDeaths + deaths
					numberOfmatches = numberOfmatches + 1
				}
			}
		}
		const averageDeaths = totalDeaths / numberOfmatches
		return parseFloat(String(averageDeaths)).toFixed(1)
	}

	/*Calculates summoner kill participation in all recent games*/
	const calculateKillPerticipationRecentGames = () => {
		const teamKill = getTeamKillsRecentGames()
		let number1: number = 0
		let number2: number = 0
		let number3: number = 0

		if (matches != undefined) {
			for (let i = 0; i < matches.length; i++) {
				const personalKills = getSummerParticipantFromMatch(matches[i])?.kills
				const personalAssits = getSummerParticipantFromMatch(matches[i])?.assists

				if (teamKill != undefined && personalKills != undefined && personalAssits != undefined) {
					const sum = personalKills + personalAssits
					number1 = sum;
					number2 = number2 + sum
				}
			}
		}

		const kp = (number2 / teamKill) * 100
		return Math.round(kp)
	}

	const getFavoriteChamp = () => {
		let champions = []

		/*gets all items names and save in array*/
		if (matches == undefined) return
		for (let i = 0; i < matches?.length; i++) {
			champions.push(getSummerParticipantFromMatch(matches[i])?.championName)
		}

		/*creates object with the name of champion with value of how many times it occurs*/
		const occurrences = champions.reduce(function (acc: any, curr: any) {
			if (!curr) return
			return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
		}, {})

		return Object.keys(occurrences).reduce((a, b) => occurrences[a] > occurrences[b] ? a : b)
	}

	const calculateChampFrequency = () => {
		let champions = []
		let topThreeChampions = []

		/*gets all items names and save in array*/
		if (matches == undefined) return
		for (let i = 0; i < matches?.length; i++) {
			champions.push(getSummerParticipantFromMatch(matches[i])?.championName)
		}

		/*creates object with the name of champion with value of how many times it occurs*/
		const occurrences = champions.reduce(function (acc: any, curr: any) {
			if (!curr) return
			return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
		}, {})

		for (const key in occurrences) {
			let wins: number = 0
			if (matches == undefined) return;
			for (let i = 0; i < matches.length; i++) {
				for (let j = 0; j < matches[i].info.participants.length; j++) {
					if (matches[i].info.participants[j]?.puuid != undefined) {
						if (matches[i].info.participants[j].puuid == summoner?.puuid) {
							if (matches[i].info.participants[j].championName == key) {
								if (matches[i].info.participants[j].win) {
									wins = wins + 1
								}
							}
						}
					}
				}
			}
			if (occurrences[key] >= 2) {
				const champion = {
					name: key,
					games: occurrences[key],
					wins: wins,
				}
				topThreeChampions.push(champion)
			}
		}
		return topThreeChampions.sort((a, b) => b.games - a.games)
	}

	/*calculate frequency of champs played by summoner (should be refactored)*/
	const calculateTopChampions = () => {
		let champions = []
		let topThreeChampions = []

		/*gets all items names and save in array*/
		if (matches == undefined) return
		for (let i = 0; i < matches?.length; i++) {
			champions.push(getSummerParticipantFromMatch(matches[i])?.championName)
		}

		/*creates object with the name of champion with value of how many times it occurs*/
		const occurrences = champions.reduce(function (acc: any, curr: any) {
			if (!curr) return
			return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
		}, {})

		/*deletes the champion with the smallest value until it has the three highest*/
		for (let i = 0; Object.keys(occurrences).length > 3; i++) {
			let key = Object.keys(occurrences).reduce((key, v) => occurrences[v] < occurrences[key] ? v : key);
			delete occurrences[key]
		}

		for (const key in occurrences) {
			let wins: number = 0
			if (matches == undefined) return
			for (let i = 0; i < matches.length; i++) {
				for (let j = 0; j < matches[i].info.participants.length; j++) {
					if (matches[i].info.participants[j]?.puuid != undefined) {
						if (matches[i].info.participants[j].puuid == summoner?.puuid) {
							if (matches[i].info.participants[j].championName == key) {
								if (matches[i].info.participants[j].win) {
									wins = wins + 1
								}
							}
						}
					}
				}
			}
			const champion = {
				name: key,
				games: occurrences[key],
				wins: wins
			}
			topThreeChampions.push(champion)
		}
		return topThreeChampions.sort((a, b) => b.games - a.games)
	}

	const getRecentlyPlayedWith = () => {
		const getRecentlyPlayedWith = () => {
			const participants = []
			let favoriteParticipants = []

			if (matches != undefined) {
				for (let i = 0; i < matches.length; i++) {
					for (let j = 0; j < matches[i].info.participants.length; j++) {
						if (matches[i].info.participants[j]?.puuid != undefined) {
							if (matches[i].info.participants[j].teamId == getSummerParticipantFromMatch(matches[i])?.teamId) {
								if (matches[i].info.participants[j].puuid != getSummerParticipantFromMatch(matches[i])?.puuid) {
									participants.push(matches[i].info.participants[j].summonerName)
								}
							}
						}
					}
				}
			}
			const occurrences = participants.reduce(function (acc: any, curr: any) {
				if (!curr) return
				return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
			}, {})

			for (const key in occurrences) {
				let summonerIcon: number = 0
				let wins: number = 0
				if (matches != undefined) {
					for (let i = 0; i < matches.length; i++) {
						for (let j = 0; j < matches[i].info.participants.length; j++) {
							if (matches[i].info.participants[j]?.puuid != undefined) {
								if (matches[i].info.participants[j].summonerName == key) {
									summonerIcon = matches[i].info.participants[j].profileIcon
									if (matches[i].info.participants[j].win) {
										wins += 1
									}
								}
							}
						}
					}
				}

				if (occurrences[key] >= 2) {
					const newObj = {
						name: key,
						games: occurrences[key],
						wins: wins,
						icon: summonerIcon
					}
					favoriteParticipants.push(newObj)
				}
			}
			return favoriteParticipants.sort((a, b) => b.games - a.games)
		}

		/*Calculates summoner kda in all recent games*/
		const calculateKDARecentGames = () => {
			let number1: number = 0
			let number2: number = 0
			let number3: number = 0

			if (matches != undefined) {
				for (let i = 0; i < matches.length; i++) {
					const kills = getSummerParticipantFromMatch(matches[i])?.kills
					const deaths = getSummerParticipantFromMatch(matches[i])?.deaths
					const assists = getSummerParticipantFromMatch(matches[i])?.assists

					if (kills != undefined && deaths != undefined && assists != undefined) {
						const temp = (kills + assists) / deaths

						number1 = temp
						number2 = number2 + temp
						number3 = number3 + 1
					} else {
						console.log("undefined")
					}
				}
			}

			number2 = number2 / number3
			return parseFloat(String(number2)).toFixed(2)
		}

		/*get wins for all recent games*/
		const getWinsRecentGames = () => {
			let wins: number = 0

			if (matches != undefined) {
				for (let i = 0; i < matches.length; i++) {
					for (let j = 0; j < matches[i].info.participants.length; j++) {
						if (matches[i].info.participants[j]?.puuid != undefined) {
							if (matches[i].info.participants[j].puuid == summoner?.puuid) {
								if (matches[i].info.participants[j].win) {
									wins = wins + 1
								}
							}
						}
					}
				}
			}

			return wins
		}

		/*get losses for all recent games*/
		const getLossesRecentGames = () => {
			let losses: number = 0

			if (matches != undefined) {
				for (let i = 0; i < matches.length; i++) {
					for (let j = 0; j < matches[i].info.participants.length; j++) {
						if (matches[i].info.participants[j]?.puuid != undefined) {
							if (matches[i].info.participants[j].puuid == summoner?.puuid) {
								if (!matches[i].info.participants[j].win) {
									losses = losses + 1
								}
							}
						}
					}
				}
			}
			return losses
		}

		const goToSummoner = (e: any, summonerName: string) => {
			e.preventDefault()
			router.push(`/lol/summoner/${summonerName}?region=${router.query.region}`)
		}

		const romanToInt = (roman: string) => {

			const values = new Map([
				['I', 1],
				['V', 5],
				['X', 10]
			]);

			let result = 0,
				current, previous = 0;
			for (const char of roman.split("").reverse()) {
				current = values.get(char);
				if (current != undefined) {
					if (current >= previous) {
						result += current;
					} else {
						result -= current;
					}
					previous = current;
				}
			}
			return result;
		}

		/*OnClick go to the champ profile*/
		const goToChamp = (e: any, champName: string | undefined) => {
			e.preventDefault()
			router.push(`/lol/champions/${champName}`)
		}

		const showMore = () => {
			if (matches == undefined) return
			if (matchesToShow + 20 > matches?.length) {
				setMatchesToShow(matches?.length)
			} else {
				setMatchesToShow(matchesToShow + 20)
			}
		}


		return (
			<>
				<div className={"block w-full my-0 mx-auto"}>
					{summonerError ? (
						<div className={"flex justify-center items-center mt-10"}>
							<h1 className={"text-white text-xl"}>This summoner does not exist. Please check
								spelling</h1>
						</div>
					) : summoner ? (
						<div className={"w-[1080px] my-0 mx-auto"}>
							<div className={"h-64 overflow-hidden"}>
								<div
									className={`inline-block mt-8 w-[1080px] h-52 pb-2 bg-summoner-light rounded bg-cover relative`}>
									{matches ? (
										<img
											className={"w-full h-full object-cover absolute rounded h-[18.75rem] object-[0_20%]"}
											src={`https://ddragon.canisback.com/img/champion/centered/${getFavoriteChamp()}_0.jpg`}/>
									) : ""}
									<div className={"w-full absolute"}>
										<div className={"pl-6 mt-2"}>
											<div className={"inline-block"}>
												<Image className={"rounded-3xl"} src={icon} width={100} height={100}
													   alt={"match"}/>
												<div className={"relative -mt-5 text-center text-white"}>
													<span
														className={"inline-block bg-summoner-dark leading-5 rounded-lg px-2 text-xs"}>{summoner.summonerLevel}</span>
												</div>
											</div>
											<div className={"inline-block align-top pt-6 pl-5"}>
												<p className={"text-white text-2xl font-bold font-heading"}>{summoner.name}</p>
												<p className={"text-summoner-gray text-xs mt-2"}>Ladder Rank:</p>
											</div>
										</div>
										<div className={"pl-6"}>
											<div className={"mt-3 flex flex-row"}>
												<motion.button onClick={updateSummoner} whileHover={{scale: 1.1}}
															   className={"bg-lol-color text-white w-16 h-10 rounded text-sm font-heading"}>
													{updateLoading ? (
														<div className={"flex justify-center"}>
															<div role="status">
																<svg aria-hidden="true"
																	 className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
																	 viewBox="0 0 100 101" fill="none"
																	 xmlns="http://www.w3.org/2000/svg">
																	<path
																		d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
																		fill="currentColor"/>
																	<path
																		d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
																		fill="currentFill"/>
																</svg>
																<span className="sr-only">Loading...</span>
															</div>
														</div>
													) : ("Update")}
												</motion.button>
												<motion.button whileHover={{scale: 1.1}}
															   className={"bg-transparent border-lol-color border ml-2 text-lol-color w-20 h-10 rounded text-sm font-heading"}>Tier-Graph
												</motion.button>
											</div>
											<p className={"text-summoner-gray text-xs mt-2"}>Last updated:</p>
										</div>
									</div>
								</div>
							</div>
							<div className={"block w-[1080px] my-0 mx-auto"}>
								<div className={"inline-block w-[332] align-top min-h-[870px]"}>
									{ranks?.length != 0 ? (
										ranks?.map((rank) => (
											<div key={rank.leagueID}
												 className={"divide-y divide-black bg-summoner-light mt-2 w-80 h-auto text-white rounded"}>
												<div className={"h-7 flex items-center"}>
													<p className={"text-sm ml-2"}>{rank.queueType == "Ranked_SOLO_5x5" ? "Ranked Solo" : "Ranked Flex"}</p>
												</div>
												<div className={"flex flex-row"}>
													<div className={"flex items-center w-[600px] mb-2"}>
														<div
															className={"bg-summoner-dark mt-2 rounded-full flex justify-center items-center w-20 h-20 ml-2"}>
															<Image src={`/lol/medals/${rank.tier.toLowerCase()}.webp`}
																   width={60} height={60} alt={"flex-rank-emblem"}/>
														</div>
														<div className={"flex flex-col ml-2 capitalize"}>
															<p className={"text-md font-bold"}>{rank.tier.toLowerCase()} {romanToInt(rank.rank)}</p>
															<p className={"text-xs text-summoner-gray"}>{rank.leaguePoints} LP</p>
														</div>
													</div>
													<div className={"flex w-full justify-end items-center mr-2"}>
														<div className={"flex flex-col text-xs"}>
															<div className={"flex justify-end"}>
																<p className={"text-md text-summoner-gray"}>{rank.wins}W {rank.losses}L</p>
															</div>
															<p className={"text-xs text-summoner-gray"}>Win
																Rate {calculateWinRate(rank.wins, rank.losses)}%</p>
														</div>
													</div>
												</div>
											</div>
										))
									) : (
										<div>
											<div className={"mt-[8px] rounded bg-summoner-dark block"}>
												<div
													className={"flex justify-between leading-[35px] pt-0 pb-0 pl-[12px] pr-[12px] text-[14px] text-white"}>
													Ranked Solo
													<span
														className={"text-[14px] font-bold text-gray-600"}>Unranked</span>
												</div>
											</div>
											<div className={"mt-[8px] rounded bg-summoner-dark block"}>
												<div
													className={"flex justify-between leading-[35px] pt-0 pb-0 pl-[12px] pr-[12px] text-[14px] text-white"}>
													Ranked Flex
													<span
														className={"text-[14px] font-bold text-gray-600"}>Unranked</span>
												</div>
											</div>
										</div>
									)}
									<div
										className={"divide-y divide-black bg-summoner-light mt-2 w-80 h-auto text-white rounded"}>
										<div className={"pt-2 pb-2"}>
											<p className={"text-md ml-2 font-medium"}>Recently played with</p>
										</div>
										<table
											className={"w-full table-fixed border-collapse border-spacing-0 table mt-1"}>
											<colgroup className={"table-column-group border-collapse border-spacing-0"}>
												<col className={"table-column"}/>
												<col className={"w-[60px] table-column"} width={"60"}/>
												<col className={"w-[60px] table-column"} width={"60"}/>
												<col className={"w-[60px] table-column"} width={"60"}/>
											</colgroup>
											<thead className={"table-header-group align-middle border-collapse"}>
											<tr className={"table-row align-middle border-collapse border-spacing-0"}>
												<th className={"pl-3 pt-3 pb-3 text-left bg-summoner-dark text-summoner-gray text-xs font-normal"}
													scope={"col"}>
													Summoner
												</th>
												<th className={"pt-3 pb-3 bg-summoner-dark text-summoner-gray text-xs font-normal"}
													scope={"col"}>
													Played
												</th>
												<th className={"pt-3 pb-3 bg-summoner-dark text-summoner-gray text-xs font-normal"}
													scope={"col"}>
													W-L
												</th>
												<th className={"pt-3 pb-3 pr-3 text-right bg-summoner-dark text-summoner-gray text-xs font-normal"}
													scope={"col"}>Win
													Ratio
												</th>
											</tr>
											</thead>
											<tbody
												className={"table-row-group align-middle border-collapse border-spacing-0"}>
											{getRecentlyPlayedWith().map((participant) => (
												<tr key={participant.name}
													className={"border-t border-solid align-middle border-black"}>
													<td className={"text-left pl-[12px] whitespace-nowrap text-ellipsis overflow-hidden pt-[4px] pb-[4px] m-0 table-cell"}>
														<Link href={`/lol/summoner/${participant.name}`} passHref>
															<div
																className={"text-gray-300 text-[12px] decoration-0 cursor-pointer hover:underline"}>
																<img
																	className={"w-[24px] h-[24px] rounded-full mr-[8px] align-middle inline-block"}
																	src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${participant.icon}.png`}
																	alt={"image of champ"}/>
																{participant.name}
															</div>
														</Link>
													</td>
													<td className={"pt-1 pb-1 text-summoner-gray text-xs text-center"}>
														{participant.games}
													</td>
													<td className={"pt-1 pb-1 text-summoner-gray text-xs text-center"}>
														{participant.wins}-{(participant.games - participant.wins)}
													</td>
													<td className={"pt-1 pb-1 text-summoner-gray text-xs text-center"}>
														{calculateWinRate(participant.wins, (participant.games - participant.wins))}%
													</td>
												</tr>
											))}
											</tbody>
										</table>
									</div>
									<div
										className={"divide-y divide-black bg-summoner-light mt-2 w-80 h-auto text-white rounded"}>
										<div className={"pt-2 pb-2"}>
											<p className={"text-md ml-2 font-medium"}>Recently champs played</p>
										</div>
										<table
											className={"w-full table-fixed border-collapse border-spacing-0 table mt-1"}>
											<colgroup className={"table-column-group border-collapse border-spacing-0"}>
												<col className={"table-column"}/>
												<col className={"w-[60px] table-column"} width={"60"}/>
												<col className={"w-[60px] table-column"} width={"60"}/>
												<col className={"w-[60px] table-column"} width={"60"}/>
											</colgroup>
											<thead className={"table-header-group align-middle border-collapse"}>
											<tr className={"table-row align-middle border-collapse border-spacing-0"}>
												<th className={"pl-3 pt-3 pb-3 text-left bg-summoner-dark text-summoner-gray text-xs font-normal"}
													scope={"col"}>
													Champion
												</th>
												<th className={"pt-3 pb-3 bg-summoner-dark text-summoner-gray text-xs font-normal"}
													scope={"col"}>
													Played
												</th>
												<th className={"pt-3 pb-3 bg-summoner-dark text-summoner-gray text-xs font-normal"}
													scope={"col"}>
													W-L
												</th>
												<th className={"pt-3 pb-3 pr-3 text-right bg-summoner-dark text-summoner-gray text-xs font-normal"}
													scope={"col"}>Win
													Ratio
												</th>
											</tr>
											</thead>
											<tbody
												className={"table-row-group align-middle border-collapse border-spacing-0"}>
											{calculateChampFrequency()?.map((champ) => (
												<tr key={champ.name}
													className={"border-t border-solid align-middle border-black"}>
													<td className={"text-left pl-[12px] whitespace-nowrap text-ellipsis overflow-hidden pt-[4px] pb-[4px] m-0 table-cell"}>
														<div onClick={() => goToChamp(event, champ.name)}
															 className={"text-gray-300 text-[12px] decoration-0 cursor-pointer hover:underline"}>
															<img
																className={"w-[24px] h-[24px] rounded-full mr-[8px] align-middle inline-block"}
																src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.name}.png`}
																alt={"image of champ"}/>
															{champ.name}
														</div>
													</td>
													<td className={"pt-1 pb-1 text-summoner-gray text-xs text-center"}>
														{champ.games}
													</td>
													<td className={"pt-1 pb-1 text-summoner-gray text-xs text-center"}>
														{champ.wins}-{(champ.games - champ.wins)}
													</td>
													<td className={"pt-1 pb-1 text-summoner-gray text-xs text-center"}>
														{calculateWinRate(champ.wins, (champ.games - champ.wins))}%
													</td>
												</tr>
											))}
											</tbody>
										</table>
									</div>
								</div>
								<div className={"inline-block w-[752px] mt-2 ml-2 align-top"}>
									<div
										className={"divide-y divide-black bg-summoner-light w-full h-48 text-white rounded-t"}>
										<div className={"h-7 flex items-center"}>
											<p className={"text-md ml-2 font-medium"}>Match History Stats</p>
										</div>
										<div>
											{matches ? (
												<div className={"flex flex-row gap-4"}>
													<div
														className={"flex flex-col items-center justify-end h-full w-32 text-xs text-summoner-gray mt-3"}>
														<div className={"text-left w-full ml-10"}>
															20G {getWinsRecentGames()}W {getLossesRecentGames()}L
														</div>
														<div className={"mt-2"}>
															<div className={"relative text-center"}>
																<DoughnutChart wins={getWinsRecentGames()}
																			   losses={getLossesRecentGames()}/>
																<div
																	className={"absolute top-10 left-9 text-sm " + (calculateWinRate(getWinsRecentGames(), getLossesRecentGames()) > 50 ? "text-win" : "text-loss")}>
																	{calculateWinRate(getWinsRecentGames(), getLossesRecentGames())}%
																</div>
															</div>
														</div>
													</div>
													<div
														className={"flex flex-col items-left justify-center mt-6 mb-3"}>
														<div className={"flex text-summoner-gray text-xs"}>
															{calculateAverageKillsRecentGames()}
															/
															<span
																className={"text-loss-border"}>{calculateAverageDeathsRecentGames()}</span>
															/ {calculateAverageAssistsRecentGames()}
														</div>
														<div className={"flex text-xl font-bold"}>
															{calculateKDARecentGames()}:1
														</div>
														<div className={"flex text-xs text-loss-border"}>
															P/Kill {calculateKillPerticipationRecentGames()}%
														</div>
													</div>
													<div className={"block w-56 ml-10 mt-3"}>
														<div className={"text-summoner-gray text-xs leading-4 block"}>
															Recent 20 Games Played Champion
														</div>
														<ul className={"flex flex-col justify-center h-20 mt-2 h-20"}>
															{calculateTopChampions()?.map((champ) => (
																<li key={champ.name} className={"flex items-center"}>
																	<img className={"w-6 h-6 rounded-full mr-2"}
																		 src={`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.name}.png`}
																		 alt=""/>
																	<div className={"text-xs text-summoner-gray"}>
																		<span
																			className={" " + (calculateWinRate(champ.wins, champ.games - champ.wins) >= 60 ? "text-win" : calculateWinRate(champ.wins, champ.games - champ.wins) <= 40 ? "text-loss" : "text-summoner-gray")}>{calculateWinRate(champ.wins, champ.games - champ.wins)}% </span>
																		({champ.wins}W {champ.games - champ.wins}L)
																	</div>
																</li>
															))}
														</ul>
													</div>
													<div className={"mt-3 ml-10"}>
														<div className={"text-summoner-gray text-xs leading-4 block"}>
															Preferred Position
														</div>
														<div className={"h-20 mt-5 h-20"}>
															<img className={"inline-block mr-2 align-middle"}
																 src={getFavoritePosition()?.imgUrl}
																 alt={"image of positino"}/>
															{getFavoritePosition()?.role}
														</div>
													</div>
												</div>
											) : null}
										</div>
									</div>
									<div className={"flex bg-summoner-light items-center rounded-b"}>
										<div className={"flex flex-col w-full h-auto mb-3 items-center"}>
											<span className={"text-summoner-gray font-medium"}>Match History</span>
											<div className={"h-px w-96 bg-match-text"}/>
											{matches ? (
												sortMatches(),
													matches.slice(0, matchesToShow).map((match) => (
														<Match key={match.info.gameId} match={match}
															   summoner={summoner}/>
													))
											) : (
												<div className={"w-full flex items-center justify-center h-14"}>
													<div role="status">
														<svg aria-hidden="true"
															 className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
															 viewBox="0 0 100 101" fill="none"
															 xmlns="http://www.w3.org/2000/svg">
															<path
																d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
																fill="currentColor"/>
															<path
																d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
																fill="currentFill"/>
														</svg>
														<span className="sr-only">Loading...</span>
													</div>
												</div>
											)}
										</div>
									</div>
									<div className={"flex items-center justify-center"}>
										{matchesToShow == matches?.length ? (
											<div
												className={"w-72 mt-2 h-10 justify-center flex items-center bg-summoner-light text-white rounded"}>
												No more matches recorded
											</div>
										) : (
											<div onClick={showMore}
												 className={"w-72 mt-2 h-10 justify-center flex items-center bg-summoner-light text-white rounded cursor-pointer"}>
												Show More
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className={"w-full flex items-center justify-center h-14"}>
							<div role="status">
								<svg aria-hidden="true"
									 className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
									 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"/>
								</svg>
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					)}
				</div>
			</>
		)
	}
}

export default Account
