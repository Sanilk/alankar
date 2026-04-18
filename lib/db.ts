// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI!;
// const dbName = process.env.MONGODB_DB!;

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri);
//   global._mongoClientPromise = client.connect();
// }

// clientPromise = global._mongoClientPromise;

// export async function getDb() {
//   const client = await clientPromise;
//   return client.db(dbName);
// }

import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.MONGODB_DB || "alankar_dev";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI missing in env");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}