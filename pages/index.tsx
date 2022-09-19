import type { NextPage } from 'next'
import Image from "next/image";

const Home: NextPage = () => {
    return(
        <>
            <div className={"flex flex-col justify-center items-center mt-20 space-y-10"}>
                <div className={"text-white text-3xl"}>
                    <h1>Summoner Searcher</h1>
                </div>
                <div>
                    <p className={"text-white mt-2"}>A website where you can look up your Riot Games account in all their games.</p>
                    <p className={"text-white mt-2"}>You will be able to view all the most important and critical statistics and,</p>
                    <p className={"text-white mt-2"}>information about your profile and recent games. blah blah blah blah blah blah</p>
                    <p className={"text-white mt-2"}>blah blah blahblah blah blahblah blah blah blah blah blah blah blah blah blah</p>
                    <p className={"text-white mt-2"}>blah blah blahblah blah blahblah blah blahblah blah blahblah blah blah blah</p>
                </div>
            </div>
        </>
    )
}

export default Home
