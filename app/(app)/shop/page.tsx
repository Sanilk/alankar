import ProductCard from "@/app/components/ProductCard";

export default async function ShopPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const data = await res.json();

  const products = data.docs.map((p: any) => {
    let imageUrl = "";

    // ✅ CASE 1: Payload media object
    if (p.image && typeof p.image === "object") {
      imageUrl =
        p.image?.sizes?.card?.url ||
        p.image?.url ||
        "";
    }

    // ✅ CASE 2: old string fallback
    else if (typeof p.image === "string" && p.image.trim() !== "") {
      imageUrl = `/images/${p.image}`;
    }

    return {
      id: p.id,
      name: p.name || "",
      price: Number(p.price) || 0,
      image: imageUrl,
      description: p.description || "",
      details: p.details || "",
      sizes: p.sizes?.map((s: any) => s.value) || [],
      inStock: p.inStock,
      quantityAvailable: p.quantityAvailable,
      discount: p.discount || 0,
      slug: p.slug || "",
    };
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Shop All Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products available
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}