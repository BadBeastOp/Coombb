"use client";
import { useState, useMemo, useEffect } from "react";
import { Heart, Share2, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductAccordion from "./ProductAccordion";
import { addToCart, addWishlist } from "services/api/cart";
import Swal from "sweetalert2";

export default function ProductInfo({ 
  product, 
  selectedColor, 
  setSelectedColor 
}) {
  const variants = product?.variants || [];

  const colors = useMemo(() => {
    return [
      ...new Map(
        variants.map((v) => [
          v.color_name,
          {
            name: v.color_name,
            hex: v.color_code,
            hex2: v.color_code_2,
          },
        ])
      ).values(),
    ];
  }, [variants]);

  const sizes = useMemo(() => {
    return [...new Set(variants.map((v) => v.size_name))];
  }, [variants]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0].name);
    }
  }, [colors, selectedColor]);

  const selectedVariant = useMemo(() => {
    return variants.find(
      (v) =>
        v.color_name === selectedColor &&
        v.size_name === selectedSize
    );
  }, [variants, selectedColor, selectedSize]);

  const isSizeAvailable = (size) => {
    return variants.some(
      (v) =>
        v.size_name === size &&
        v.color_name === selectedColor &&
        v.stock > 0
    );
  };

  const price = Number(product?.price || 0);
  const originalPrice = Number(product?.originalPrice || 0);

  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  /* ================= ADD TO CART ================= */
  const handleAddToBag = async () => {
    console.log("dbfgjdfnjgndfjngjfdnjnfj");

    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Size Required",
        text: "Please select a size before adding to bag.",
        confirmButtonColor: "#333",
      });

      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }

    if (!selectedVariant) {
      Swal.fire({
        icon: "error",
        title: "Variant Not Available",
        text: "This variant is not available.",
      });
      return;
    }

    const payload = {
      product_id: product.id,
      color_id: selectedVariant.color_id,
      size_id: selectedVariant.size_id,
      quantity,
    };

    try {
      console.log("srjfdubdjf");

      const res = await addToCart(payload);

      if (!res || !res.status) {
        console.error("Add to cart failed:", res);

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Failed to add to cart",
        });

        return;
      }

      // ✅ SUCCESS ALERT
      Swal.fire({
        icon: "success",
        title: "Added to Bag 🛍️",
        text: "Product added successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

      setAdded(true);
      setTimeout(() => setAdded(false), 2500);

    } catch (err) {
      console.error("Error adding to cart:", err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again.",
      });
    }
  };

  /* ================= WISHLIST ================= */
  const handleWishlist = async () => {

    if (!selectedSize) {
      Swal.fire({
        icon: "warning",
        title: "Size Required",
        text: "Please select a size before adding to bag.",
        confirmButtonColor: "#333",
      });

      setSizeError(true);
      setTimeout(() => setSizeError(false), 2500);
      return;
    }

    if (!selectedVariant) {
      Swal.fire({
        icon: "error",
        title: "Variant Not Available",
        text: "This variant is not available.",
      });
      return;
    }

    const payload = {
      product_id: product.id,
      color_id: selectedVariant.color_id,
      size_id: selectedVariant.size_id,
      quantity,
    };
    try {
      const res = await addWishlist(payload);
      console.log("jhfcjkgndkjfnj", res);
      debugger

      if (!res || !res.success) {
        console.error("Wishlist toggle failed:", res);

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Unable to update wishlist",
        });

        return;
      }

      const newState = !wishlisted;
      setWishlisted(newState);

      // ✅ SUCCESS FEEDBACK (Toast style 🔥)
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: newState ? "Added to Wishlist ❤️" : "Removed from Wishlist 💔",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

    } catch (err) {
      console.error("Error toggling wishlist:", err);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col pt-0 lg:pt-2">
      <h1 className="font-body text-lg sm:text-xl font-semibold text-charcoal mb-3">
        {product?.name}
      </h1>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-2xl sm:text-3xl font-bold">
          €{price.toFixed(2)}
        </span>

        {originalPrice > 0 && (
          <>
            <span className="text-lg text-gray-400 line-through">
              €{originalPrice.toFixed(2)}
            </span>
            <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
              -{discount}% OFF
            </span>
          </>
        )}
      </div>

      <p
        className="text-sm text-gray-500 mb-5"
        dangerouslySetInnerHTML={{ __html: product?.description }}
      />

      <div className="border-t pt-5 space-y-5">
        {/* COLORS */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold uppercase">Colour</span>
            <span className="text-xs text-gray-500">{selectedColor}</span>
          </div>

          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => {
                  setSelectedColor(color.name);
                  setSelectedSize(null);
                }}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.name
                    ? "border-black ring-2 ring-black ring-offset-2"
                    : "border-gray-200"
                }`}
                style={{
                  background: color.hex2
                    ? `linear-gradient(45deg, ${color.hex}, ${color.hex2})`
                    : color.hex,
                }}
              />
            ))}
          </div>
        </div>

        {/* SIZE */}
        <ProductSizeSelector
          sizes={sizes}
          selected={selectedSize}
          onSelect={(s) => setSelectedSize(s)}
        />

        {/* QTY */}
<div className="flex items-center gap-3 bg-gray-100 rounded-full px-3 py-1 w-fit shadow-sm">
  
  <button
    onClick={() => setQuantity(q => Math.max(1, q - 1))}
    className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-200 transition"
  >
    -
  </button>

  <span className="min-w-[24px] text-center font-medium">
    {quantity}
  </span>

  <button
    onClick={() => setQuantity(q => q + 1)}
    className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-200 transition"
  >
    +
  </button>

</div>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToBag}
            className="flex-1 h-12 bg-black text-white"
          >
            {added ? "✓ ADDED" : "ADD TO BAG"}
          </button>

          <button
            onClick={handleWishlist}
            className="w-12 h-12 border flex items-center justify-center"
          >
            <Heart fill={wishlisted ? "black" : "none"} />
          </button>

          <button className="w-12 h-12 border flex items-center justify-center">
            <Share2 />
          </button>
        </div>

        {/* DELIVERY */}
        <div className="border p-3 space-y-2 text-sm">
          <div className="flex gap-2"><Truck size={15}/> Next Day Delivery</div>
          <div className="flex gap-2"><RotateCcw size={15}/> Free Returns</div>
          <div className="flex gap-2"><ShieldCheck size={15}/> Secure Payment</div>
        </div>

        <ProductAccordion product={product} />
      </div>
    </div>
  );
}