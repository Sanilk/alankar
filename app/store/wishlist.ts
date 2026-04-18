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

  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,

      setHasHydrated: (state) => set({ hasHydrated: state }),

      toggleWishlist: (item) => {
        const exists = get().items.find((i) => i.id === item.id);

        if (exists) {
          set({
            items: get().items.filter((i) => i.id !== item.id),
          });
        } else {
          set({
            items: [...get().items, item],
          });
        }
      },

      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },
    }),
    {
      name: "wishlist-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);