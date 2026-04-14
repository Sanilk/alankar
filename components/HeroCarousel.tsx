"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh]">
      <Image
        src={images[index]}
        alt="Hero"
        fill
        className="object-cover transition-all duration-700"
      />

      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Timeless Boutique Collection
        </h1>
        <p className="mb-6">Discover your unique style</p>
      </div>
    </div>
  );
}