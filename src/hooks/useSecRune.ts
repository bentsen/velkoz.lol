import {useContext} from "react";
import {RunesContext} from "@/data/RunesContext";
import {IPath, IRune} from "@/utils/@types/lol/runes";

export function useSecRune(runeId: number | undefined) {
	const runes = useContext(RunesContext);
	let foundRune: IRune | IPath | undefined;
	runes?.forEach((keystone) => {
		if (keystone.id == runeId) {
			foundRune = keystone;
		}
	})

	return foundRune;
}