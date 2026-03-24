"use client";
import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "lib/wishlist-context";
export default function ProductCard({ product, priority }) {
    const [hovered, setHovered] = useState(false);
    const { toggleWishlist, isWishlisted } = useWishlist();
    const wishlisted = isWishlisted(product.id);
    return (<div className="group relative flex flex-col" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Image container */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-bone w-full" style={{ aspectRatio: "3/4" }}>
        {/* Primary image */}
        <Image src={product.images[0]} alt={product.name} fill priority={priority} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover object-center transition-opacity duration-500 ${hovered && product.images[1] ? "opacity-0" : "opacity-100"}`}/>
        {/* Hover image */}
        {product.images[1] && (<Image src={product.images[1]} alt={`${product.name} — view 2`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className={`object-cover object-center transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}/>)}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isNew && (<span className="font-body text-[9px] tracking-editorial bg-charcoal text-white px-2 py-0.5">
              NEW
            </span>)}
          {product.isSale && (<span className="font-body text-[9px] tracking-editorial bg-red-600 text-white px-2 py-0.5">
              SALE
            </span>)}
        </div>

        {/* Wishlist button */}
        <button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
        }} className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10" aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
          <Heart size={14} strokeWidth={1.5} className={`transition-colors ${wishlisted ? "fill-charcoal text-charcoal" : "text-charcoal"}`}/>
        </button>

        {/* Quick view */}
        <AnimatePresence>
          {hovered && (<motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }} className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm py-2.5 text-center z-10">
              <span className="font-body text-[10px] tracking-editorial text-charcoal">
                QUICK VIEW
              </span>
            </motion.div>)}
        </AnimatePresence>
      </Link>

      {/* Product info */}
      <div className="mt-3 flex-1 flex flex-col">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-body text-[11px] sm:text-xs tracking-editorial text-charcoal leading-snug hover-underline line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-body text-sm font-medium text-charcoal">
            €{product.price}
          </span>
          {product.originalPrice && (<span className="font-body text-sm text-stone line-through">
              €{product.originalPrice}
            </span>)}
        </div>
        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mt-2">
          {product.colors.slice(0, 4).map((color) => (<div key={color.name} className="w-3 h-3 rounded-full border border-charcoal/20 flex-none" style={{ backgroundColor: color.hex }} title={color.name}/>))}
          {product.colors.length > 4 && (<span className="font-body text-[10px] text-stone">
              +{product.colors.length - 4}
            </span>)}
        </div>
      </div>
    </div>);
}
