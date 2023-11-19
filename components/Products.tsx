import Image from 'next/image'
import Link from 'next/link';



const Products = () => {
  return (
    <div className='  p-[80px] flex gap-4 flex-col'>
    <div className="new-ceramics">our popular products</div>
    <ul className='flex md:flex-row flex-col gap-10 flex-wrap overflow-hidden justify-center'>
        <li className=' md:flex flex-col justify-between hidden '>
            <Image
                src={require("../public/images/Large.png")}
                alt=''
                width={630}
                height={375}
                
            >
                
            </Image>
            <h5>The Dandy Chair</h5>
            <h6>£250</h6>
        </li>
        <li className='flex flex-col justify-between'>
            <Image
                src={require("../public/images/Photo(4).png")}
                alt=''
                width={305}
                height={375}
            >
                
            </Image>
            <h5>Rustic vase set</h5>
            <h6>£350</h6>
        </li>
        <li className='flex flex-col justify-between'>
            <Image
                src={require("../public/images/Photo (5).png")}
                alt=''
                width={305}
                height={375}
            >
                
            </Image>
            <h5>the silky vase</h5>
            <h6>£210</h6>
        </li>
    </ul>
    <button className=' bg-[#cec7c7] p-4 w-fit m-auto'><Link className='text-black text-decoration-none' href={'/products'}>view collection</Link></button>
</div>
  )
}

export default Products