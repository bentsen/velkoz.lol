import Navbar from "./Navbar";

const Layout = ({children}: any) => {
    return (
        <>
            <div>
                <Navbar/>
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout