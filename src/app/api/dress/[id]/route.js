// export async function GET(req, { params }) {
//     const id = (await params).id;

//     console.log({ id });
//     return new Response("Seed");
// }

// export async function PATCH(req) {
//     return new Response("Seed");
// }

// export async function DELETE(req) {
//     return new Response("Seed");
// }

// app/api/products/[id]/route.js

import { createDBClient } from "@/app/lib/db";
import { ObjectId } from "mongodb"; // Make sure to import ObjectId from mongodb

export async function GET(req, { params }) {
    const id = params.id;

    const dbClient = await createDBClient();
    const product = await dbClient.collection("products").findOne({ _id: new ObjectId(id) });

    if (!product) {
        return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
}

export async function PATCH(req, { params }) {
    const { id } = params; // Get the ID from the request parameters
    const updatedData = await req.json(); // Get the data from the request body

    // Perform the update operation
    const dbClient = await createDBClient();
    const result = await dbClient.collection("products").updateOne(
        { _id: new ObjectId(id) }, // Query by ObjectId
        { $set: updatedData } // Update the fields that are passed
    );

    if (result.modifiedCount === 1) {
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ success: false }), { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    const id = params.id;
    const dbClient = await createDBClient();

    const result = await dbClient.collection("products").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
        return new Response("Failed to delete product", { status: 400 });
    }

    return new Response("Product deleted successfully", { status: 200 });
}
