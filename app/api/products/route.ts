// import { NextResponse } from "next/server";
// import { getDb } from "@/app/lib/db";

// export async function GET() {
//   const db = await getDb();

//   const products = await db.collection("products").find({}).toArray();

//   return NextResponse.json(products);
// }

// import { NextResponse } from "next/server";
// import { getDb } from "@/app/lib/db";

// export async function POST(req: Request) {
//   const db = await getDb();

//   const body = await req.json();

//   const result = await db.collection("products").insertOne(body);

//   return NextResponse.json(result);
// }

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = await getDb();

  const products = await db
    .collection("products")
    .find({})
    .toArray();

  return NextResponse.json(products);
}