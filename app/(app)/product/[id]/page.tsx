import ProductClient from "./ProductClient";

const BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // slug

  const res = await fetch(
    `${BASE_URL}/api/products?where[slug][equals]=${id}&depth=2`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const product = data.docs?.[0];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  // ✅ FIXED IMAGE HANDLING (Payload + fallback safe)
  let imageUrl = "";

  if (product.image?.url) {
    imageUrl = `${product.image.url}`;
  }

  const formattedProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: imageUrl, // ✅ CORRECT
    description: product.description || "",
    details: product.details || "",
    sizes: product.sizes?.map((s: any) => s.value) || [],
    inStock: product.inStock,
    quantityAvailable: product.quantityAvailable,
    discount: product.discount || 0,
    featured: product.featured || false,
  };

  return <ProductClient product={formattedProduct} />;
}