import { auth } from "@/auth";
import { dbConnect } from "@/lib/dbConnect"; 
import { User } from "@/model/user-model";

import { NextRequest, NextResponse } from "next/server";


export const GET = async (request) => {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(`You are not authenticated!`, {
        status: 500,
      });
    }

    await dbConnect();

    try{
        const user = await User.findOne({
            email: session?.user?.email
          });
          console.log(user);

        return new NextResponse(JSON.stringify(user), {
            status: 200,
        });
    } catch(error) {
        console.error(error);
        return new NextResponse(error.message, {
            status: 500,
          });
    }
}