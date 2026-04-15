import { fetchProducts } from "@/lib/services/productService";

export async function GET() {
  const products = await fetchProducts();

  return Response.json({
    success: true,
    data: products,
  });
}