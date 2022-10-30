export interface ISummonerSpellResponse {
	type:    string;
	version: string;
	data:    { [key: string]: SummonerSpell };
}

export interface SummonerSpell {
	index:		   number;
	id:            string;
	name:          string;
	description:   string;
	tooltip:       string;
	maxrank:       number;
	cooldown:      number[];
	cooldownBurn:  string;
	cost:          number[];
	costBurn:      string;
	datavalues:    Datavalues;
	effect:        (number[] | null)[];
	effectBurn:    (null | string)[];
	vars:          any[];
	key:           string;
	summonerLevel: number;
	modes:         string[];
	costType:      CostType;
	maxammo:       string;
	range:         number[];
	rangeBurn:     string;
	image:         Image;
	resource:      CostType;
}

export enum CostType {
	Nbsp = "&nbsp;",
	NoCost = "No Cost",
}

export interface Datavalues {
}

export interface Image {
	full:   string;
	sprite: string;
	group:  string;
	x:      number;
	y:      number;
	w:      number;
	h:      number;
}

export enum Group {
	Spell = "spell",
}

export enum Sprite {
	Spell0PNG = "spell0.png",
}
