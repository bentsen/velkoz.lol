const platformMap = new Map<string, string>(
	[["na1", "AMERICAS"],
	["br1", "AMERICAS"],
	["la1", "AMERICAS"],
	["la2", "AMERICAS"],
	["euw1", "EUROPE"],
	["eun1", "EUROPE"],
	["kr1", "ASIA"]]
)

const platformObj = {
	na1: "AMERICAS",
	br1: "AMERICAS",
	la1: "AMERICAS",
	la2: "AMERICAS",
	euw1: "EUROPE",
	eun1: "EUROPE",
	kr1: "ASIA",
}


export function convertToRegion(region: string): string {
	const converted = platformMap.get(region);
	
	if (converted == undefined) return "EUROPE";
	return converted;
}