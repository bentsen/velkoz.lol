import {ReactNode} from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({children}: {children: ReactNode}) => {
	return (
		<>
			<Navbar />
			<div className={"mb-52"}>
				{children}
			</div>
			<Footer />
		</>
	)
}

export default Layout