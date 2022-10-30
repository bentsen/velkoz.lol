import {useContext} from "react";
import {RunesContext} from "@/data/RunesContext";
import {IPath, IRune} from "@/utils/@types/lol/runes";

export function useRune(runeId: number | undefined) {
	const runes = useContext(RunesContext);
	let foundRune: IRune | undefined;
	runes?.forEach((keystone) => {
		keystone.slots.forEach((slot) => {
			slot.runes.forEach((rune) => {
				if (rune.id == runeId) {
					foundRune = rune;
				}
			})
		})
	})

	return foundRune;
}