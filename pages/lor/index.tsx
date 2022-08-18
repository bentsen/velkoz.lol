import Image from "next/image";

const Lor = () => {
    return (
        <>
            <div className={"bg-[url('/lor/main_bg_pc.jpg')] h-screen w-full bg-cover overflow-hidden"}>
                <div className={"flex flex-col justify-center items-center space-y-1"}>
                    <div>
                        <Image src={"/lor/logo.png"} width={580} height={300}/>
                    </div>
                    <div className={"text-center"}>
                        <p className={"text-white font-bold text-2xl"}>Under maintenance</p>
                        <p className={"text-white font-bold text-xl"}>Will be live soon</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lor