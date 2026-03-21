"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductAccordion from "./ProductAccordion";

type Props = { product: Product };

export default function ProductInfo({ product }: Props) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize]   = useState<string | null>(null);
  const [quantity, setQuantity]           = useState(1);
  const [sizeError, setSizeError]         = useState(false);
  const [added, setAdded]                 = useState(false);

  const { addItem }                    = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted                     = isWishlisted(product.id);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }
    addItem({ product, quantity, selectedColor, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <div className="flex flex-col pt-0 lg:pt-2">

      {/* Title */}
      <h1 className="font-body text-lg sm:text-xl font-semibold text-charcoal leading-snug mb-3">
        {product.name}
      </h1>

      {/* Price row */}
      <div className="flex items-baseline gap-3 mb-4">
        <span className={`font-body text-2xl sm:text-3xl font-bold ${product.isSale ? "text-red-600" : "text-charcoal"}`}>
          €{product.price.toFixed(2)}
        </span>
        {product.originalPrice && (
          <>
            <span className="font-body text-lg text-gray-400 line-through">
              €{product.originalPrice.toFixed(2)}
            </span>
            <span className="font-body text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
              -{discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Short description */}
      <p className="font-body text-sm text-gray-500 leading-relaxed mb-5">
        {product.description}
      </p>

      <div className="border-t border-gray-100 pt-5 space-y-5">

        {/* Colour selector */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-body text-[12px] font-semibold tracking-[0.1em] uppercase text-charcoal">
              Colour
            </span>
            <span className="font-body text-[12px] text-gray-500">{selectedColor}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-150 ${
                  selectedColor === color.name
                    ? "border-charcoal ring-2 ring-charcoal ring-offset-2 scale-110"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* Size selector */}
        <ProductSizeSelector
          sizes={product.sizes}
          selected={selectedSize}
          onSelect={(s) => { setSelectedSize(s); setSizeError(false); }}
          error={sizeError}
        />

        {/* Quantity + Add to Bag */}
        <div className="space-y-3">
          {/* Quantity row */}
          <div className="flex items-center gap-3">
            <span className="font-body text-[12px] font-semibold tracking-[0.1em] uppercase text-charcoal w-20">
              Qty
            </span>
            <div className="flex items-center border border-gray-200">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-gray-50 transition-colors font-medium text-lg"
                aria-label="Decrease">
                −
              </button>
              <span className="w-10 text-center font-body text-sm font-medium select-none">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-charcoal hover:bg-gray-50 transition-colors font-medium text-lg"
                aria-label="Increase">
                +
              </button>
            </div>
          </div>

          {/* Add to Bag + Wishlist */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToBag}
              className="flex-1 h-12 bg-charcoal text-white font-body text-[12px] tracking-[0.18em] font-semibold hover:bg-charcoal/85 active:scale-[0.99] transition-all relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span key="added"
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }} className="block">
                    ✓ ADDED TO BAG
                  </motion.span>
                ) : (
                  <motion.span key="add"
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }} className="block">
                    {sizeError ? "SELECT A SIZE" : "ADD TO BAG"}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`w-12 h-12 border flex items-center justify-center transition-all duration-200 ${
                wishlisted
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-charcoal"
              }`}
              aria-label="Add to wishlist"
            >
              <Heart
                size={18}
                strokeWidth={1.5}
                className={wishlisted ? "fill-red-500 text-red-500" : "text-charcoal"}
              />
            </button>

            <button
              className="w-12 h-12 border border-gray-200 hover:border-charcoal flex items-center justify-center transition-colors"
              aria-label="Share">
              <Share2 size={17} strokeWidth={1.5} className="text-charcoal" />
            </button>
          </div>
        </div>

        {/* Size error message */}
        <AnimatePresence>
          {sizeError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="font-body text-xs text-red-600 font-medium -mt-2">
              Please select a size to continue
            </motion.p>
          )}
        </AnimatePresence>

        {/* Delivery info */}
        <div className="border border-gray-100 rounded p-3.5 space-y-2.5 bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <Truck size={15} strokeWidth={1.5} className="text-charcoal flex-none" />
            <div>
              <p className="font-body text-[12px] font-semibold text-charcoal">Next Day Delivery Available</p>
              <p className="font-body text-[11px] text-gray-400">Order before 10PM for next day</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <RotateCcw size={15} strokeWidth={1.5} className="text-charcoal flex-none" />
            <div>
              <p className="font-body text-[12px] font-semibold text-charcoal">Free Returns</p>
              <p className="font-body text-[11px] text-gray-400">Easy returns within 28 days</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={15} strokeWidth={1.5} className="text-charcoal flex-none" />
            <div>
              <p className="font-body text-[12px] font-semibold text-charcoal">Secure Payment</p>
              <p className="font-body text-[11px] text-gray-400">100% encrypted & secure</p>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <ProductAccordion product={product} />
      </div>

      {/* Sticky mobile Add to Bag */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-3 lg:hidden shadow-lg">
        <button
          onClick={handleAddToBag}
          className="w-full h-12 bg-charcoal text-white font-body text-[12px] tracking-[0.18em] font-semibold hover:bg-charcoal/85 transition-colors relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {added ? (
              <motion.span key="a" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }} className="block">
                ✓ ADDED TO BAG
              </motion.span>
            ) : (
              <motion.span key="b" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }} className="block">
                {sizeError ? "SELECT A SIZE FIRST" : "ADD TO BAG — €" + product.price.toFixed(2)}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Bottom padding for mobile sticky bar */}
      <div className="h-16 lg:hidden" />
    </div>
  );
}
