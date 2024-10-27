import { MongoClient, ServerApiVersion } from "mongodb";

// let db;

export const createDBClient = async () => {
//   if (db) return db;
  try {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
      }
    });
    await client.connect();
    return client.db("main");
  }
  catch (error) {
    console.log(error);
  }
}