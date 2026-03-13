"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const shipping = subtotal >= 150 ? 0 : 9.95;

  return (
    <AnimatePresence>
      {state.isOpen && (
        <React.Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[400px] lg:w-[420px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-bone flex-none">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={17} strokeWidth={1.5} />
                <span className="font-body text-xs tracking-editorial">YOUR BAG ({totalItems})</span>
              </div>
              <button onClick={closeCart} className="p-1.5 text-stone hover:text-charcoal transition-colors" aria-label="Close cart">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free shipping bar */}
            {subtotal > 0 && subtotal < 150 && (
              <div className="px-6 py-3 bg-cream border-b border-bone">
                <p className="font-body text-[10px] text-stone text-center">
                  Add <strong className="text-charcoal">€{(150 - subtotal).toFixed(2)}</strong> more for free shipping
                </p>
                <div className="mt-1.5 h-0.5 bg-bone rounded-full overflow-hidden">
                  <div className="h-full bg-charcoal rounded-full transition-all duration-500" style={{ width: `${Math.min((subtotal / 150) * 100, 100)}%` }} />
                </div>
              </div>
            )}
            {subtotal >= 150 && (
              <div className="px-6 py-2.5 bg-charcoal">
                <p className="font-body text-[10px] tracking-editorial text-white text-center">✓ YOU HAVE FREE SHIPPING</p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={44} strokeWidth={1} className="text-bone mb-4" />
                  <p className="font-display text-2xl font-light italic text-stone mb-2">Your bag is empty</p>
                  <p className="font-body text-xs text-stone mb-8">Add items to start shopping</p>
                  <button
                    onClick={closeCart}
                    className="font-body text-xs tracking-editorial px-8 py-3 bg-charcoal text-white hover:bg-charcoal/80 transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-0">
                  <AnimatePresence initial={false}>
                    {state.items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 py-5 border-b border-bone">
                          <Link href={`/product/${item.product.id}`} onClick={closeCart}
                            className="relative w-20 h-28 bg-bone flex-none overflow-hidden">
                            <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <Link href={`/product/${item.product.id}`} onClick={closeCart}
                                className="font-body text-xs tracking-editorial leading-relaxed hover-underline flex-1 text-charcoal">
                                {item.product.name}
                              </Link>
                              <button
                                onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                                className="text-stone hover:text-charcoal transition-colors flex-none p-0.5"
                                aria-label="Remove item"
                              >
                                <X size={13} strokeWidth={1.5} />
                              </button>
                            </div>
                            <p className="font-body text-[11px] text-stone mt-1">
                              {item.selectedColor} · {item.selectedSize}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-bone">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, Math.max(1, item.quantity - 1))}
                                  className="px-2.5 py-1.5 hover:bg-bone transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="w-8 text-center font-body text-xs select-none">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                                  className="px-2.5 py-1.5 hover:bg-bone transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              <span className="font-body text-sm font-medium">€{(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-bone px-6 py-5 flex-none">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-xs tracking-editorial text-stone">SUBTOTAL</span>
                  <span className="font-display text-2xl font-light">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="font-body text-xs text-stone">Shipping</span>
                  <span className="font-body text-xs text-stone">{shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center font-body text-xs tracking-editorial py-4 bg-charcoal text-white hover:bg-charcoal/90 transition-colors mb-2.5"
                >
                  CHECKOUT
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full text-center font-body text-xs tracking-editorial py-3.5 border border-charcoal text-charcoal hover:bg-bone transition-colors"
                >
                  VIEW BAG
                </Link>
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}