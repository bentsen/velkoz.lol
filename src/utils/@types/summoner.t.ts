export interface Summoner {
    summonerId: string
    puuid: string
    summonerLevel: number
    name: string
    profile_icon_id: number
    solo: Solo
    flex: Flex
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

export interface ISummoner {
	id:            string;
	accountId:     string;
	puuid:         string;
	name:          string;
	region:	   	   string;
	profileIconId: number;
	revisionDate:  number;
	summonerLevel: number;
}