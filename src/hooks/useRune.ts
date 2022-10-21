import {useContext} from "react";
import {RunesContext} from "@/data/RunesContext";

export function useRune(runeId: number | undefined) {
	const runes = useContext(RunesContext);
	return runes?.find(s => s.id == runeId);
}