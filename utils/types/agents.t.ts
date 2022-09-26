export interface Agents {
    status: string
    data: Agent[]
}

export interface Role {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
    assetPath: string;
}

export interface Ability {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
}

export interface MediaList {
    id: number;
    wwise: string;
    wave: string;
}

export interface VoiceLine {
    minDuration: number;
    maxDuration: number;
    mediaList: MediaList[];
}

export interface Agent {
    uuid: string;
    displayName: string;
    description: string;
    developerName: string;
    characterTags: string[];
    displayIcon: string;
    displayIconSmall: string;
    bustPortrait?: any;
    fullPortrait: string;
    fullPortraitV2?: any;
    killfeedPortrait: string;
    background: string;
    backgroundGradientColors: string[];
    assetPath: string;
    isFullPortraitRightFacing: boolean;
    isPlayableCharacter: boolean;
    isAvailableForTest: boolean;
    isBaseContent: boolean;
    role: Role;
    abilities: Ability[];
    voiceLine: VoiceLine;
}
