// import { createDBClient } from "@/app/lib/db"

// export async function GET(req) {
//     const dbClient = await createDBClient();
//     const products = await dbClient.collection("products").find().toArray();
//     console.log(products);
//     return new Response(JSON.stringify(products));
// }

// export async function POST(req) {
    
//     return new Response("Hello, world!");
// }


// app/api/products/route.js

import { createDBClient } from "@/app/lib/db"; // Ensure this import is correct

export async function GET(req) {
    const dbClient = await createDBClient();
    const products = await dbClient.collection("products").find().toArray();
    console.log(products); // Log the products to the console
    return new Response(JSON.stringify(products), { status: 200 }); // Return products with a 200 status
}

export async function POST(req) {
    const dbClient = await createDBClient();
    const productData = await req.json(); // Parse incoming JSON data

    // Insert the new product into the database
    const result = await dbClient.collection("products").insertOne(productData);

    // Return a response with the inserted product's ID
    return new Response(JSON.stringify({ id: result.insertedId }), { status: 201 });
}

