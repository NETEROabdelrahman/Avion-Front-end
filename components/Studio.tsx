
import Image from 'next/image'

const Studio = () => {
    return (
        <div className='flex md:flex-row flex-col m-16 justify-between'>
            <div className='flex flex-col justify-between'>
                <div className=' flex flex-col gap-5'>
                    <h1 className=' text-[24px]'>From a studio in London to a global brand with over 400 outlets</h1>
                    <p>When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market.</p>
                    <p>Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>
                </div>
            </div>
            <Image
                src={require("../public/images/Image.png")}
                alt=''
                width={720}
                height={603}
            >
              
              
            </Image>
        </div>
    );
}

export default Studio