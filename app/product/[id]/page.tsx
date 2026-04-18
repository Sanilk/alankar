import products from "@/app/data/products.json";
import ProductClient from "./ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  return <ProductClient product={product} />;
}