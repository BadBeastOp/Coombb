"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getWishlist, addWishlist, removeWishlist } from "services/api/cart";

const Ctx = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // ✅ FETCH
  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const res = await getWishlist();
    console.log("fetchwishlist", res );
    debugger
    setWishlist(res || []);
  };

  // ✅ ADD
  const addWishlistItem = async (payload) => {
    const res = await addWishlist(payload);

    if (!res || !(res.status || res.success)) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: res?.message || "Unable to add wishlist",
      });
      return;
    }

    setWishlist((prev) => [...prev, payload]);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Added to Wishlist ❤️",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  // ✅ REMOVE
  const removeWishlistItem = async (itemId) => {
    await removeWishlist(itemId);

    setWishlist((prev) => prev.filter((i) => i.id !== itemId));

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Removed from Wishlist 💔",
      showConfirmButton: false,
      timer: 1200,
    });
  };

  // ✅ CHECK
  const isWishlisted = (productId) => {
    return wishlist.some((i) => i.product_id === productId);
  };

  return (
    <Ctx.Provider
      value={{
        wishlist,
        addWishlistItem,
        removeWishlistItem,
        isWishlisted,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

// ✅ FIXED HOOK NAME
export function useWishlist() {
  return useContext(Ctx);
}