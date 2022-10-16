import {useContext} from "react";
import {VersionContext} from "@/data/VersionContext";
import {SummonerSpellContext} from "@/data/SummonerSpellContext";
import {undefined} from "zod";

export function useSummonerSpell(spellId: number | undefined) {
	const sumSpells = useContext(SummonerSpellContext);
	return sumSpells?.find(s => s.index == spellId);
}