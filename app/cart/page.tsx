"use client";

import { useCart } from "../store/cart";
import Image from "next/image";

export default function CartPage() {
  const { items, removeFromCart, increaseQty, decreaseQty, hasHydrated } =
    useCart();

  if (!hasHydrated) {
    return <p className="text-gray-400 p-6">Loading cart...</p>;
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN").format(price);

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <h1 className="text-3xl font-bold mb-10">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="space-y-6">

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white p-4 rounded-xl shadow"
            >

              {/* IMAGE */}
              <div className="relative w-24 h-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{formatPrice(item.price)}</p>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="min-w-5 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="w-8 h-8 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTAL */}
          <div className="text-right text-2xl font-semibold mt-10">
            Total: ₹{formatPrice(total)}
          </div>

        </div>
      )}
    </main>
  );
}