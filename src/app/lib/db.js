import { MongoClient, ServerApiVersion } from "mongodb";

// let db;

export const createDBClient = async () => {
//   if (db) return db;
  try {
    const uri = `mongodb+srv://fashion-house:w1PnQeqq8PbxAWuo@cluster0.vadwj9m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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