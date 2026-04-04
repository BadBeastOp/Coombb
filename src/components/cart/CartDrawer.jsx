"use client";
import React from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "lib/cart-context";

export default function CartDrawer() {
  const {
    isOpen,
    toggleCart,
    items,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] bg-white flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 flex-none">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-charcoal" />
                <span className="font-body text-sm font-bold tracking-[0.12em] uppercase text-charcoal">
                  My Bag
                </span>
                {totalItems > 0 && (
                  <span className="bg-charcoal text-white font-body text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <button
                onClick={toggleCart}
                aria-label="Close cart"
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <X size={20} strokeWidth={1.5} className="text-charcoal" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-4">
                  <ShoppingBag size={48} strokeWidth={1} className="text-gray-200" />
                  <div>
                    <p className="font-body text-base font-semibold text-charcoal mb-1">
                      Your bag is empty
                    </p>
                    <p className="font-body text-sm text-gray-400">
                      Add some items to get started
                    </p>
                  </div>
                  <button
                    onClick={toggleCart}
                    className="font-body text-xs tracking-[0.18em] px-8 py-3 bg-charcoal text-white hover:bg-charcoal/85 transition-colors mt-2"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4 px-6 py-4"
                    >
                      {/* Thumbnail */}
                      <Link
                        href={`/product/${item.product.id}`}
                        onClick={toggleCart}
                        className="relative w-20 h-28 bg-bone flex-none overflow-hidden"
                      >
                        <Image
                          src={item.product.default_image}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-top"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={toggleCart}
                          className="font-body text-[12px] font-medium text-charcoal hover:underline underline-offset-2 line-clamp-2 leading-snug block mb-1"
                        >
                          {item.product.name}
                        </Link>

                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mb-2.5">
                          {item.color?.name && (
                            <span className="font-body text-[11px] text-gray-400">
                              {item.color.name}
                            </span>
                          )}
                          {item.size?.name && (
                            <span className="font-body text-[11px] text-gray-400">
                              Size: {item.size.name}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Qty controls */}
                          <div className="flex items-center border border-gray-200">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-charcoal hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={11} strokeWidth={2} />
                            </button>
                            <span className="w-7 text-center font-body text-xs font-medium select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-charcoal hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={11} strokeWidth={2} />
                            </button>
                          </div>

                          {/* Price + remove */}
                          <div className="flex items-center gap-3">
                            <span className="font-body text-sm font-bold text-charcoal">
                              €{Number(item.total).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item)}
                              className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="flex-none border-t border-gray-100 px-6 py-5 space-y-3 bg-white">
                {totalPrice < 50 && (
                  <div className="bg-gray-50 px-4 py-2.5 text-center">
                    <p className="font-body text-[11px] text-gray-500">
                      Spend{" "}
                      <span className="font-semibold text-charcoal">
                        €{(50 - totalPrice).toFixed(2)} more
                      </span>{" "}
                      for free delivery
                    </p>
                    <div className="mt-1.5 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-charcoal rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (totalPrice / 50) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-gray-500">
                    Subtotal ({totalItems}{" "}
                    {totalItems === 1 ? "item" : "items"})
                  </span>
                  <span className="font-body text-lg font-bold text-charcoal">
                    €{Number(totalPrice).toFixed(2)}
                  </span>
                </div>

                <p className="font-body text-[11px] text-gray-400 text-center">
                  Delivery calculated at checkout
                </p>

                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="block w-full bg-charcoal text-white text-center font-body text-[12px] tracking-[0.18em] font-semibold py-4 hover:bg-charcoal/85 transition-colors"
                >
                  CHECKOUT — €{Number(totalPrice).toFixed(2)}
                </Link>

                <button
                  onClick={toggleCart}
                  className="block w-full text-center font-body text-[11px] text-gray-400 hover:text-charcoal transition-colors py-1"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}