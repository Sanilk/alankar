import Image from "next/image";
import Link from "next/link";

async function getHomePage() {
  const res = await fetch(
    "http://localhost:3000/api/pages?where[slug][equals]=home&depth=2",
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.docs?.[0];
}

async function getFeaturedProducts() {
  const res = await fetch(
    "http://localhost:3000/api/products?where[featured][equals]=true&depth=2",
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.docs || [];
}

export default async function Home() {
  const home = await getHomePage();
  const products = await getFeaturedProducts();

  if (!home) {
    return <div className="p-10 text-center">Homepage not found</div>;
  }

  // ✅ FIX: use relative URLs (NO base URL)
  const heroImage = home.hero?.image?.url || null;

  return (
    <main className="bg-white">

      {/* HERO */}
      <section className="relative h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage}
            alt={home.hero?.heading || "Hero"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold">
              {home.hero?.heading}
            </h1>

            <p className="mt-4 text-gray-200">
              {home.hero?.subheading}
            </p>

            <Link href="/shop">
              <button className="mt-6 px-6 py-3 bg-white text-black rounded-full">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {home.categories?.map((cat: any, index: number) => {
            const img = cat.image?.url || null;

            return (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl"
              >
                <div className="relative w-full h-80">
                  {img && (
                    <Image
                      src={img}
                      alt={cat.name}
                      fill
                      sizes="33vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">
                    {cat.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-10">
            Featured Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {products.map((p: any) => {
              const img = p.image?.url || null;

              return (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="bg-white rounded-xl shadow p-4 block"
                >
                  <div className="relative w-full h-60 mb-4">
                    {img ? (
                      <Image
                        src={img}
                        alt={p.name}
                        fill
                        sizes="25vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        No Image
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-gray-600">
                    ₹{p.price?.toLocaleString()}
                  </p>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {home.testimonials?.map((t: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
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