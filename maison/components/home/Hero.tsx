"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 88px)", minHeight: 500 }}>
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg "
          alt="Fashion Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/50" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-[10px] sm:text-xs tracking-widest-2 mb-5 opacity-80"
        >
          SPRING — SUMMER 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl xs:text-6xl sm:text-7xl lg:text-[7rem] xl:text-[8rem] font-light leading-none tracking-wide mb-5"
        >
          NEW<br /><em>COLLECTION</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-body text-xs sm:text-sm tracking-editorial mb-9 opacity-75 max-w-xs"
        >
          REFINED ESSENTIALS FOR THE MODERN WARDROBE
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-col xs:flex-row gap-3 sm:gap-4"
        >
          <Link href="/new"
            className="font-body text-xs tracking-editorial px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-charcoal hover:bg-bone transition-colors duration-300">
            SHOP NEW IN
          </Link>
          <Link href="/women"
            className="font-body text-xs tracking-editorial px-8 sm:px-10 py-3.5 sm:py-4 border border-white text-white hover:bg-white/15 transition-colors duration-300">
            EXPLORE WOMEN
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white pointer-events-none"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-7 bg-white/50" />
        <span className="font-body text-[9px] tracking-widest-2 opacity-50">SCROLL</span>
      </motion.div>
    </section>
  );
}