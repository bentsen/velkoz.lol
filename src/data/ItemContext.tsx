import React, {ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";
import {VersionContext} from "./VersionContext";
import {IItem, ItemsResponse} from "@/utils/@types/lol/item";

export const ItemContext = React.createContext<IItem[] | undefined>([]);

export default function ItemProvider({children}: {children: ReactNode}) {
	const [items, setItems] = useState<IItem[]>([]);
	const latestVersion = useContext(VersionContext);

	useEffect(() =>{
		if (!latestVersion) return;
		async function getItems() {
			const url = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`;
			const res = await axios.get<ItemsResponse>(url);
			const data = await res.data;
			let _items: IItem[] = []

			for (let key in data.data) {
				const currentItem = data.data[key];
				currentItem.id = parseInt(key);
				currentItem.image = {
					full: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${key}.png`,
					sprite: `https://ddragon.leagueoflegends.com/cdn/12.19.1/img/sprite/spell0.png`,
					group: "item",
					x: currentItem.image.x,
					y: currentItem.image.y,
					w: currentItem.image.w,
					h: currentItem.image.h,
				};
				_items.push(currentItem);
			}
			setItems(_items);
		}
		getItems();
	},[latestVersion])

	return (
		<>
			<ItemContext.Provider value={items}>
				{children}
			</ItemContext.Provider>
		</>
	)
}