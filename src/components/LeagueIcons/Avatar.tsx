import Image from "next/future/image";

const Avatar = ({img, lvl}: { img: string; lvl: number }) => {
	return (
		<div className={"relative"}>
			<div
				className={
					"absolute flex justify-center items-center border-2 border-neutral-800 z-10 -bottom-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white rounded-2xl px-2"
				}
			>
				{lvl}
			</div>
			<div
				className={
					"relative border-2 border-neutral-800 rounded-2xl overflow-hidden"
				}
			>
				<div className={"w-24 h-24 flex-shrink-0"}>
					<Image src={img} alt={`Profile icon`} fill priority/>
				</div>
			</div>
		</div>
	);
};

export default Avatar;