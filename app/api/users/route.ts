import User from "@/models/userModel";

import { connectToDB } from "@/utils/database";

//get all users
export const GET = async (req: any, res: any) => {
                try {
                    await connectToDB();
                    const users =await User.find({})
                    return new Response(JSON.stringify(users),{status:200})
                } catch (error) {
                    console.log(error)
                    return new Response(JSON.stringify(error),{status:404})
                }
}


