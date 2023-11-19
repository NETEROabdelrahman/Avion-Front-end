"use client"

import Loader from "@/components/Loader";
import { product } from "@/types";
import axios, { AxiosResponse } from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
const ORDER_URL = 'https://avion-five.vercel.app/products/find/'




const Cart = () => {
    const alertSuccess = () => toast.success('successfully ordered');
    const alertError = (msg: string) => toast.error(`error ordering  -${msg}-  `);

    const router = useRouter()

    const pushing = useCallback(() => {
        if (!localStorage.getItem("user")) {
            router.push("/register")
        }
    }, [router]);
   
    useEffect(() => {
        if (typeof window !== "undefined") {
            pushing()
        }
    }, [pushing]);
    
    const [theOrders, setTheOrders] = useState<product[] | []>([])
    const [quantity, setQuantity] = useState<number[]>([0])
    const [price, setPrice] = useState<number[]>([0])
    const [totalPrice, setTotalPrice] = useState<number[]>([0])
    const [loading, setLoading] = useState<boolean>(false)




    //GET ALL OEDERS
    const getOrders = async (): Promise<void> => {
        const orders: string[] | null =
            typeof window !== 'undefined' &&
            localStorage.getItem('user') &&
            JSON.parse(localStorage.getItem('theOrder')!);
      
        if (orders) {
            try {
                setLoading(true)
                const res: AxiosResponse<any>[] = await Promise.all(
                    orders.map((order: string) => axios.get(`${ORDER_URL}${order}`))
                );
      
                if (res) {
                    setTheOrders(res.map((order) => order.data));
                    setQuantity(Array.from({ length: res.map((order) => order.data).length }, () => 1));
                    setPrice(res.map((order) => order.data).map((order) => order.price));
                    setTotalPrice(res.map((order) => order.data).map((order) => order.price));
                }
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        } 
    };
   

    //MAKE AN ORDER
    const orderNow = async () => {
        try {
            const res = await axios.post(`https://avion-five.vercel.app/orders`, {
                order: JSON.parse(localStorage.getItem("theOrder")!),
                quantity,
                status: "ordered"
            }, {
                headers: {
                    token:
                        `Bearer ${JSON.parse(localStorage.getItem("user")!).token}`,
                }
            })
            
            if (res.status == 201) {
                setTheOrders([])
                alertSuccess()
                localStorage.removeItem("theOrder")
            }
        } catch (error: any) {
            console.log(error.response.data.message)
            alertError(error.response.data.message)
        }
        getOrders()
    };

    //INCREASE PRODUCT AMOUNT
    const increment = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        const targetId = target.id
        const index = Number(targetId);
        setQuantity(prevQuantity => {
            const newQuantity = [...prevQuantity];
            newQuantity[index] += 1;
            setTotalPrice(prevTotalPrice => {
                const newTotalPrice = [...prevTotalPrice];
                newTotalPrice[index] = newQuantity[index] * price[index];
                return newTotalPrice;
            });
            return newQuantity;
        });
    };


    //DECREASE PRODUCT AMOUNT
    const decrement = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        const targetId = target.id
        const index = Number(targetId);
        setQuantity(prevQuantity => {
            const newQuantity = [...prevQuantity];
            newQuantity[index] -= 1;
            setTotalPrice(prevTotalPrice => {
                const newTotalPrice = [...prevTotalPrice];
                newTotalPrice[index] = newQuantity[index] * price[index];
                return newTotalPrice;
            });
            return newQuantity;
        });
    };
    

    //EMPTY CART
    const removeProduct = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement
        const targetId = target.id
        const index = Number(targetId);
        setQuantity(prevQuantity => {
            const newQuantity = [...prevQuantity];
            newQuantity.splice(index, 1)
            return newQuantity;
        })
        setTotalPrice(prevPrice => {
            const newPrice = [...prevPrice];
            newPrice.splice(index, 1)
            return newPrice;
        })
        setPrice(prevPrice => {
            const newPrice = [...prevPrice];
            newPrice.splice(index, 1)
            return newPrice;
        })
        setTheOrders(prevOrder => {
            const newOrder = [...prevOrder];
            newOrder.splice(index, 1)
            localStorage.setItem("theOrder", JSON.stringify(newOrder.map(order => order._id)))
            return newOrder;
        })
    }

    const clearCart = () => {
        localStorage.removeItem("theOrder")
        setTheOrders([])
    }

    useEffect(() => {
        getOrders()
    }, [])
    return (
        <div className=" position-relative" >

            <ToastContainer floatingTime={5000} containerStyle={{ position: "fixed" }} />
            
            {typeof window == "undefined" && !localStorage.getItem("user") ?
                
                <h1>you are not logged in</h1>:<div className=" bg-slate-100">
                {theOrders.length > 0 ? <div className=' md:py-20 md:px-52 m-2 bg-slate-100'>
                    <h2 className="text-center p-10">your shopping cart</h2>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-row justify-between w-full'>
                            <p>product</p>
                            <div className="flex gap-10 flex-row justify-between">
                                <p>available</p>
                                <p>quantity</p>
                                <p>total</p>
                            </div>
                        </div>
                        {theOrders && theOrders.map((order, index) => {
                        
                            return (
                                <div className='flex flex-row justify-between w-full items-center' key={order._id}>
                                    <div className='flex md:flex-row flex-col justify-between md:gap-5 md:w-[290px] w-[200px]'>
                                        <Image
                                            src={order.photos[0]}
                                            alt=""
                                            width={100}
                                            height={40}
                                        />
                                        <div className="flex flex-col">
                                            <h6>{order.name}</h6>
                                            {order.desc && <p className="hidden md:block">{(order.desc).slice(0, 40)}...</p>}
                                        </div>
                                    </div>
                                    <div className="flex  md:gap-10 gap-2  flex-row justify-between items-center">
                                        <h6>{order.amount}</h6>
                                        <div className="flex flex-row text-[25px]">
                                            {quantity && quantity[index] == 1 ? <div className='p-3 cursor-pointer text-[11px] my-auto' id={String(index)} onClick={removeProduct}>remove</div> : <div className='p-3 cursor-pointer' id={String(index)} onClick={decrement}>-</div>}
                                            <div className='p-3 bg-white w-full text-center md:w-fit h-fit' id={String(index)}>{quantity && quantity[index]}</div>
                                            <div className='p-3 cursor-pointer' id={String(index)} onClick={increment}>+</div>
                                        </div>
                                        {quantity && <h6>{(order.price) * (quantity[index])}<span className=" text-green-700"> $</span></h6>}
                                    </div>
                                </div>
                            )
                        })}
                        <hr className=' h-0 w-full bg-slate-800' />
                        <button onClick={clearCart} className="text-red-700 bg-slate-300 p-3 hover:bg-slate-600 hover:text-red-300 transition rounded m-3 font-bold text-2xl">clear cart?</button>
                    </div>
                    <div className="flex md:flex-row flex-col justify-between items-center">

                        <div className=" font-semibold text-lg">total: {totalPrice?.reduce((a, b) => a + b)} <span className=" text-green-700"> $</span> </div>
                        {theOrders.length > 0 &&
                            <button className="bg-[#2A254B] p-4 md:w-fit my-5 text-white w-full rounded" onClick={orderNow}>order now</button>
                        }
                    </div>
                    </div> : <>
                    {loading ? <Loader/>:<h1 className="mx-auto text-center w-full text-red-600">the cart is empty!</h1>}
                    </>}
            </div>
            }
        </div>
    );
};

export default Cart