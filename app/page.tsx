"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const carouselImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

const featuredProducts = [
  {
    id: "1",
    name: "Elegant Necklace",
    price: 1999,
    image: "/images/product1.jpg",
  },
  {
    id: "2",
    name: "Stylish Earrings",
    price: 999,
    image: "/images/product2.jpg",
  },
  {
    id: "3",
    name: "Classic Ring",
    price: 1499,
    image: "/images/product3.jpg",
  },
];

const categories = [
  { name: "Necklaces", image: "/images/cat1.jpg" },
  { name: "Earrings", image: "/images/cat2.jpg" },
  { name: "Rings", image: "/images/cat3.jpg" },
];

export default function HomePage() {
  const [index, setIndex] = useState(0);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="space-y-12 p-6">
      {/* 🎠 Carousel */}
      <div className="relative w-full h-[300px]">
        <Image
          src={carouselImages[index]}
          alt="Hero"
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* ⭐ Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-xl shadow-sm"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-lg"
              />

              <h3 className="mt-2 font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-600">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🗂️ Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative h-[150px] rounded-xl overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}