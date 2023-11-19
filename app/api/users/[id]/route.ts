import User from "@/models/userModel";
import bcrypt from "bcrypt";

import { connectToDB } from "@/utils/database";

//get one user
export const GET = async (req: any, res: any) => {
        try {
            await connectToDB();
        const user =await User.findOne({_id:res.params.id}).select("_id phone isAdmin username email country city createdAt updatedAt")
        return new Response(JSON.stringify(user),{status:200})
        } catch (error) {
            console.log(error)
        return new Response(JSON.stringify(error),{status:404})
    }

}



//update one user
export const PUT = async (req: any, res: any) => {
    const body = await req.json()
        if (body.password) {
          body.password = await bcrypt.hash(body.password, 10);
          try {
            const updatedUser = await User.findByIdAndUpdate(
              res.params.id,
              {
                $set: body,
              },
              { new: true }
            );
              return new Response(JSON.stringify(updatedUser),{status:200})
            } catch (err) {
                console.log(err);
                return new Response(JSON.stringify(err),{status:500})
            }
        } else {
            return new Response("You can update only your account!",{status:403})
        }

}

