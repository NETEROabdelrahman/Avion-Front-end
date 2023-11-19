import User from "@/models/userModel";

import { connectToDB } from "@/utils/database";

//get users
export const GET = async () => {

    try {
        await connectToDB();
        const users =await User.find()
        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

