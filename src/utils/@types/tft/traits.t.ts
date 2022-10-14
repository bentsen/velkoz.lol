export interface TFTTraits {
    name: string,
    description: string,
    effect: string,
    stats: Stats[]
    champions: Champions[]
}

interface Stats {
    number: string,
    stat: string
}

interface Champions {
    name: string,
    id: string,
    cost: number
}