"use client"

import Loader from "@/components/Loader"
import { orders } from "@/types";
import axios from "axios"
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';


const MyOrders = () => {

  const [data, setData] = useState<orders[]|null>(null)
  const alertWarning = () => toast.warning('you need to login first!');

  

  const getOrders = useCallback(async () => {
    if (localStorage.getItem("user")) {
      const res = await axios.get("https://avion-five.vercel.app/orders/find/myorders", {
        headers: {
          token:
            `Bearer ${JSON.parse(localStorage.getItem("user")!).token}`,
        }
      })
      setData(res.data)
    } else {
      alertWarning()
    }
  },[])

  useEffect(() => {
    if(typeof window !== "undefined") getOrders()
  }, [getOrders])

  return (
    <div >
      <h1 className="text-center p-3">your orders</h1>

      <h4 className="text-center p-3 rounded bg-yellow-200 w-fit mx-auto">you can cancel orders before shipping only!</h4>
      <ToastContainer floatingTime={5000} />
      {typeof window !== "undefined" &&localStorage.getItem("user") ? <div className="md:p-10 p-2 relative">
        <div className="flex justify-around items-center">
          <p className="hidden md:block">product</p>
          <p>ordered at</p>
          <p>price</p>
          <p>status</p>
          <p>open order</p>
        </div>
        <div className="w-full h-[1px] bg-slate-300"></div>
        {data ? <div>
          {data.map((order,index) => {
            return (
              <div key={index} className="flex flex-row items-center justify-around py-3">
                <Image
                  className="hidden md:block"
                  src={order.order[0].photos[0]}
                  alt=""
                  width={50}
                  height={90}
                />
                <p className="m-0 max-w-[90px]">{(new Date(order.createdAt)).toLocaleString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                  timeZone: "Africa/Cairo"
                })}</p>
                <h3 className="m-0">{order.totalPrice}$</h3>
                {order.status == "cart" && <p className=" bg-slate-200 p-1 text-black rounded m-0">cart</p>}
                {order.status == "ordered" && <p className=" bg-yellow-200 p-1 text-black rounded m-0">ordered</p>}
                {order.status == "shipped" && <p className=" bg-yellow-800 p-1 text-white rounded m-0">shipped</p>}
                {order.status == "delivered" && <p className=" bg-green-400 p-1 text-black rounded m-0">delivered</p>}
                {order.status == "cancelled" && <p className=" bg-black p-1 text-white rounded m-0">cancelled</p>}
                <Link href={{ pathname: `/my-orders/${order._id}` }}>see order</Link>
              </div>
            )
          })}
        </div> : <Loader />}
      </div> : <div className="">you are not logged in </div>}
    </div>
  )
};

export default MyOrders