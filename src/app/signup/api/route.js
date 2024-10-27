import { createDBClient } from "@/app/lib/db"; // Adjusted import to use the createDBClient function
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const newUser = await request.json();
    try {
        const db = await createDBClient(); // Use createDBClient to get the database instance
        const userCollection = db.collection("users"); // Use collection directly

        // Check if the user already exists
        const exist = await userCollection.findOne({ email: newUser.email });
        console.log(exist);

        if (exist) {
            return NextResponse.json({ message: "User Exists" }, { status: 409 }); // Changed to 409 Conflict
        }
        const hashedPassword = bcrypt.hashSync(newUser.password, 14);
        const resp = await userCollection.insertOne({ ...newUser, password: hashedPassword });

        return NextResponse.json({ message: "User Created" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Something Went Wrong", error },
            { status: 500 }
        );
    }
};

