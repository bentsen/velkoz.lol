export interface Runes {
    id: number;
    key: string;
    icon: string;
    name: string;
    slots: Slot[];
}

export interface Slot {
    runes: Rune[];
}

export interface Rune {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
}



