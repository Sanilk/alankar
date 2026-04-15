import Image from "next/image";
import Link from "next/link";

// ⚠️ Keep this ONLY if component is stable
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 dark:bg-black dark:text-white">

      {/* HERO */}
      <HeroCarousel />

      {/* FEATURED PRODUCTS */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border dark:border-gray-700 p-4 rounded-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-md group">
                <Image
                  src={`/images/product${item}.jpg`}
                  alt={`Product ${item}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={item === 1}
                />
              </div>

              <h3 className="text-lg font-medium">Product Name</h3>
              <p className="text-gray-500 dark:text-gray-400">₹1999</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 px-6 md:px-20">
        <h2 className="text-2xl font-semibold mb-8 text-center">
          Shop by Category
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Dresses", img: "/images/cat1.jpg" },
            { name: "Accessories", img: "/images/cat2.jpg" },
            { name: "Footwear", img: "/images/cat3.jpg" },
          ].map((cat) => (
            <div
              key={cat.name}
              className="relative h-40 rounded-lg overflow-hidden group"
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xl font-semibold">
                {cat.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
          We create unique, handcrafted fashion pieces that celebrate individuality and elegance.
        </p>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white text-center dark:bg-white dark:text-black">
        <h2 className="text-2xl mb-4">
          Ready to Elevate Your Style?
        </h2>

        <Link href="/products">
          <span className="inline-block bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition dark:bg-black dark:text-white dark:hover:bg-gray-800">
            Explore Collection
          </span>
        </Link>
      </section>

    </main>
  );
}