// import seedData from "@/data/seed";
// import { createDBClient } from "@/app/lib/db"

export async function GET(req) {
    // const dbClient = await createDBClient();
    // await dbClient.collection("products").insertMany(seedData);
    return new Response("Seed");
}

