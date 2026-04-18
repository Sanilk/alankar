"use client";

import { useWishlist } from "../store/wishlist";
import Image from "next/image";
import Link from "next/link";

export default function WishlistPage() {
  const { items, toggleWishlist, hasHydrated } = useWishlist();

  if (!hasHydrated) {
    return <p className="p-6 text-gray-400">Loading wishlist...</p>;
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold mb-10">Your Wishlist ❤️</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow"
            >

              <div className="relative w-full h-48 mb-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>

              <div className="flex justify-between mt-4">
                <Link
                  href={`/product/${item.id}`}
                  className="text-sm underline"
                >
                  View
                </Link>

                <button
                  onClick={() => toggleWishlist(item)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>

            </div>
          ))}

        </div>
      )}
    </main>
  );
}