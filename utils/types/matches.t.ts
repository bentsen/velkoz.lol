export interface Match {
    metadata: metadata
    info: info
}

export interface metadata {
    dataversion: string
    matchId: string
    participants: string[]
}

export interface info {
    participants: participants[]
}

export interface participants {
    championName: string
}
