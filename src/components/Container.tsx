import {ReactNode} from "react";

const Container = ({children}: {children: ReactNode}) => {
	return (
		<div className={"flex flex-col mx-auto w-full max-w-6xl px-2"}>
			{children}
		</div>
	)
}

export default Container