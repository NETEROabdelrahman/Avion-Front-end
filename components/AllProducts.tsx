"use client"

import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect } from 'react'
import Link from 'next/link'
export const PRODUCTS_URL = 'https://avion-five.vercel.app/products'
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import useSWR from 'swr'
import Skeleton from './Skeleton'
import { product } from '@/types'
import { useRouter } from 'next/navigation'

const AllProducts = ({searchParams}:any) => {
    const router = useRouter()
    const alertWarning = () => toast.warning('you need to login first!');
    const alertError = () => toast.error('error fetching data!');



    //GET ALL PRODUCTS
    const fetchProducts = useCallback(async () => {
        const res = await axios.get(`${PRODUCTS_URL}?filter=${searchParams?.filter}&sort=${searchParams?.sort}&search=${searchParams?.search}&page=${searchParams?.page}`);
        return res.data;
      }, [searchParams]);
    const { data, error, isLoading } = useSWR(`${PRODUCTS_URL}?filter=${searchParams?.filter}&sort=${searchParams?.sort}&search=${searchParams?.search}&page=${searchParams?.page}`, fetchProducts)
    useEffect(() => {
        fetchProducts()
        if(error) alertError()
    }, [fetchProducts, searchParams,error])
    

    //ADD PRODUCT TO CART
    const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement
        const targetId = target.id
        if (!localStorage.getItem("user")) {
            alertWarning()
        } else {
            
            if (localStorage.getItem("theOrder")) {
                const oldProduct = JSON.parse(localStorage.getItem("theOrder")!)
                localStorage.setItem("theOrder",JSON.stringify(Array.from(new Set([...oldProduct,targetId]))))
            } else {
                localStorage.setItem("theOrder",JSON.stringify([targetId]))
            }
            target.disabled = true;
            target.textContent = "in cart";
        }
        
    }
    
    //PAGINATION
    const nextPage = () => {
        if (Number(searchParams?.page ) < data.totalPages) {
            router.push(`?filter=${searchParams?.filter}&sort=${searchParams?.sort}&search=${searchParams?.search}&page=${Number(searchParams?.page )+ 1}`,{scroll:false})
        }
    }
    const prevPage = () => {
        if (Number(searchParams?.page ) > 1) {
            router.push(`?filter=${searchParams?.filter}&sort=${searchParams?.sort}&search=${searchParams?.search}&page=${Number(searchParams?.page )-1}`,{scroll:false})
        }
    }
    
    

    
    return (
        <div >
            <ToastContainer  floatingTime={5000} />
            <div className='text-center'>{data?.totalResults} products</div>
            <div className='flex flex-wrap m-5 gap-5 justify-center'>
            
                
                {!data && <div className="flex w-full flex-1 flex-row items-center md:px-20 px-0 flex-wrap">
                    {[...Array(8)].map((_, index) => (
                        <Skeleton key={index} />
                    ))}
                </div>}
                {data && <>{data?.products?.map((product: product) => {
                    return (
                        <div key={product._id} className='flex flex-col gap-2 justify-between product transition hover:bg-slate-200 rounded p-3'>
                            <Link href={`/products/${product._id}`}><Image
                                className='rounded'
                                src={product.photos[0]}
                                placeholder='blur'
                                blurDataURL='data:image/webp;base64,UklGRtoCAABXRUJQVlA4WAoAAAAgAAAAgQAAgQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg7AAAANALAJ0BKoIAggA+7W6uUimmJKKnMcwxMB2JaW7ewM4k2qADgMT3wjqlMzsYuhxZEQmPvChvFdpPQE+V3kB7gZJKSiH6glx+ZBLpXDwC9DTNMidetbIXeT1k8y1N56/SSVq4C6eTwAAA/vDfOwSCim8gONbUPX3JAuuxr18wfarKsN2zKL//WfqhUV0WdxufDTnepcc+Ny3Ft0AJB6/lVkQaJ7/3AIthqcHMHwp80KPLkMoqrop3NPmhN4u6U1h23l+s39esylGueRhYEGh/ppFPtN80xNqcxFMKCJXAD/H4geoNIHtzrq7pgAAA'
                                quality={100}
                                priority={false}
                                alt=''
                                width={250}
                                height={350}
                            /></Link>
                            <div className="flex flex-row justify-between items-center">

                                <div>

                                    <div>{product.name}</div>
                                    <div>{product.price}$</div>
                                    <div>{product.amount > 0 ? <>{product.amount} <span className=' text-green-800 font-bold'>  in stock</span></> : <span className=' text-red-800 font-bold'>out of stock</span>}</div>
                                </div>
                                {product.amount > 0 && <button
                                    className=' disabled:bg-slate-400 p-2 rounded bg-slate-600 text-slate-200'
                                    id={String(product._id)}
                                    onClick={addToCart}
                                    disabled={localStorage.getItem("user") && localStorage.getItem("theOrder") && (JSON.parse(localStorage.getItem("theOrder")!)).includes(product._id) ? true : false}
                                >
                                    {localStorage.getItem("user") && localStorage.getItem("theOrder") && (JSON.parse(localStorage.getItem("theOrder")!)).includes(product._id) ? "in cart" : "add to cart"}
                                </button>}
                            </div>
                        </div>
                    )
                })}</>}
                
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
                <button className='bg-slate-200 rounded p-2 m-2 font-bold text-4xl ' onClick={prevPage}>⇦</button>
                <div>{Number(searchParams?.page)} of {data?.totalPages}</div>
                <button className='bg-slate-200 rounded p-2 m-2 font-bold text-4xl' onClick={nextPage}>⇨</button>
            </div>
        </div>
    );
}

export default AllProducts