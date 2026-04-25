"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");

  // 🔹 Load user
  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/user", {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
      setName(data.name);
    }

    if (session) loadUser();
  }, [session]);

  // 🔹 Load orders
  useEffect(() => {
    async function loadOrders() {
      const res = await fetch("/api/orders", {
        credentials: "include",
      });
      const data = await res.json();
      setOrders(data.orders || []);
    }

    if (session) loadOrders();
  }, [session]);

  // 🔹 Save profile
  async function handleSave() {
    await fetch("/api/user", {
      method: "PATCH",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });

    setUser({ ...user, name });
    setEditing(false);
  }

  if (!session) {
    return <p className="text-center mt-20">Please login</p>;
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      {/* USER INFO */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        <div className="flex items-center gap-4">
          {user?.image ? (
            <Image
              src={user.image}
              alt="profile"
              width={60}
              height={60}
              className="rounded-full"
            />
          ) : (
            <div className="w-15 h-15 rounded-full bg-gray-200 flex items-center justify-center">
              {user?.name?.charAt(0)}
            </div>
          )}

          <div className="flex-1">
            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full"
              />
            ) : (
              <h2 className="text-lg font-semibold">{user?.name}</h2>
            )}

            <p className="text-gray-600">{user?.email}</p>
          </div>

          {editing ? (
            <button
              onClick={handleSave}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="border px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* ORDERS */}
      <div>
        <h2 className="text-xl font-bold mb-6">Your Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded-xl shadow"
              >
                <div className="flex justify-between mb-3">
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium">
                    ₹{order.total}
                  </p>
                </div>

                {/* PRODUCTS */}
                <div className="flex gap-4 overflow-x-auto">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="min-w-20">

                      <div className="relative w-20 h-20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover rounded"
                        />
                      </div>

                      <p className="text-xs mt-1 truncate">
                        {item.name}
                      </p>

                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        )}
      </div>

    </main>
  );
}