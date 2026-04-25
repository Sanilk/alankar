import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type WishlistState = {
  items: WishlistItem[];
  hasHydrated: boolean;

  setHasHydrated: (state: boolean) => void;
  setItems: (items: WishlistItem[]) => void;

  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
};

async function syncWishlist(items: WishlistItem[]) {
  await fetch("/api/wishlist", {
    method: "POST",
    body: JSON.stringify({ items }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      setItems: (items) => set({ items }),

      toggleWishlist: (product) => {
        const state = get();
        const exists = state.items.find((i) => i.id === product.id);

        let updated;

        if (exists) {
          updated = state.items.filter((i) => i.id !== product.id);
        } else {
          updated = [...state.items, product];
        }

        set({ items: updated });
        syncWishlist(updated); // ✅ sync
      },

      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },
    }),
    {
      name: "wishlist-storage",

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true); // ✅ THIS FIXES LOADING
      },
    }
  )
);