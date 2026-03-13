"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Editorial() {
  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mb-4 lg:mb-5">
        {/* Left large */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-[380px] sm:h-[480px] lg:h-[680px] overflow-hidden group"
        >
          <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80" alt="The New Season"
            fill sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 text-white">
            <p className="font-body text-[10px] tracking-editorial mb-2 opacity-70">EDITORIAL</p>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light italic mb-3 sm:mb-4">
              The Art of<br />Dressing Well
            </h3>
            <Link href="/women" className="font-body text-xs tracking-editorial hover-underline">EXPLORE WOMEN →</Link>
          </div>
        </motion.div>

        {/* Right stacked */}
        <div className="grid grid-rows-2 gap-3 sm:gap-4 lg:gap-5">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-[200px] sm:h-[240px] lg:h-full overflow-hidden group"
          >
            <Image src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80" alt="Men's Collection"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <p className="font-body text-[10px] tracking-editorial mb-1 opacity-70">MEN</p>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-light italic mb-2 sm:mb-3">Modern Tailoring</h3>
              <Link href="/men" className="font-body text-xs tracking-editorial hover-underline">SHOP MEN →</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[200px] sm:h-[240px] lg:h-full overflow-hidden group bg-bone"
          >
            <Image src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80" alt="Accessories"
              fill sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
              <p className="font-body text-[10px] tracking-editorial mb-1 opacity-70">ACCESSORIES</p>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-light italic mb-2 sm:mb-3">The Details</h3>
              <Link href="/accessories" className="font-body text-xs tracking-editorial hover-underline">SHOP NOW →</Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-12 sm:py-16 lg:py-20"
      >
        <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light italic text-stone max-w-3xl mx-auto leading-relaxed">
          &ldquo;Elegance is not about being noticed,<br className="hidden sm:block" /> it&apos;s about being remembered.&rdquo;
        </blockquote>
        <p className="font-body text-[10px] tracking-editorial text-stone/60 mt-5">— MAISON PHILOSOPHY</p>
      </motion.div>
    </section>
  );
}