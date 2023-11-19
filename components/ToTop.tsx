"use client"


import { useEffect, useState } from 'react'
import {motion } from 'framer-motion'

const Top = () => {
  const [scrolling,setScrolling] = useState<number>(0)

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    function handleScroll() {
      setScrolling(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      className='my-3 p-3 bg-slate-600 rounded-full fixed left-12 bottom-12 text-[30px] z-50 w-10 h-10 flex justify-center items-center text-white cursor-pointer'
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={() => toTop()}
      style={{ display: scrolling >= 400 ? "flex" : "none" }}
      >
        ↑
      </motion.div>
    
      
  )
}

export default Top