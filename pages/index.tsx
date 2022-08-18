import type { NextPage } from 'next'
import Image from "next/image";

const Home: NextPage = () => {
    return(
        <>
            <div className={"flex flex-col justify-center items-center mt-20 space-y-10"}>
                <div>
                    <Image src={"/logo.webp"} width={300} height={100}/>
                </div>
                <div>
                    <p className={"text-white"}>A website blah blah blah</p>
                </div>
            </div>
        </>
    )
}

export default Home
