import Image from "next/future/image";
type SizeProps = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

const Avatar = ({img, lvl, size = "xl"}: { img: string; lvl?: number, size?: SizeProps}) => {
	let sizeString = "";
	if (size == "xs") {
		sizeString = "w-4 h-4";
	}
	if (size == "sm") {
		sizeString = "w-8 h-8";
	}
	if (size == "md") {
		sizeString = "w-12 h-12";
	}
	if (size == "lg") {
		sizeString = "w-16 h-16";
	}
	if (size == "xl") {
		sizeString = "w-24 h-24";
	}
	return (
		<div className={"relative"}>
			{lvl ? (

				<div
					className={
						"absolute flex justify-center items-center border-2 border-neutral-800 z-10 -bottom-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white rounded-2xl px-2"
					}
				>
					{lvl}
				</div>
			): null}
			<div
				className={
					"relative border-2 border-neutral-800 rounded-2xl overflow-hidden"
				}
			>
				<div className={`${sizeString} flex-shrink-0`}>
					<Image src={img} alt={`Profile icon`} fill priority/>
				</div>
			</div>
		</div>
	);
};

export default Avatar;