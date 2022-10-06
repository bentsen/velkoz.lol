import {useContext, useState} from "react";
import {VersionContext} from "../store/VersionContext";

export const useProfileIcon = (id: number | string) => {
	const version = useContext(VersionContext);
	return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${id}.png`;
}
