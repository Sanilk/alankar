import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;

  description: string;
  details: string;

  sizes: string[];
  sizeChart?: string;

  inStock: boolean;
  quantityAvailable: number;

  productCode: string;
  discount?: number;
};

const products: Product[] = [
  {
    id: "1",
    name: "Floral Dress",
    price: "₹1,499",
    image: "/images/product1.jpg",

    description: "Elegant floral dress for summer outings.",
    details:
      "This dress is made from premium cotton blend fabric, designed for comfort and style. Perfect for casual and semi-formal occasions.",

    sizes: ["S", "M", "L"],
    sizeChart: "/images/size-chart.jpg",

    inStock: true,
    quantityAvailable: 12,

    productCode: "FD-1001",
    discount: 10,
  },
  {
    id: "2",
    name: "Casual Top",
    price: "₹799",
    image: "/images/product2.jpg",

    description: "Comfortable everyday wear top.",
    details:
      "Soft breathable fabric ideal for daily wear and office use.",

    sizes: ["S", "M", "L", "XL"],
    sizeChart: "/images/size-chart.jpg",

    inStock: false,
    quantityAvailable: 0,

    productCode: "CT-2002",
    discount: 0,
  },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  const finalPrice = product.discount
    ? Math.round(
        Number(product.price.replace("₹", "").replace(",", "")) *
          (1 - product.discount / 100)
      )
    : null;

  return (
    <main className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

      {/* IMAGE */}
      <div className="relative w-full h-[500px]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-xl"
        />
      </div>

      {/* DETAILS */}
      <div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold">{product.name}</h1>

        {/* PRICE */}
        <div className="mt-2">
          {product.discount ? (
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold text-green-600">
                ₹{finalPrice}
              </p>
              <p className="text-gray-500 line-through">
                {product.price}
              </p>
              <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            </div>
          ) : (
            <p className="text-2xl">{product.price}</p>
          )}
        </div>

        {/* STOCK */}
        <div className="mt-3">
          {product.inStock ? (
            <p className="text-green-600">
              ✔ In Stock ({product.quantityAvailable} available)
            </p>
          ) : (
            <p className="text-red-500">❌ Out of Stock</p>
          )}
        </div>

        {/* SHORT DESCRIPTION */}
        <p className="mt-4 text-gray-600">{product.description}</p>

        {/* FULL DETAILS */}
        <p className="mt-4 text-gray-700">{product.details}</p>

        {/* PRODUCT CODE */}
        <p className="mt-3 text-sm text-gray-500">
          Product Code: {product.productCode}
        </p>

        {/* SIZE SELECTOR */}
        <div className="mt-6">
          <h3 className="font-medium mb-2">Select Size</h3>
          <div className="flex gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                className="border px-4 py-2 rounded hover:bg-black hover:text-white"
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* SIZE CHART */}
        {product.sizeChart && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Size Chart</h3>
            <Image
              src={product.sizeChart}
              alt="Size Chart"
              width={800}
              height={700}
              className="rounded border"
            />
          </div>
        )}

        {/* ADD TO CART */}
        <button
          disabled={!product.inStock}
          className={`mt-8 w-full py-3 rounded-lg text-white transition ${
            product.inStock
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </main>
  );
}