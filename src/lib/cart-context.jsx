"use client";
import { createContext, useContext, useState } from "react";
const Ctx = createContext({
    items: [], addItem: () => { }, removeItem: () => { },
    updateQuantity: () => { }, clearCart: () => { },
    totalItems: 0, totalPrice: 0, isOpen: false, toggleCart: () => { },
});
export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const addItem = (newItem) => {
        setItems((prev) => {
            const exists = prev.find((i) => i.product.id === newItem.product.id &&
                i.selectedSize === newItem.selectedSize &&
                i.selectedColor === newItem.selectedColor);
            if (exists) {
                return prev.map((i) => i.product.id === newItem.product.id &&
                    i.selectedSize === newItem.selectedSize &&
                    i.selectedColor === newItem.selectedColor
                    ? { ...i, quantity: i.quantity + newItem.quantity }
                    : i);
            }
            return [...prev, newItem];
        });
        setIsOpen(true);
    };
    const removeItem = (productId) => setItems((prev) => prev.filter((i) => i.product.id !== productId));
    const updateQuantity = (productId, quantity) => setItems((prev) => quantity <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) => i.product.id === productId ? { ...i, quantity } : i));
    const clearCart = () => setItems([]);
    const toggleCart = () => setIsOpen((v) => !v);
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    return (<Ctx.Provider value={{
            items, addItem, removeItem, updateQuantity,
            clearCart, totalItems, totalPrice, isOpen, toggleCart,
        }}>
      {children}
    </Ctx.Provider>);
}
export function useCart() {
    return useContext(Ctx);
}
