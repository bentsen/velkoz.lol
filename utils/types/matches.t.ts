export interface Matches {
    participants: summoner[]
    info: info
}

export interface summoner {
    summonerId: string
    puuid: string
    summonerLevel: number
    name: string
    profile_icon_id: number
    solo: Solo
    flex: Flex
}

export interface info {
    gameDuration: number
    participants: participants[]
}

export interface participants {
    assists: number
    championId: number
    championName: string
}

export interface Solo {
    id: number
    tier: string
    rank: string
    leaguePoints: number
    wins: number
    losses: number
}

export interface Flex {
    id: number
    tier: string
    rank: string
    leaguePoints: number
    wins: number
    losses: number
}
