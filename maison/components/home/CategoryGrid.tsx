"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categoryItems = [
  { id: "women", label: "WOMEN", href: "/women", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80", large: true },
  { id: "men", label: "MEN", href: "/men", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80", large: false },
  { id: "accessories", label: "ACCESSORIES", href: "/accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80", large: false },
  { id: "new", label: "NEW IN", href: "/new", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80", large: false },
  { id: "sale", label: "SALE", href: "/sale", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80", large: false },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12"
      >
        <p className="font-body text-[10px] tracking-widest-2 text-stone mb-2">EXPLORE</p>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">Shop by Category</h2>
      </motion.div>

      {/* Desktop: asymmetric grid. Mobile: 2-col uniform grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
        {/* Large card (Women) — spans 2 cols on desktop */}
        <motion.div
          className="lg:col-span-2 lg:row-span-2 col-span-2 sm:col-span-1 lg:col-span-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CategoryCard item={categoryItems[0]} height="h-[220px] sm:h-[300px] lg:h-full lg:min-h-[640px]" />
        </motion.div>

        {/* Remaining 4 cards */}
        {categoryItems.slice(1).map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i + 1) * 0.07 }}
          >
            <CategoryCard item={cat} height="h-[180px] sm:h-[220px] lg:h-[308px]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ item, height }: { item: typeof categoryItems[0]; height: string }) {
  return (
    <Link href={item.href} className={`group relative flex overflow-hidden bg-bone w-full ${height}`}>
      <Image
        src={item.image}
        alt={item.label}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6">
        <h3 className="font-body text-xs sm:text-sm tracking-widest-2 text-white mb-1.5">{item.label}</h3>
        <div className="w-6 h-px bg-white/70 group-hover:w-12 transition-all duration-500" />
      </div>
    </Link>
  );
}