"use client"

import Loader from "@/components/Loader"
import axios from "axios"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import { orders } from "@/types"


const Order = ({params}:any) => {
    const pathname = params.orderid
    const [data, setData] = useState<orders|null>(null)
  
  const alertError = (msg:string) => toast.error(msg);
  const alertSuccess = (msg:string) => toast.success(msg);


  
  //GET ORDER
  const getOrder = useCallback(async () => {
    const res = await axios.get(`https://avion-five.vercel.app/orders/${pathname}`)
    setData(res.data)
  }, [pathname])
  
  useEffect( () => {
    getOrder()
  }, [getOrder])

  //CANCEL ORDER
  const cancelOrder = async () => {
    if (data?.status == "ordered" || data?.status == "cart") {
      
      const res = await axios.put(`https://avion-five.vercel.app/orders/${pathname}`,
        {
          status: "cancelled"
        }
        , {
          headers: {
            token:
              `Bearer ${JSON.parse(localStorage.getItem("user")!).token}`,
          }
        })
      alertSuccess("successfully cancelled the order")
      return res;
    } else if (data?.status == "shipped") {
      alertError("the order is already shipped!")
    } else if (data?.status == "cancelled") {
      alertError("the order is already cancelled!")
    }
    else if (data?.status == "delivered") {
      alertError("the order is already delivered!")
    }
  };


  return (
    <div className="p-20">
            <ToastContainer floatingTime={5000} />
      {!data ? <Loader />:<div >
        <div className="flex flex-row flex-wrap justify-around items-center">

                
          {data?.order?.map((product, index) => {
            return (
              <div className="m-3 w-full md:w-fit flex flex-col items-center justify-center" key={index} >
                <Image
                  src={product.photos[0]}
                  alt=""
                  width={100}
                  height={150}
                />
                <p>name: {product.name}</p>
                <p>price: {product.price}$</p>
                <p>quantity: {data.quantity[index]}</p>
              </div>
            )
          })}
        </div>
        <div className="w-full h-[1px] bg-slate-300"></div>
        <div className="flex md:flex-row flex-col justify-between items-center">
          <div className="flex flex-col justify-between">

        <p className="p-3"><span className=" text-[24px] font-bold">total price:</span> {data.totalPrice}$</p>
        <p className="m-0 px-3"><span className=" text-[24px] font-bold">ordered at:</span> {(new Date(data.createdAt)).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Africa/Cairo"
        })}</p>
        </div>
          <button className="p-2 m-3 rounded bg-slate-600 text-slate-200" onClick={cancelOrder}>cancel order</button>
        </div>
      </div>}
      
    </div>
  );
}

export default Order