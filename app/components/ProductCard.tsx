"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useWishlist } from "@/app/store/wishlist";
import toast from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  slug: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist, hasHydrated } = useWishlist();

  if (!hasHydrated) {
    return null; // or skeleton
  }

  const liked = hasHydrated && isInWishlist(product.id);

  const parsePrice = (price: number) => price; // No parsing needed since price is already a number

  return (
    <div className="group bg-white rounded-xl shadow hover:shadow-lg transition p-4">

      {/* IMAGE + LINK */}
      <div className="relative w-full h-60 mb-4 overflow-hidden rounded-lg">

        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-90 cursor-pointer"
          />
        </Link>

        {/* ❤️ Wishlist Button (NOW FULLY INDEPENDENT) */}
        <button
          onClick={() => {
            toggleWishlist({
              id: product.id,
              name: product.name,
              price: parsePrice(product.price),
              image: product.image,
            });

            toast.success(
              liked ? "Removed from wishlist" : "Added to wishlist"
            );
          }}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={`${liked ? "fill-red-500 text-red-500" : "text-gray-700"
              }`}
          />
        </button>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition pointer-events-none" />
      </div>

      {/* TEXT CONTENT (CLICKABLE) */}
      <Link href={`/product/${product.id}`}>
        <h2 className="font-semibold text-lg cursor-pointer">
          {product.name}
        </h2>

        <p className="text-gray-600 cursor-pointer">
          ₹{product.price}
        </p>

        <p
          className={`text-sm mt-1 ${product.inStock ? "text-green-600" : "text-red-500"
            }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </Link>
    </div>
  );
}