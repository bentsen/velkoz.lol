import Link from "next/link"
import Image from "next/future/image";
import {useState} from "react";
import {useRouter} from "next/router";


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
		<>
			<nav className={"h-10 "+bgColor}>
				<div className={`flex flex-row h-full`}>
					<div className={`flex justify-start items-center cursor-pointer text-white ${selectedColor} h-full w-fit`}>
						<Link href={"/"} passHref>
							<p className={"mx-5 font-extrabold text-2xl"}>Velkoz</p>
						</Link>
					</div>
					{filterGames().map((game, i) => (
						<NavLink key={game.name} {...game} selectedColor={selectedColor} iter={i}/>
					))}
				</div>
			</nav>
			<div className={`flex flex-row items-center h-10 text-white ${selectedColor}`}>
				<div>
					Test
				</div>
				<div>
					Test
				</div>
				<div>
					Test
				</div>
				<div>
					Test
				</div>
			</div>
		</>
	)
}

const NavLink = (props: IGameIter) => {
	const {nick, name, link, color, svg, selectedColor} = props

	const first = props.iter == 0;
	const secondLink = props.iter == 1

	return (
		<Link href={link} passHref>
			<div className={`flex flex-row justify-center items-center cursor-pointer ${secondLink ? selectedColor : bgColor}`}>
				<div className={`relative flex justify-center items-center h-full w-full ${secondLink ? "rounded-bl-2xl" : ""} ${first ? color : bgColor} ${!first && "hover:bg-neutral-900"}`}>
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