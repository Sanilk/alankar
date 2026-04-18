"use client";

import Image from "next/image";
import { useCart } from "@/app/store/cart";
import toast from "react-hot-toast";
import { useWishlist } from "@/app/store/wishlist";

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

export default function ProductClient({
    product,
}: {
    product: Product;
}) {
    const addToCart = useCart((state) => state.addToCart);

    const finalPrice = product.discount
        ? Math.round(
            Number(product.price.replace("₹", "").replace(",", "")) *
            (1 - product.discount / 100)
        )
        : null;

    const { toggleWishlist, isInWishlist } = useWishlist();
    const liked = isInWishlist(product.id);

    return (
        <main className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">

            {/* IMAGE */}
            <div className="relative w-full h-125">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-xl"
                />
            </div>

            {/* DETAILS */}
            <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>

                <div className="mt-2">
                    {product.discount ? (
                        <div className="flex items-center gap-3">
                            <p className="text-2xl font-semibold text-green-600">
                                ₹{finalPrice}
                            </p>
                            <p className="text-gray-500 line-through">
                                {product.price}
                            </p>
                        </div>
                    ) : (
                        <p className="text-2xl">{product.price}</p>
                    )}
                </div>

                <p className="mt-4 text-gray-600">{product.description}</p>
                <p className="mt-4 text-gray-700">{product.details}</p>

                <button
                    onClick={() =>
                        toggleWishlist({
                            id: product.id,
                            name: product.name,
                            price: Number(product.price.replace("₹", "")),
                            image: product.image,
                        })
                    }
                    className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                    {liked ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
                </button>

                {/* ADD TO CART */}
                <button
                    onClick={() => {
                        addToCart({
                            id: product.id,
                            name: product.name,
                            price: Number(product.price.replace("₹", "")),
                            image: product.image,
                        });

                        toast.success(`${product.name} added to cart`);
                    }}
                    disabled={!product.inStock}
                    className={`mt-8 w-full py-3 rounded-lg text-white transition ${product.inStock
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