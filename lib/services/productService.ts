import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";

export async function fetchProducts() {
  await connectDB();
  return Product.find().lean();
}