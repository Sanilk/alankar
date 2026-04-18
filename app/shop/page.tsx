"use client";

import Link from "next/link";
import Image from "next/image";
import products from "@/app/data/products.json";
import { useWishlist } from "../store/wishlist";
import { Heart } from "lucide-react";

export default function ShopPage() {
    const { toggleWishlist, isInWishlist, hasHydrated } = useWishlist();

    if (!hasHydrated) {
        return <p className="p-6 text-gray-400">Loading products...</p>;
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">

            {/* TITLE */}
            <h1 className="text-4xl font-bold text-center mb-12">
                Shop All Products
            </h1>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {products.map((product) => {
                    const liked = isInWishlist(product.id);

                    return (
                        <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="block"
                        >
                            <div className="relative bg-white rounded-xl shadow hover:shadow-lg transition p-4 group">

                                {/* ❤️ HEART BUTTON */}
                                <button
                                    aria-label="Toggle wishlist"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist({
                                            id: product.id,
                                            name: product.name,
                                            price: Number(product.price.replace("₹", "").replace(/,/g, "")),
                                            image: product.image,
                                        });
                                    }}
                                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow hover:scale-110 transition"
                                >
                                    <Heart
                                        className={`w-5 h-5 transition-transform duration-200 ${liked
                                                ? "fill-red-500 text-red-500 scale-110"
                                                : "text-gray-500"
                                            }`}
                                    />
                                </button>

                                {/* IMAGE */}
                                <div className="relative w-full h-60 mb-4 overflow-hidden rounded-lg">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition"
                                    />
                                </div>

                                {/* NAME */}
                                <h2 className="font-semibold text-lg">
                                    {product.name}
                                </h2>

                                {/* PRICE */}
                                <p className="text-gray-600">{product.price}</p>

                                {/* STOCK */}
                                <p
                                    className={`text-sm mt-1 ${product.inStock
                                        ? "text-green-600"
                                        : "text-red-500"
                                        }`}
                                >
                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                </p>

                            </div>
                        </Link>
                    );
                })}

            </div>
        </main>
    );
}