
import Image from "next/image"
import Link from "next/link";



const Hero = () => {
    return (
        <div className=" overflow-hidden" >
            <div className=" bg-gray-800  md:m-16 m-0 flex flex-row justify-between">
                <div className="flex flex-col justify-between max-w-[700px] m-5 gap-12">
                    <div className="flex flex-col">
                        <h1 className="text-white">The furniture brand for the future, with timeless designs</h1>
                        <Link href="/products?page=1&search=&filter=" className="text-white w-fit text-decoration-none whitespace-nowrap bg-slate-500 p-3 m-3">
                            View Collection
                        </Link>
                    </div>
                    <div className="text-white  ">
                        A new era in eco friendly furniture with Avelon, the French luxury retail brand with nice fonts, tasteful colors and a beautiful way to display things digitally using modern web technologies.
                    </div>
                </div>
                <div className="right-image   ">
                    <Image
                        src={require("/public/images/Right_Image.png")}
                        alt=""
                        width={520}
                        height={584}
                    />
                </div>
            </div>
        </div>
    )
};

export default Hero