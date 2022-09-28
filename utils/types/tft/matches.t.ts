export interface TFTMatch {
    metadata: Metadata;
    info:     Info;
}

export interface Metadata {
    data_version: string;
    match_id:     string;
    participants: string[];
}

export interface Info {
    game_datetime:     number;
    game_length:       number;
    game_variation:    string;
    game_version:      string;
    participants:      Participant[];
    queue_id:          number;
    tft_set_number:    number;
}

export interface Participant {
    companion:               Companion;
    gold_left:               number;
    last_round:              number;
    level:                   number;
    placement:               number;
    players_eliminated:      number;
    puuid:                   string;
    time_eliminated:         number;
    total_damage_to_players: number;
    traits:                  Trait[];
    units:                   Unit[];
}

export interface Companion {
    content_ID: string;
    item_ID:    number;
    skin_ID:    number;
    species:    string;
}

export interface Trait {
    name:         string;
    num_units:    number;
    style:        number;
    tier_current: number;
    tier_total:   number;
}

export interface Unit {
    character_id: string;
    items:        number[];
    chosen:       string;
    name:         string;
    rarity:       number;
    tier:         number;
}
