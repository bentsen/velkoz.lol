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
	["UTILITY", {
		role: "Support",
		imgUrl: "/lol/positions/icon-position-sup-dark.svg",
	}],
	["Invalid", {
		role: "Invalid",
		imgUrl: "/lol/positions/icon-position-sup-dark.svg",
	}],
])

export function convertLaneName(lane: string):{role: string, imgUrl: string} {
	return laneTypes.get(lane) ?? {role: "Invalid", imgUrl: "/Invalid"}
}