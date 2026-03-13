"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Minus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Footer from "@/components/layout/Footer";

export default function CartPage() {
  const { state, removeItem, updateQuantity, subtotal } = useCart();
  const shipping = subtotal >= 150 ? 0 : 9.95;
  const total = subtotal + shipping;

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-8 pb-16 min-h-screen">
        <h1 className="font-display text-4xl lg:text-5xl font-light mb-10">Your Bag</h1>

        {state.items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={48} strokeWidth={1} className="text-bone mx-auto mb-6" />
            <h2 className="font-display text-3xl font-light italic text-stone mb-3">Your bag is empty</h2>
            <p className="font-body text-xs text-stone mb-8">Discover our latest collections</p>
            <Link href="/" className="font-body text-xs tracking-editorial px-10 py-4 bg-charcoal text-white hover:bg-charcoal/80 transition-colors">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Items */}
            <div className="lg:col-span-7">
              {state.items.map((item, i) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-5 py-6 border-b border-bone"
                >
                  <Link href={`/product/${item.product.id}`} className="relative w-24 h-32 bg-bone flex-none overflow-hidden">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${item.product.id}`} className="font-body text-xs tracking-editorial hover-underline">
                          {item.product.name}
                        </Link>
                        <p className="font-body text-xs text-stone mt-1">
                          {item.selectedColor} · Size {item.selectedSize}
                        </p>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)} className="text-stone hover:text-charcoal flex-none">
                        <X size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-bone">
                        <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, Math.max(1, item.quantity - 1))} className="px-3 py-2 hover:bg-bone">
                          <Minus size={12} />
                        </button>
                        <span className="w-10 text-center font-body text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)} className="px-3 py-2 hover:bg-bone">
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-display text-xl font-light">€{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-5">
              <div className="bg-cream p-8 sticky top-24">
                <h2 className="font-body text-xs tracking-editorial mb-6">ORDER SUMMARY</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-stone">Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-stone">Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal < 150 && (
                    <p className="font-body text-xs text-stone">
                      Add €{(150 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>
                <div className="border-t border-bone pt-4 mb-6 flex justify-between">
                  <span className="font-body text-xs tracking-editorial">TOTAL</span>
                  <span className="font-display text-2xl font-light">€{total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" className="block w-full text-center font-body text-xs tracking-editorial py-4 bg-charcoal text-white hover:bg-charcoal/90 transition-colors">
                  PROCEED TO CHECKOUT
                </Link>
                <div className="mt-4 text-center">
                  <Link href="/" className="font-body text-xs text-stone hover:text-charcoal hover-underline transition-colors">
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}