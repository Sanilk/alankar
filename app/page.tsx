import Image from "next/image";
import Link from "next/link";

type Category = {
  name: string;
  image: string;
};

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type Testimonial = {
  name: string;
  text: string;
  city: string;
};

export default function Home() {
  const categories: Category[] = [
    { name: "Dresses", image: "/images/cat1.jpg" },
    { name: "Tops", image: "/images/cat2.jpg" },
    { name: "Accessories", image: "/images/cat3.jpg" },
  ];

  const products: Product[] = [
    { id: "1", name: "Floral Dress", price: "₹1,499", image: "/images/product1.jpg" },
    { id: "2", name: "Casual Top", price: "₹799", image: "/images/product2.jpg" },
    { id: "3", name: "Stylish Handbag", price: "₹1,999", image: "/images/product3.jpg" },
    { id: "4", name: "Summer Outfit", price: "₹2,299", image: "/images/product1.jpg" },
    { id: "5", name: "Floral Dress", price: "₹1,499", image: "/images/product1.jpg" },
    { id: "6", name: "Casual Top", price: "₹799", image: "/images/product2.jpg" },
    { id: "7", name: "Stylish Handbag", price: "₹1,999", image: "/images/product3.jpg" },
    { id: "8", name: "Summer Outfit", price: "₹2,299", image: "/images/product1.jpg" },
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Ananya R.",
      text: "Absolutely love the quality and design. Everything feels premium.",
      city: "Kochi",
    },
    {
      name: "Meera S.",
      text: "Beautiful collection and very smooth shopping experience.",
      city: "Bangalore",
    },
    {
      name: "Priya K.",
      text: "Stylish, elegant and worth every rupee!",
      city: "Chennai",
    },
  ];

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative h-[80vh] w-full">
        <Image
          src="/images/hero2.jpg"
          alt="Hero"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Discover Your Style
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Unique boutique collections crafted just for you.
            </p>

            <button className="mt-6 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categories?.map((cat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl"
            >
              <div className="relative w-full h-80">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
              </div>

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">

            {Array.isArray(products) &&
              products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 group block"
                >
                  <div className="relative w-full h-60 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-110 group-hover:brightness-90"
                    />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
                        View Product
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg">
                    {product.name}
                  </h3>

                  <p className="text-gray-600">{product.price}</p>

                  <button className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                    Add to Cart
                  </button>
                </Link>
              ))}

          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center text-white overflow-hidden">

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero3.jpg"
            alt="Our Story Background"
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Our Story
          </h2>

          <p className="text-lg text-gray-200 leading-relaxed">
            We started as a small boutique with a passion for bringing unique and timeless
            fashion to everyday life. Every piece in our collection is carefully curated
            to reflect elegance, comfort, and individuality.
          </p>
        </div>

      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {testimonials?.map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="text-yellow-500 mb-2">★★★★★</div>

                <p className="text-gray-600 mb-4">“{t.text}”</p>

                <h4 className="font-semibold">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.city}</span>
              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}