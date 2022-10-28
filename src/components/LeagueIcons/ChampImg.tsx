import Image from "next/future/image";
import {useContext} from "react";
import {ChampionContext} from "@/data/ChampionContext";

type SizeProps = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const ChampImg = ({
					  champId,
					  champName,
					  img,
					  size = "sm"
				  }: { champId?: string | number, champName?: string, img?: string, size?: SizeProps }) => {
	let sizeString = "";
	if (size == "xs") {
		sizeString = "w-4 h-4";
	}
	if (size == "sm") {
		sizeString = "w-6 h-6";
	}
	if (size == "md") {
		sizeString = "w-8 h-8";
	}
	if (size == "lg") {
		sizeString = "w-12 h-12";
	}
	if (size == "xl") {
		sizeString = "w-16 h-16";
	}
	if (size == "2xl") {
		sizeString = "w-20 h-20";
	}

	const champContext = useContext(ChampionContext);
	const champ =
		champId && champContext?.find((c) => c.key == champId)
		|| champName && champContext?.find((c) => c.name == champName);
	return (

		<div className={`${sizeString} relative rounded-xl overflow-hidden`}>
			{img
				? <Image src={img}
						 alt={`Champ image`}
						 fill
						 className={"scale-[1.1]"}
						 sizes={"128px"} />
				: <div className={"bg-neutral-900 w-full h-full"} />
			}
			{champ
				? <Image src={champ.image.sprite}
						 alt={`Image of ${champ.name}`}
						 fill
						 className={"scale-[1.1]"}
						 sizes={"128px"} />
				: <div className={"bg-neutral-900 w-full h-full"} />
			}
		</div>
	);
};

export default ChampImg;