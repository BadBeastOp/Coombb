"use client";
import { createContext, useContext, useState } from "react";
const Ctx = createContext({
    wishlist: [],
    toggleWishlist: () => { },
    isWishlisted: () => false,
});
export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const toggleWishlist = (id) => setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
    const isWishlisted = (id) => wishlist.includes(id);
    return (<Ctx.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </Ctx.Provider>);
}
export function useWishlist() {
    return useContext(Ctx);
}
