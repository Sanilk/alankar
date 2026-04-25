export async function getFeaturedProducts() {
  const res = await fetch(
    "http://localhost:3000/api/products?where[featured][equals]=true&depth=2",
    { cache: "no-store" }
  );

  const data = await res.json();

  return data.docs.map((p: any) => {
    let imageUrl = "";

    // ✅ Payload media (correct way)
    if (p.image && typeof p.image === "object") {
      // 🔥 use optimized size if available
      imageUrl =
        p.image?.sizes?.card?.url ||
        p.image?.url ||
        "";
    }

    // ⚠️ fallback (old data)
    else if (typeof p.image === "string" && p.image.trim() !== "") {
      imageUrl = `/images/${p.image}`;
    }

    return {
      id: p.id,
      name: p.name || "",
      price: Number(p.price) || 0,
      image: imageUrl, // ✅ already relative (/api/media/...)
      slug: p.slug || "",
    };
  });
}