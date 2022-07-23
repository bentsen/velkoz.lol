import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare, faInstagramSquare, faTwitterSquare, faDiscord} from "@fortawesome/free-brands-svg-icons"
import {useState} from "react";

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const refreshPage = () => {
        if(window.location.pathname == "/") {
            window.location.reload()
        }
    }

    const handleClick = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <>
            <nav className={"bg-navbar-color h-16 shadow-lg"}>
                <div className="container mx-auto">
                    <div className="flex justify-between h-16">
                        <motion.div whileHover={{scale: 1.1}} className={"items-center flex cursor-pointer text-white text-lg font-bold"}>
                            <Link href={"/"}>
                                <h1>Summoner Searcher</h1>
                            </Link>
                        </motion.div>
                        <div className="items-center md:flex hidden">
                            <ul className="space-x-5 text-2xl text-white">
                                <li className="li sm:inline-block">
                                    <a href="#"><FontAwesomeIcon icon={faFacebookSquare}/></a>
                                </li>
                                <li className="li sm:inline-block">
                                    <a href="#"><FontAwesomeIcon icon={faInstagramSquare}/></a>
                                </li>
                                <li className="li sm:inline-block">
                                    <a href="#"><FontAwesomeIcon icon={faTwitterSquare}/></a>
                                </li>
                                <li className="li sm:inline-block">
                                    <a href="#"><FontAwesomeIcon icon={faDiscord}/></a>
                                </li>
                            </ul>
                            <ul className="text-gray-400 sm:self-center ml-12 border-t sm:border-none text-sm space-x-2">
                                <li className="sm:inline-block">
                                    <Link href={"/login"}><button className="bg-button-color2 hover:bg-button-hover2 h-8 w-16 rounded text-white">Log In</button></Link>
                                </li>
                                <li className="sm:inline-block">
                                    <Link href={"/register"}><button className="bg-button-color hover:bg-button-hover h-8 w-16 rounded text-white">Sign Up</button></Link>
                                </li>
                            </ul>
                        </div>
                        <div onClick={handleClick} className={"flex md:hidden mt-1"}>
                            <div className="p-4 space-y-2 rounded cursor-pointer shadow">
                                <span className="block w-8 h-0.5 bg-gray-100"></span>
                                <span className="block w-8 h-0.5 bg-gray-100"></span>
                                <span className="block w-8 h-0.5 bg-gray-100"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {isNavOpen ? (
                <div className={"md:hidden w-auto w-full"}>
                    <div className={"w-60 h-auto fixed z-10 right-0"}>
                        <div className="items-center text-center justify-center flex bg-navbar-color">
                            <ul className="sm:border-none text-sm">
                                <li className={"mt-5"}>
                                    <p className={"text-white hover:underline cursor-pointer"}>Facebook</p>
                                </li>
                                <li className={"mt-5"}>
                                    <p className={"text-white hover:underline cursor-pointer"}>Instagram</p>
                                </li>
                                <li className={"mt-5"}>
                                    <p className={"text-white hover:underline cursor-pointer"}>Twitter</p>
                                </li>
                                <li className={"mt-5"}>
                                    <p className={"text-white hover:underline cursor-pointer"}>Discord</p>
                                </li>
                                <li className="mt-20">
                                    <Link href={"/login"}><button className="bg-button-color2 hover:bg-button-hover2 h-8 w-32 rounded text-white">Log In</button></Link>
                                </li>
                                <li className="mt-5 mb-10">
                                    <Link href={"/register"}><button className="bg-button-color hover:bg-button-hover h-8 w-32 rounded text-white">Sign Up</button></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Navbar