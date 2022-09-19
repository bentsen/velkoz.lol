import Navbar from "./Navbar";
import Footer from "./footer";

const Layout = ({children}: any) => {
    return (
        <>
            <div>
                <Navbar/>
                <div className={"mb-32"}>
                    {children}
                </div>
                <Footer/>
            </div>
        </>
    )
}

export default Layout