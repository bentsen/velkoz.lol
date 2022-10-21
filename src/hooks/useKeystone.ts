import {useContext} from "react";
import {RunesContext} from "@/data/RunesContext";

export function useRune(runeId: number | undefined) {
	const runes = useContext(RunesContext);
	return runes?.map(s => s.id == runeId);
}