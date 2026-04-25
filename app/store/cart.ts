"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* =========================
   TYPES
========================= */
type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  quantityAvailable: number;
};

type CartState = {
  items: CartItem[];
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setItems: (items: CartItem[]) => void;

  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
};

/* =========================
   API SYNC (SAFE)
========================= */
async function syncCart(items: CartItem[]) {
  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ items }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) return; // ignore if not logged in
  } catch (err) {
    console.error("Cart sync failed:", err);
  }
}

/* =========================
   DEBOUNCE (PREVENT SPAM)
========================= */
let syncTimeout: NodeJS.Timeout;

/* =========================
   STORE
========================= */
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,

      /* ---------- HYDRATION ---------- */
      setHasHydrated: (state) => set({ hasHydrated: state }),

      /* ---------- SET ITEMS ---------- */
      setItems: (items) => {
        set({ items });
      },

      /* ---------- ADD ---------- */
      addToCart: (product) => {
        const state = get();
        const existing = state.items.find((i) => i.id === product.id);

        let updatedItems: CartItem[];

        if (existing) {
          updatedItems = state.items.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(
                    item.quantity + 1,
                    item.quantityAvailable
                  ),
                }
              : item
          );
        } else {
          updatedItems = [...state.items, { ...product, quantity: 1 }];
        }

        set({ items: updatedItems });

        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
          syncCart(updatedItems);
        }, 300);
      },

      /* ---------- REMOVE ---------- */
      removeFromCart: (id) => {
        const updatedItems = get().items.filter((i) => i.id !== id);

        set({ items: updatedItems });

        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
          syncCart(updatedItems);
        }, 300);
      },

      /* ---------- INCREASE ---------- */
      increaseQty: (id) => {
        const updatedItems = get().items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  item.quantityAvailable
                ),
              }
            : item
        );

        set({ items: updatedItems });

        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
          syncCart(updatedItems);
        }, 300);
      },

      /* ---------- DECREASE ---------- */
      decreaseQty: (id) => {
        const updatedItems = get()
          .items
          .map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        set({ items: updatedItems });

        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
          syncCart(updatedItems);
        }, 300);
      },

      /* ---------- CLEAR ---------- */
      clearCart: () => {
        set({ items: [] });

        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
          syncCart([]);
        }, 300);
      },
    }),
    {
      name: "cart-storage",

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Hydration error:", error);
        }
        state?.setHasHydrated(true);
      },
    }
  )
);