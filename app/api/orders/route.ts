import { Product } from "@/types";

export async function GET(): Promise<Response> {
  const products: Product[] = await fetchProducts();
  return Response.json({ success: true, data: products });
}