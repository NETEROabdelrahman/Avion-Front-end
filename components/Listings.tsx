
import Image from 'next/image'
import Link from 'next/link';

const Listings = () => {
    return (
        <div className='  p-[80px] flex gap-4 flex-col '>
            <div className="new-ceramics">new ceramics</div>
            <ul className='flex md:flex-row flex-col gap-10 flex-wrap justify-center'>
                <li className='h-[462px] flex flex-col justify-between'>
                    <Image
                        src={require("../public/images/Photo (3).png")}
                        alt=''
                        width={305}
                        height={375}
                    >
                      
                    </Image>
                    <h5>The Dandy Chair</h5>
                    <h6>£250</h6>
                </li>
                <li className='h-[462px] flex flex-col justify-between'>
                    <Image
                        src={require("../public/images/Photo.png")}
                        alt=''
                        width={305}
                        height={375}
                    >
                      
                    </Image>
                    <h5>Rustic vase set</h5>
                    <h6>£350</h6>
                </li>
                <li className='h-[462px] flex flex-col justify-between'>
                    <Image
                        src={require("../public/images/Photo (1).png")}
                        alt=''
                        width={305}
                        height={375}
                    >
                      
                    </Image>
                    <h5>the silky vase</h5>
                    <h6>£210</h6>
                </li>
                <li className='h-[462px] flex flex-col justify-between'>
                    <Image
                        src={require("../public/images/Photo (2).png")}
                        alt=''
                        width={305}
                        height={375}
                    >
                      
                    </Image>
                    <h5>The lucy lamp</h5>
                    <h6>£150</h6>
                </li>
            </ul>
          
            <button className=' bg-[#cec7c7] p-4 w-fit m-auto'>
                <Link className=' text-decoration-none text-black' href={"/products?page=1&search=&filter="}>
                    view collection
                </Link>
            </button>
          
        </div>
    );
}

export default Listings