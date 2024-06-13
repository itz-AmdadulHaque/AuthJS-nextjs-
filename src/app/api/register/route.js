import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/model/user-model";

export const POST = async (request) => {
  const {name, email, password} = await request.json();

  console.log(name, email, password);

  // Create a DB Conenction
  await dbConnect();

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);

  // Form a DB payload
  const newUser = {
    name,
    password: hashedPassword,
    email
  }

  // Update the DB
  try {
    await User.create(newUser);
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });

 }