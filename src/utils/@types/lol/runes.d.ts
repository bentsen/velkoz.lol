export interface IPath {
	id:    number;
	key:   string;
	icon:  string;
	name:  string;
	slots: ISlot[];
}

export interface ISlot {
	runes: IRune[];
}

export interface IRune {
	id:        number;
	key:       string;
	icon:      string;
	name:      string;
	shortDesc: string;
	longDesc:  string;
}
