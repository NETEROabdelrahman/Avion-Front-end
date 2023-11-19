"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { idata } from "@/types"
const REGISTER_URL = 'https://avion-five.vercel.app/auth/register'
const LOGIN_URL = 'https://avion-five.vercel.app/auth/login'




const Signup = () => {
    const router = useRouter()

   
    const [userData, setUserData] = useState<idata|''>('')
    const [switchLogin, setSwitchLogin] = useState<boolean>(false)


    console.log(userData)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        setUserData({...userData,[name]:value})
    }

    //REGISTER
    const handleRegister = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(REGISTER_URL, userData)
            if (res.status == 201) {
                const loginRes = await axios.post(LOGIN_URL, userData)
                setUserData(loginRes.data)
                    localStorage.setItem('user', JSON.stringify(loginRes.data))
                    //router.replace('/')
                    window.location.replace('/')
            }
        } catch (error:any) {
            alert(error.response.data.message)
            console.log(error)
        }
    }

    //LOGIN
    const handleLogin = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const loginRes = await axios.post(LOGIN_URL, userData)
            setUserData(loginRes.data)
                localStorage.setItem('user', JSON.stringify(loginRes.data))
                //router.replace('/')
                window.location.replace('/')
        } catch (error:any) {
            alert(error.response.data.message)
            console.log(error.response.data)
        }
    }

    return (
        <>
            <>
                {!switchLogin ? <div className=" flex flex-col justify-center items-center gap-5   ">
                    <h1 className="font-bold text-[25px]">do not have an account ? <span className=" text-blue-400 cursor-pointer" onClick={() => setSwitchLogin(true)}>sign up</span></h1>
                    <form className="flex flex-col gap-4" >
                        <input className="p-3" placeholder="username" type="text" name="username"  onChange={handleChange} />
                        <input className="p-3" placeholder="password" type="password" name="password"  onChange={handleChange} />
                    </form>
                    <button className="p-3 bg-slate-500 m-5 rounded text-white" onClick={handleLogin}>login</button>
                </div>
                    :
                    <div className="flex flex-col justify-center items-center gap-5">
                        <h1 className="font-bold text-[25px]">already have an account ? <span className=" text-blue-400 cursor-pointer" onClick={() => setSwitchLogin(false)}>login</span></h1>
                        <form className="flex flex-col gap-4" >
                            <input className="p-3" placeholder="username" type="text" name="username"  onChange={handleChange} />
                            <input className="p-3" placeholder="password" type="password" name="password"  onChange={handleChange} />
                            <input className="p-3" placeholder="email" type="email" name="email"  onChange={handleChange} />
                            <input className="p-3" placeholder="country" type="text" name="country"  onChange={handleChange} />
                            <input className="p-3" placeholder="city" type="text" name="city" onChange={handleChange} />
                            <input className="p-3" placeholder="phone" type="number" name="phone"  onChange={handleChange} />
                        </form>
                        <button className="p-3 bg-slate-500 m-5 rounded text-white" onClick={handleRegister}>register</button>
                    </div>}
            </>
        </>
    )
};

export default Signup