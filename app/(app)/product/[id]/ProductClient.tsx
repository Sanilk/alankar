"use client";

import Image from "next/image";
import { useCart } from "@/app/store/cart";
import { useWishlist } from "@/app/store/wishlist";
import toast from "react-hot-toast";
import { useState } from "react";
import { Heart } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string | null; // ✅ always normalized from server
  description: string;
  details: string;
  sizes: string[];
  inStock: boolean;
  quantityAvailable: number;
  discount?: number;
  featured: boolean;
};

export default function ProductClient({
  product,
}: {
  product: Product;
}) {
  const addToCart = useCart((state) => state.addToCart);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const liked = isInWishlist(product.id);

  const finalPrice = product.discount
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

      {/* IMAGE */}
      <div className="relative w-full h-125">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl">
            No Image
          </div>
        )}

        {/* ❤️ Wishlist */}
        <button
          onClick={() => {
            toggleWishlist({
              id: product.id,
              name: product.name,
              price: finalPrice,
              image: product.image || "", // safe fallback
            });

            toast.success(
              liked ? "Removed from wishlist" : "Added to wishlist"
            );
          }}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={22}
            className={`transition ${
              liked ? "fill-red-500 text-red-500" : "text-gray-700"
            }`}
          />
        </button>
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {/* PRICE */}
        <div className="mt-2">
          {product.discount ? (
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold text-green-600">
                ₹{finalPrice.toLocaleString()}
              </p>
              <p className="text-gray-500 line-through">
                ₹{product.price.toLocaleString()}
              </p>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            </div>
          ) : (
            <p className="text-2xl">
              ₹{product.price.toLocaleString()}
            </p>
          )}
        </div>

        {/* STOCK */}
        <div className="mt-2">
          {product.inStock ? (
            <p className="text-green-600">
              ✔ In Stock ({product.quantityAvailable} available)
            </p>
          ) : (
            <p className="text-red-500">❌ Out of Stock</p>
          )}
        </div>

        {/* DESCRIPTION */}
        {product.description && (
          <p className="mt-4 text-gray-600">{product.description}</p>
        )}
        {product.details && (
          <p className="mt-4 text-gray-700">{product.details}</p>
        )}

        {/* SIZE SELECTOR */}
        {product.sizes.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Select Size</h3>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded transition ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ADD TO CART */}
        <button
          onClick={() => {
            if (!selectedSize && product.sizes.length > 0) {
              toast.error("Please select a size");
              return;
            }

            if (product.quantityAvailable === 0) {
              toast.error("Out of stock");
              return;
            }

            addToCart({
              id: product.id,
              name: `${product.name} (${selectedSize || "Default"})`,
              price: finalPrice,
              image: product.image || "",
              quantityAvailable: product.quantityAvailable,
            });

            toast.success(`${product.name} added to cart`);
          }}
          disabled={!product.inStock}
          className={`mt-8 w-full py-3 rounded-lg text-white transition ${
            product.inStock
              ? "bg-black hover:bg-gray-800 active:scale-95"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </main>
  );
}