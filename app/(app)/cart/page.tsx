"use client";

import { useEffect } from "react";
import { useCart } from "../../store/cart";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartPage() {
  const { status } = useSession();
  const router = useRouter();

  // ✅ ALWAYS call hooks first
  const {
    items,
    removeFromCart,
    increaseQty,
    decreaseQty,
    hasHydrated,
    setItems,
    clearCart,
  } = useCart();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/cart");
    }
  }, [status, router]);

  useEffect(() => {
    async function loadCart() {
      const res = await fetch("/api/cart", {
        credentials: "include", // ✅ IMPORTANT
      });
      const data = await res.json();

      // ❗ ONLY overwrite if DB has items
      if (data.items && data.items.length > 0) {
        setItems(data.items);
      }
    }

    if (status === "authenticated") {
      loadCart();
    }
  }, [setItems, status]);

  // ✅ AFTER hooks → conditional rendering
  if (status === "loading") {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (!hasHydrated) {
    return <p className="text-gray-400 p-6">Loading cart...</p>;
  }

  if (status === "unauthenticated") {
    return null; // prevent flicker
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
                <p className="text-gray-600">
                  ₹{formatPrice(item.price)}
                </p>

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
                    onClick={() => {
                      if (item.quantity >= item.quantityAvailable) {
                        toast.error("Reached max available stock");
                        return;
                      } increaseQty(item.id)
                    }}
                    disabled={item.quantity >= item.quantityAvailable}
                    className={`w-8 h-8 border rounded ${item.quantity >= item.quantityAvailable
                      ? "bg-gray-200 cursor-not-allowed"
                      : "hover:bg-gray-100"
                      }`}
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
          <div className="flex justify-between items-center mt-10">
            <p className="text-2xl font-semibold">
              Total: ₹{formatPrice(total)}
            </p>
          </div>
          <button
            onClick={async () => {
              const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ items }),
              });

              const data = await res.json();

              if (res.ok) {
                toast.success("Order placed successfully 🎉");

                clearCart(); // VERY IMPORTANT

                router.push("/profile"); // go to orders page
              } else {
                toast.error(data.error || "Failed to place order");
              }
            }}
            className="mt-6 w-full bg-black text-white py-3 rounded-lg"
          >
            Place Order
          </button>
        </div>
      )}
    </main>
  );
}
