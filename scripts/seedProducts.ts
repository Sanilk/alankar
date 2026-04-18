import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in environment variables");
}

const DB_NAME = process.env.MONGODB_DB || "alankar_dev";

if (!DB_NAME) {
  throw new Error("❌ MONGODB_DB is missing in .env file");
}

// read JSON safely using fs
const productsPath = path.join(process.cwd(), "app/data/products.json");
const products = JSON.parse(fs.readFileSync(productsPath, "utf-8"));

async function seed() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection("products");

    await collection.deleteMany({});

    const result = await collection.insertMany(products);

    console.log(`Inserted ${result.insertedCount} products`);
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await client.close();
  }
}

seed();