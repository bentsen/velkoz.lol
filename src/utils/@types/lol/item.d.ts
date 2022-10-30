export interface ItemsResponse {
	type:    Type;
	version: string;
	basic:   Basic;
	data:    { [key: string]: IItem };
	groups:  Group[];
	tree:    Tree[];
}

export interface Basic {
	name:             string;
	rune:             Rune;
	gold:             Gold;
	group:            string;
	description:      string;
	colloq:           string;
	plaintext:        string;
	consumed:         boolean;
	stacks:           number;
	depth:            number;
	consumeOnFull:    boolean;
	from:             any[];
	into:             any[];
	specialRecipe:    number;
	inStore:          boolean;
	hideFromAll:      boolean;
	requiredChampion: string;
	requiredAlly:     string;
	stats:            { [key: string]: number };
	tags:             any[];
	maps:             { [key: string]: boolean };
}

export interface Gold {
	base:        number;
	total:       number;
	sell:        number;
	purchasable: boolean;
}

export interface Rune {
	isrune: boolean;
	tier:   number;
	type:   string;
}

export interface IItem {
	id:                number;
	name:              string;
	description:       string;
	colloq:            string;
	plaintext:         string;
	into?:             string[];
	image:             Image;
	gold:              Gold;
	tags:              Tag[];
	maps:              { [key: string]: boolean };
	stats:             { [key: string]: number };
	inStore?:          boolean;
	from?:             string[];
	effect?:           Effect;
	depth?:            number;
	stacks?:           number;
	consumed?:         boolean;
	hideFromAll?:      boolean;
	consumeOnFull?:    boolean;
	requiredChampion?: string;
	requiredAlly?:     RequiredAlly;
	specialRecipe?:    number;
}

export interface Effect {
	Effect1Amount:   string;
	Effect2Amount?:  string;
	Effect3Amount?:  string;
	Effect4Amount?:  string;
	Effect5Amount?:  string;
	Effect6Amount?:  string;
	Effect7Amount?:  string;
	Effect8Amount?:  string;
	Effect9Amount?:  string;
	Effect10Amount?: string;
	Effect11Amount?: string;
	Effect12Amount?: string;
	Effect13Amount?: string;
	Effect14Amount?: string;
	Effect15Amount?: string;
	Effect16Amount?: string;
	Effect17Amount?: string;
	Effect18Amount?: string;
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

export enum Type {
	Item = "item",
}

export enum Sprite {
	Item0PNG = "item0.png",
	Item1PNG = "item1.png",
	Item2PNG = "item2.png",
}

export enum RequiredAlly {
	Ornn = "Ornn",
}

export enum Tag {
	AbilityHaste = "AbilityHaste",
	Active = "Active",
	Armor = "Armor",
	ArmorPenetration = "ArmorPenetration",
	AttackSpeed = "AttackSpeed",
	Aura = "Aura",
	Boots = "Boots",
	Consumable = "Consumable",
	CooldownReduction = "CooldownReduction",
	CriticalStrike = "CriticalStrike",
	Damage = "Damage",
	GoldPer = "GoldPer",
	Health = "Health",
	HealthRegen = "HealthRegen",
	Jungle = "Jungle",
	Lane = "Lane",
	LifeSteal = "LifeSteal",
	MagicPenetration = "MagicPenetration",
	Mana = "Mana",
	ManaRegen = "ManaRegen",
	NonbootsMovement = "NonbootsMovement",
	OnHit = "OnHit",
	Slow = "Slow",
	SpellBlock = "SpellBlock",
	SpellDamage = "SpellDamage",
	SpellVamp = "SpellVamp",
	Stealth = "Stealth",
	Tenacity = "Tenacity",
	Trinket = "Trinket",
	Vision = "Vision",
}

export interface Group {
	id:              string;
	MaxGroupOwnable: string;
}

export interface Tree {
	header: string;
	tags:   string[];
}
