import ProductButton from '@/components/ProductButton';
import { product } from '@/types';
import axios from 'axios'
import Image from 'next/image';
import 'react-custom-alert/dist/index.css';
const PRODUCT_URL = 'https://avion-five.vercel.app/products/find/'


const TheProduct = async ({params}:any) => {
  const pathname = params.productid

  //FETCH PRODUCT
  const res = await axios.get(`${PRODUCT_URL}${pathname}`)
  const data:product = res.data


  return (
    <div className='flex flex-row  bg-slate-200' >

      {data && <div className='m-5 flex md:flex-row flex-col justify-between gap-8'>
      

      <Image
                src={data.photos[0]}
                placeholder='blur'
                blurDataURL='data:image/webp;base64,UklGRtoCAABXRUJQVlA4WAoAAAAgAAAAgQAAgQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg7AAAANALAJ0BKoIAggA+7W6uUimmJKKnMcwxMB2JaW7ewM4k2qADgMT3wjqlMzsYuhxZEQmPvChvFdpPQE+V3kB7gZJKSiH6glx+ZBLpXDwC9DTNMidetbIXeT1k8y1N56/SSVq4C6eTwAAA/vDfOwSCim8gONbUPX3JAuuxr18wfarKsN2zKL//WfqhUV0WdxufDTnepcc+Ny3Ft0AJB6/lVkQaJ7/3AIthqcHMHwp80KPLkMoqrop3NPmhN4u6U1h23l+s39esylGueRhYEGh/ppFPtN80xNqcxFMKCJXAD/H4geoNIHtzrq7pgAAA'
                alt=''
                width={0}
                height={0}
                sizes='10'
                className=' w-[500px] h-auto'
            />
          
        <div>
          <div className="flex flex-row justify-between">
            <h1>{data.name}</h1>
            <div className="flex justify-center items-center gap-2">
          <h3>{data.amount>0&&data.amount}</h3>
          <h5>{data.amount>0?<span className=' text-green-700'>in stock</span>:<span className='text-red-700'>out of stock</span>}</h5>
            </div>
          </div>
          <h2>{data.price} $</h2>
          <br />
          <h5>Product description</h5>
          <p>{data.desc}</p>
          <h5>dimensions:</h5>
          <div className='flex flex-row gap-3 my-4'>
            <div className="flex flex-col p-3">
              <h5>height</h5>
              <h6>{data.height} cm</h6>
            </div>
            <div className="flex flex-col p-3">
              <h5>width</h5>
              <h6>{data.width} cm</h6>
            </div>
            <div className="flex flex-col p-3">
              <h5>depth</h5>
              <h6>{data.depth} cm</h6>
            </div>
          </div>
          {/* <h4>quantity:</h4> */}
          {/* <div className="flex flex-row text-[25px]">
            <div className='p-3 cursor-pointer' onClick={() => {
              if (quantity > 1) {
                setQuantity(prev => prev - 1)
              }
            }}>-</div>
            <div className='p-3 bg-white w-full text-center md:w-fit'>{quantity}</div>
            <div className='p-3 cursor-pointer' onClick={()=>setQuantity(prev=>prev+1)}>+</div>
          </div> */}
        <ProductButton data={data} pathname={pathname} />
        </div>
      </div>
      }
    </div>
  )
};

export default TheProduct