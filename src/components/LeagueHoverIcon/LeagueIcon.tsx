import Image from "next/future/image";
import * as HoverCard from '@radix-ui/react-hover-card';
import {ReactNode} from "react";

export const LeagueIcon = ({img}: { img: string | undefined }) => {
	return (
		<div className={"w-8 h-8 flex-shrink-0 relative rounded-lg overflow-hidden"}>
			{img ? (
				<Image src={img} alt={"Item"} fill sizes={"32px"} priority/>
			) : (
				<div className={"bg-neutral-700 w-full h-full rounded-lg"}/>
			)}
		</div>
	)
}

export const LeagueHoverIcon = ({children, img}: {children: ReactNode, img: string | undefined}) => {
	return (
		<HoverCard.Root openDelay={0} closeDelay={0}>
			{img &&
				<LeagueHoverContent>
					{children}
				</LeagueHoverContent>
			}
			<HoverCard.Trigger>
				<LeagueIcon img={img} />
			</HoverCard.Trigger>
		</HoverCard.Root>
	)
}

const LeagueHoverContent = ({children}: { children: ReactNode }) => {
	return (
		<>
			<HoverCard.Portal>
				<HoverCard.Content className={"px-4 py-4 bg-neutral-900 rounded-lg transform rdx-side-top:animate-slide-up-fade rdx-side-bottom:animate-slide-down-fade z-50"} side={"top"} sideOffset={5} >
					{children}
					<HoverCard.Arrow className={"fill-neutral-900"} />
				</HoverCard.Content>
			</HoverCard.Portal>
		</>
	)
}