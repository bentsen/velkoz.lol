export interface Spell {
    id: number;
    name: string;
    description: string;
    tooltip: string;
    cooldown: number;
    datavalues: Datavalues;
    summonerLevel: number;
    maxammo: string;
    icon: string;
    sprite: Sprite;
}

export interface Sprite {
    url: string;
    x: number;
    y: number;
}

export interface Datavalues {
}


