import Link from "next/link"
import {useState} from "react";
import {useRouter} from "next/router";
import {FiMenu} from "react-icons/fi";
import {UrlObject} from "url";


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
		<div className={"py-4 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>
			<header className={"relative"}>
				<nav className={"relative flex items-center justify-between"}>
					<div className={"flex flex-1 items-center justify-start"}>
						<Link href={"/"}>
							<a className={"flex font-bold text-2xl text-white hover:text-neutral-300 transition-all duration-100"}>
								Velkoz
							</a>
						</Link>
						<Link href={"/features"}>
							<a className={"flex items-center p-4"}>
								Features
							</a>
						</Link>
					</div>
					<button className={"flex"}>
						<FiMenu className={"fill-white hover: fill-neutral-300"}/>
					</button>
				</nav>
			</header>
		</div>
	)
}

const NavLink = (href: string | UrlObject) => {
	return (
		<>
		</>
	)
}

export default Navbar