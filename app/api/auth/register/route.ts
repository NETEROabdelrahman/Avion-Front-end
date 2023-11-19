import User from "@/models/userModel"
import bcrypt from "bcrypt";

import { connectToDB } from "@/utils/database";

//register users
export const POST = async (req:any, res:any) => {
    const { username, password, email, country, img, city, phone, isAdmin } =await req.json();
    const user = await User.findOne({ username });
    const Email = await User.findOne({ email });
    console.log(user)
    try {
        await connectToDB();
        if (user) {
            return new Response(JSON.stringify({ message: 'Username already exists' }), { status: 400 })
        }
        if (Email) {
            return new Response(JSON.stringify({ message: "email already exists" }), { status: 400 })
        }
        if (!email || !password || !username) {
            return new Response(JSON.stringify({ message: "please fill all credentials" }), { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email, country, img, city, phone, isAdmin });
        await newUser.save();
        return new Response(JSON.stringify(newUser), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
};


