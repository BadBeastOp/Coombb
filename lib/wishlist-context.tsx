"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type WishlistContext = {
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
};

const Ctx = createContext<WishlistContext>({
  wishlist: [],
  toggleWishlist: () => {},
  isWishlisted: () => false,
});

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const isWishlisted = (id: string) => wishlist.includes(id);

  return (
    <Ctx.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWishlist() {
  return useContext(Ctx);
}