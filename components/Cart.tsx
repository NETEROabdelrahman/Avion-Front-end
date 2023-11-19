'use client'

import { useEffect, useState } from 'react'
import {motion } from 'framer-motion'
import Link from 'next/link'

const Cart = () => {
  const [arrLength,setArrLength] = useState<number>(0)
  useEffect(() => {

    function handleScroll() {
      if (typeof window !== "undefined" && localStorage.getItem("user") && localStorage.getItem("theOrder"))setArrLength((JSON.parse(localStorage.getItem("theOrder")!)).length)
      if(typeof window !== "undefined" && localStorage.getItem("user") && !localStorage.getItem("theOrder"))setArrLength(0)
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
      
        <motion.div
            className='my-3 p-3 bg-slate-600 rounded-full fixed right-12 bottom-12  text-[30px] z-50 w-10 h-10 flex justify-center items-center'
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        <Link href={'/cart'}><span className=' bg-[#ff0000a6] flex justify-center items-center w-10 h-10 rounded-full absolute text-[20px] bottom-[20px] right-[20px] text-white'>{ arrLength}</span>🛒</Link>
        </motion.div>
    
      
    );
}

export default Cart