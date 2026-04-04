"use client";

import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "lib/wishlist-context";
import Swal from "sweetalert2";
import { addToCart } from "services/api/cart";

export default function ProductWishlistCard({ product, priority }) {
  const [hovered, setHovered] = useState(false);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product?.id);

  // ✅ Safe image handling
  const firstImage = product?.image || "/placeholder.png";

  // (No second image in your API, keep null)
  const secondImage = null;

  // ✅ Add to Cart handler (UPDATED FOR WISHLIST STRUCTURE)
  const handleAddToBag = async () => {
    if (!product?.size?.id) {
      Swal.fire({
        icon: "warning",
        title: "Size Missing",
        text: "This product has no size selected.",
      });
      return;
    }

    if (!product?.color?.id) {
      Swal.fire({
        icon: "warning",
        title: "Color Missing",
        text: "This product has no color selected.",
      });
      return;
    }

    const payload = {
      product_id: product.id,
      color_id: product.color.id,
      size_id: product.size.id,
      quantity: 1,
    };

    try {
      const res = await addToCart(payload);

      if (!res || !res.status) {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Failed to add to cart",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Added to Bag 🛍️",
        text: "Product added successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error("Error:", err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <div
      className="group relative flex flex-col cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link
        href={`/product/${product?.slug}`}
        className="block relative overflow-hidden bg-bone w-full"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={firstImage}
          alt={product?.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-opacity duration-500 ${
            hovered && secondImage ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product?.id);
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-white z-10"
        >
          <Heart
            size={14}
            className={`${
              wishlisted ? "fill-charcoal text-charcoal" : "text-charcoal"
            }`}
          />
        </button>

        {/* Quick View */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-0 left-0 right-0 bg-white/95 py-2 text-center"
            >
              <span className="text-[10px]">QUICK VIEW</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Info */}
      <div className="mt-3 flex flex-col">
        <Link href={`/product/${product?.slug}`}>
          <h3 className="text-xs text-charcoal line-clamp-2">
            {product?.title}
          </h3>
        </Link>

        <div className="flex gap-2 mt-1">
          <span className="text-sm font-medium">
            €{product?.selling_price}
          </span>

          {product?.cost_price && (
            <span className="text-sm line-through text-stone">
              €{product?.cost_price}
            </span>
          )}
        </div>

        {/* Size & Color */}
        <div className="text-[11px] text-stone mt-1">
          {product?.size?.name && <span>Size: {product.size.name}</span>}
          {product?.color?.name && (
            <span className="ml-2">Color: {product.color.name}</span>
          )}
        </div>

        {/* ✅ ADD TO BAG BUTTON */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToBag();
          }}
          className="mt-3 w-full bg-charcoal text-white text-xs py-2 hover:bg-charcoal/80 transition"
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}