// "use client";
// import { createContext, useContext, useState } from "react";
// const Ctx = createContext({
//     items: [], addItem: () => { }, removeItem: () => { },
//     updateQuantity: () => { }, clearCart: () => { },
//     totalItems: 0, totalPrice: 0, isOpen: false, toggleCart: () => { },
// });
// export function CartProvider({ children }) {
//     const [items, setItems] = useState([]);
//     const [isOpen, setIsOpen] = useState(false);
//     const addItem = (newItem) => {
//         setItems((prev) => {
//             const exists = prev.find((i) => i.product.id === newItem.product.id &&
//                 i.selectedSize === newItem.selectedSize &&
//                 i.selectedColor === newItem.selectedColor);
//             if (exists) {
//                 return prev.map((i) => i.product.id === newItem.product.id &&
//                     i.selectedSize === newItem.selectedSize &&
//                     i.selectedColor === newItem.selectedColor
//                     ? { ...i, quantity: i.quantity + newItem.quantity }
//                     : i);
//             }
//             return [...prev, newItem];
//         });
//         setIsOpen(true);
//     };
//     const removeItem = (productId) => setItems((prev) => prev.filter((i) => i.product.id !== productId));
//     const updateQuantity = (productId, quantity) => setItems((prev) => quantity <= 0
//         ? prev.filter((i) => i.product.id !== productId)
//         : prev.map((i) => i.product.id === productId ? { ...i, quantity } : i));
//     const clearCart = () => setItems([]);
//     const toggleCart = () => setIsOpen((v) => !v);
//     const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
//     const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
//     return (<Ctx.Provider value={{
//             items, addItem, removeItem, updateQuantity,
//             clearCart, totalItems, totalPrice, isOpen, toggleCart,
//         }}>
//       {children}
//     </Ctx.Provider>);
// }
// export function useCart() {
//     return useContext(Ctx);
// }


"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getCart, addToCart, updateCartItem, removeCartItem } from "services/api/cart";

const Ctx = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
  toggleCart: () => {},
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ FETCH CART FROM API
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await getCart();

    const cartData = res[0]; // API returns array

    setCart(cartData);          // full cart
    setItems(cartData.items);   // only items array
  };

  // ✅ ADD ITEM (API + LOCAL)
  const addItem = async (newItem) => {
    try {
      const payload = {
        product_id: newItem.product.id,
        color_id: newItem.selectedColor,
        size_id: newItem.selectedSize,
        quantity: newItem.quantity,
      };

      const res = await addToCart(payload);

      if (!res || !(res.status || res.success)) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Unable to add item",
        });
        return;
      }

      // 🔥 LOCAL UPDATE (your existing logic)
      setItems((prev) => {
        const exists = prev.find(
          (i) =>
            i.product.id === newItem.product.id &&
            i.selectedSize === newItem.selectedSize &&
            i.selectedColor === newItem.selectedColor
        );

        if (exists) {
          return prev.map((i) =>
            i.product.id === newItem.product.id &&
            i.selectedSize === newItem.selectedSize &&
            i.selectedColor === newItem.selectedColor
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
        }

        return [...prev, newItem];
      });

      setIsOpen(true);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Added to Cart 🛒",
        showConfirmButton: false,
        timer: 1200,
      });

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ REMOVE ITEM
  const removeItem = async (item) => {
    try {
      // ⚠️ backend should return id
      await removeCartItem(item.id);

      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.product.id === item.product.id &&
              i.size.id === newItem.selectedSize &&
              i.color.id === newItem.selectedColor
            )
        )
      );

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Item removed ❌",
        showConfirmButton: false,
        timer: 1200,
      });

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ UPDATE QUANTITY (LOCAL ONLY for now)
  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          )
    );
  };

  // ✅ CLEAR CART
  const clearCart = () => setItems([]);

  const toggleCart = () => setIsOpen((v) => !v);

  // ✅ TOTALS
  console.log("itemssssss", items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = cart?.final_total || 0;

  return (
    <Ctx.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        toggleCart,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  return useContext(Ctx);
}
