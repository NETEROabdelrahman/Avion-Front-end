import Image from 'next/image'

const Features = () => {
    return (
        <div className='flex flex-col items-center gap-6 m-5'>
            <h1 className=' text-center font-clash'>What makes our brand different</h1>
            <ul className=' flex md:flex-row flex-col gap-10  '>
                <li className=' flex flex-col justify-between'>
                    <Image
                        src={require("/public/svg/Delivery.svg")}
                        alt=''
                        width={20}
                        height={20}
                    >
                      
                    </Image>
                    <h5>Next day as standard</h5>
                    <h6>Order before 3pm and get your order the next day as standard</h6>
                </li>
                <li className=' flex flex-col justify-between'>
                    <Image
                        src={require("/public/svg/Checkmark--outline.svg")}
                        alt=''
                        width={20}
                        height={20}
                    >
                      
                    </Image>
                    <h5>Made by true artisans</h5>
                    <h6>Handmade crafted goods made with real passion and craftmanship</h6>
                </li>
                <li className=' flex flex-col justify-between'>
                    <Image
                        src={require("/public/svg/Purchase.svg")}
                        alt=''
                        width={20}
                        height={20}
                    >
                      
                    </Image>
                    <h5>Unbeatable prices</h5>
                    <h6>For our materials and quality you won’t find better prices anywhere</h6>
                </li>
                <li className=' flex flex-col justify-between'>
                    <Image
                        src={require("/public/svg/Sprout.svg")}
                        alt=''
                        width={20}
                        height={20}
                    >
                      
                    </Image>
                    <h5>Recycled packaging</h5>
                    <h6>We use 100% recycled packaging to ensure our footprint is manageable</h6>
                </li>
              
            </ul>
        </div>
    )
};

export default Features