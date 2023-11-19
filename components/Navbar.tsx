"use client"

import Image from 'next/image'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IUser } from '@/types'




const container = {
    hidden: {
        opacity: 1,
        scale: 0,
        height:0
    },
    visible: {
      opacity: 1,
        scale: 1,
      height:120,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  }
    
  const item = {
    hidden: {
      y: 20,
      opacity: 0,
      scale:0.5
    },
    
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
    }
  }

const Navbar = () => {
  const router = useRouter()
  const params = useSearchParams()
  
  const [username, setUsername] = useState<string | null>('')
  const [open, setOpen] = useState<boolean>(false)

  

//GO TO SIGNUP PAGE
  const signUp = () => {
    router.push('/register')
  }


  useEffect(() => {
    const user = localStorage.getItem("user")
      if (user) {
        const user: IUser = JSON.parse(localStorage.getItem("user")!);
        setUsername(user.username);
      }
  }, [username]);

//LOGOUT
  const logout = () => {
    localStorage.removeItem("user")
    setUsername('')
    router.replace('/')
  }

  return (
    <header>
        
      <nav className='flex  flex-row justify-between items-center h-[70px]' >
        <Link href={"/"} className=' text-decoration-none text-black p-3'>
          <div className='ml-[28px] md:ml-0 font-bold'>Avion</div>
        </Link>
        
        <div className='  gap-3 flex mr-[28px] items-center'>

          <Link href={'/cart'}><Image
            className=' cursor-pointer hover:bg-slate-300 transition-all rounded-full p-2'
            alt=''
            src={require('/public/svg/Shopping--cart.svg')}
            width={40}
            height={40}
          ></Image></Link>
                
            
            
          {username ? <div className='flex items-center gap-3'>
            <Link className="link text-decoration-none" href={"/my-orders"}><li className=' list-none  ' >
              <Image
                className=' cursor-pointer hover:bg-slate-300 transition-all rounded-full p-2'
                src={require("../public/svg/User--avatar.svg")}
                alt='user'
                width={40}
                height={40}
              />
            </li></Link>
            <li className=' list-none' onClick={logout}>
              <Image
                className="logout cursor-pointer hover:bg-slate-300 transition-all rounded-full p-2"
                alt="logout"
                width={40}
                height={40}
                src={require('../public/svg/logout.svg')}
              />
            </li>
          </div>
            :
            <li className=' list-none cursor-pointer' onClick={signUp}>login</li>
          }
        </div>
        <div className='md:hidden flex mr-[28px] gap-4'>
          
          <Image
            className=' hover:bg-slate-300'
            alt=''
            src={require('/public/svg/Menu.svg')}
            width={25}
            height={25}
            onClick={() => setOpen(!open)}
          ></Image>
        </div>
      </nav>
      <div className='w-[90%] mx-6 bg-slate-800 h-[0.5px]  md:block hidden'></div>
      {!open && <ul className=' md:flex justify-center items-center gap-7 flex-row flex-wrap h-[62px] hidden'>
        <Link href={`/products?page=1&search=&filter=`} className={`${params.get("filter")==""&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` }>All products</Link>
        <Link href={`/products?page=1&search=&filter=Plant Pots`} className={`${params.get("filter")=="Plant Pots"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` }>Plant Pots</Link>
        <Link href={`/products?page=1&search=&filter=Tables`} className={`${params.get("filter")=="Tables"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` }>Tables</Link>
        <Link href={`/products?page=1&search=&filter=chairs`} className={`${params.get("filter")=="chairs"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` }>Chairs</Link>
        <Link href={`/products?page=1&search=&filter=crockery`} className={`${params.get("filter")=="crockery"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` }>Crockery</Link>
        <Link href={`/products?page=1&search=&filter=Tableware`} className={`${params.get("filter")=="Tableware"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` }>Tableware</Link>
        <Link href={`/products?page=1&search=&filter=Cutlery`} className={`${params.get("filter")=="Cutlery"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` }>Cutlery</Link>
      </ul>}
      {open && <motion.ul variants={container} initial={open ? "hidden" : "visible"} animate={open ? "visible" : "hidden"} className=' flex justify-center items-center gap-7 flex-wrap flex-row h-[120px] '>
        <Link className='text-black text-decoration-none' href={`/products?page=1&search=&filter=`}><motion.li className={`${params.get("filter")==""&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` } variants={item} >All products</motion.li></Link>
        <Link className='text-black text-decoration-none' href={`/products?page=1&search=&filter=Plant Pots`}><motion.li className={`${params.get("filter")=="Plant Pots"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` } variants={item} >Plant Pots</motion.li></Link>
        <Link className='text-black text-decoration-none' href={`/products?page=1&search=&filter=Tables`}><motion.li className={`${params.get("filter")=="Tables"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` } variants={item} >Tables</motion.li></Link>
        <Link className='text-black text-decoration-none' href={`/products?page=1&search=&filter=chairs`}><motion.li className={`${params.get("filter")=="chairs"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` } variants={item} >Chairs</motion.li></Link>
        <Link className='text-black text-decoration-none' href={`/products?page=1&search=&filter=crockery`}><motion.li className={`${params.get("filter")=="crockery"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` } variants={item} >Crockery</motion.li></Link>
        <Link className='text-black text-decoration-none' href={`/products?page=1&search=&filter=Tableware`}><motion.li className={`${params.get("filter")=="Tableware"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` } variants={item} >Tableware</motion.li></Link>
        <Link className='text-black text-decoration-none' href={`/products?page=1&search=&filter=Cutlery`}><motion.li className={`${params.get("filter")=="Cutlery"&& "font-bold"} whitespace-nowrap hover:font-bold hover:cursor-pointer transition-all text-black text-decoration-none` } variants={item} >Cutlery</motion.li></Link>
        
      </motion.ul>}
    </header>
            
  );
};

export default Navbar