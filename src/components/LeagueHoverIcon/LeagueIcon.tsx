import Image from "next/future/image";
import * as HoverCard from '@radix-ui/react-hover-card';
import {ReactNode} from "react";

interface IconProps {
	img: string | undefined
	size?: "xs" | "sm" | "md" | "lg" | "xl"
}

type SizeProps = "xs" | "sm" | "md" | "lg" | "xl"

export const LeagueIcon = ({img, size = "md"}: IconProps) => {
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


	return (
		<div className={`${sizeString} flex-shrink-0 relative rounded overflow-hidden`}>
			{img ? (
				<Image src={img} alt={"Item"} fill sizes={"64px"} priority/>
			) : (
				<div className={"bg-neutral-700 w-full h-full rounded"}/>
			)}
		</div>
	)
}

export const LeagueHoverIcon = ({children, img, size = "md"}: {children: ReactNode, img: string | undefined, size?: SizeProps}) => {
	return (
		<HoverCard.Root openDelay={1} closeDelay={0.5}>
			{img &&
				<LeagueHoverContent>
					{children}
				</LeagueHoverContent>
			}
			<HoverCard.Trigger>
				<LeagueIcon img={img} size={size}/>
			</HoverCard.Trigger>
		</HoverCard.Root>
	)
}

const LeagueHoverContent = ({children}: { children: ReactNode }) => {
	return (
		<>
			<HoverCard.Portal>
				<HoverCard.Content className={"px-4 py-4 bg-stone-900 max-w-lg rounded-lg transform rdx-side-top:animate-slide-up-fade rdx-side-bottom:animate-slide-down-fade z-50"} side={"top"} sideOffset={5} >
					{children}
					<HoverCard.Arrow className={"fill-stone-900"} />
				</HoverCard.Content>
			</HoverCard.Portal>
		</>
	)
}