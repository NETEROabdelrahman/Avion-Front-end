import User from "@/models/userModel";
import bcrypt from "bcrypt";
//import jwt from 'jsonwebtoken'
import * as jose from 'jose'
const secret = new TextEncoder().encode(
    'secret',
)
const alg = 'HS256'

import { connectToDB } from "@/utils/database";

//login users

export const POST = async (req: any, res: any) => {
    const { username, password } = await req.json();
    const user = await User.findOne({ username });
    
    try {
        await connectToDB();
        if (!user) {
            return new Response(JSON.stringify({ message: 'wrong credentials' }), { status: 400 })
        }
        
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return new Response(JSON.stringify({ message: 'wrong credentials' }), { status: 400 })
        }
        //const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "secret")
        const token =await new jose.SignJWT({ id: user._id, isAdmin: user.isAdmin }).setProtectedHeader({ alg })
            .setIssuedAt()
            .sign(secret)
        
        return new Response(JSON.stringify({
            token,
            userID: user._id,
            isAdmin: user.isAdmin,
            img: user.img,
            username
        }), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("server error", { status: 500 })
    }
};



