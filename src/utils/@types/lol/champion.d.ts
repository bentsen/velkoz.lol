export interface ChampionResponse {
	type: string;
	format: string;
	version: string;
	data: { [key: string]: IChampion };
}

export interface IChampion {
	id: string;
	key: string;
	name: string;
	title: string;
	image: Image;
	skins: Skin[];
	lore: string;
	blurb: string;
	allytips: string[];
	enemytips: string[];
	tags: string[];
	partype: string;
	info: Info;
	stats: { [key: string]: number };
	spells: Spell[];
	passive: Passive;
	recommended: any[];
}

export interface Image {
	full: string;
	loading: string;
	sprite: string;
	group: string;
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface Info {
	attack: number;
	defense: number;
	magic: number;
	difficulty: number;
}

export interface Passive {
	name: string;
	description: string;
	image: Image;
}

export interface Skin {
	id: string;
	num: number;
	name: string;
	chromas: boolean;
}

export interface Spell {
	id: string;
	name: string;
	description: string;
	tooltip: string;
	leveltip: Leveltip;
	maxrank: number;
	cooldown: number[];
	cooldownBurn: string;
	cost: number[];
	costBurn: string;
	datavalues: Datavalues;
	effect: (number[] | null)[];
	effectBurn: (null | string)[];
	vars: any[];
	costType: string;
	maxammo: string;
	range: number[];
	rangeBurn: string;
	image: Image;
	resource: string;
}

export interface Datavalues {
}

export interface Leveltip {
	label: string[];
	effect: string[];
}
