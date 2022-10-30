import {useContext} from "react";
import {VersionContext} from "@/data/VersionContext";
import {ItemContext} from "@/data/ItemContext";

export function useItem(itemId: number | undefined) {
	const items = useContext(ItemContext);
	return items?.find(i => i.id == itemId);
}