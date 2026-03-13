"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const featured = products.filter((p) => p.isNew).slice(0, 6);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-cream">
      <div className="max-w-[1600px] mx-auto">
        <div className="px-4 sm:px-6 lg:px-12 mb-8 flex items-end justify-between">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-body text-[10px] tracking-widest-2 text-stone mb-1.5">JUST ARRIVED</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">New In</h2>
          </motion.div>
          <div className="flex items-center gap-2 sm:gap-3 flex-none">
            <button onClick={() => scroll("left")} aria-label="Scroll left"
              className="w-9 h-9 sm:w-10 sm:h-10 border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors">
              <ChevronLeft size={15} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right"
              className="w-9 h-9 sm:w-10 sm:h-10 border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-white transition-colors">
              <ChevronRight size={15} />
            </button>
            <Link href="/new" className="hidden sm:flex items-center font-body text-xs tracking-editorial hover-underline ml-2">
              VIEW ALL
            </Link>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-12 pb-2">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex-none w-[200px] xs:w-[230px] sm:w-[260px] lg:w-[280px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="px-4 sm:px-6 lg:px-12 mt-6 sm:hidden">
          <Link href="/new" className="block text-center font-body text-xs tracking-editorial border border-charcoal px-6 py-3 hover:bg-charcoal hover:text-white transition-colors">
            VIEW ALL NEW IN
          </Link>
        </div>
      </div>
    </section>
  );
}