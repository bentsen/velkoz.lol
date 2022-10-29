import Link from "next/link"
import Image from "next/future/image";
import {useState} from "react";
import {useRouter} from "next/router";
import {FiMenu} from "react-icons/fi";


interface IGamesProps {
	nick: string,
	name: string,
	link: string,
	color: string,
	svg: string,
}

interface IGameIter extends IGamesProps {
	iter: number,
	selectedColor: string
}

const games = [
	{
		nick: "lol",
		name: "League of Legends",
		link: "/",
		color: "bg-lol-color",
		svg: "/game-icons/leagueoflegends.svg"
	},
	{
		nick: "val",
		name: "Valorant",
		link: "/valorant",
		color: "bg-valorant-color",
		svg: "/game-icons/valorant.svg"
	},
	{
		nick: "tft",
		name: "Teamfight Tactics",
		link: "/tft",
		color: "bg-tft-color",
		svg: "/game-icons/teamfighttactics.png"
	},
	{
		nick: "lor",
		name: "League of Runeterra",
		link: "/lor",
		color: "bg-lor-color",
		svg: "/game-icons/legendsofruneterra.png"
	},
]

const bgColor = "bg-black";
const hover = "hover:bg-gray-500"

const Navbar = () => {
	/*Usestate for game that is chosen on navbar*/
	const [game, setGame] = useState("lol");
	const router = useRouter();
	const filterGames = () => {
		const path = router.asPath
		return games.sort((a, b) => a.link == path ? -1 : b.link == path ? 1 : 0);
	}

	const selectedColor = filterGames()[0].color

	return (
		<div className={"py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
			<header className={"relative"}>
				<nav className={"relative flex items-center justify-between"}>
					<div className={"flex flex-1 items-center"}>
						<Link href={"/"}>
							<a className={"font-bold text-2xl"}>
								Velkoz
							</a>
						</Link>
						<div className={"ml-2"}>
							<Link href={"/features"} className={"font-bold text-2xl"}>Features</Link>
						</div>
					</div>
					<div className={"flex"}>
						<FiMenu/>
					</div>
				</nav>
			</header>
		</div>
	)
}

const NavLink = (props: IGameIter) => {
	const {nick, name, link, color, svg, selectedColor} = props

	const first = props.iter == 0;
	const secondLink = props.iter == 1

	return (
		<Link href={link} passHref>
			<div
				className={`hidden sm:flex flex-row justify-center items-center cursor-pointer ${secondLink ? selectedColor : bgColor}`}>
				<div
					className={`relative flex justify-center items-center h-full w-full ${secondLink ? "rounded-bl-2xl" : ""} ${first ? color : bgColor} ${!first && "hover:bg-neutral-900"}`}>
					<div className={"flex justify-center items-center text-white font-medium mx-5"}>
						<div className={"h-6 w-6 relative"}>
							<Image src={svg} alt={name} fill/>
						</div>
						<p className={"text-xs font-heading"}>{name}</p>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default Navbar