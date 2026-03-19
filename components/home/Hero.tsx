"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "https://imgcdn.stablediffusionweb.com/2024/9/14/eac56905-833d-4e63-a2b7-5d986d8bb966.jpg",
    tag: "NEW IN",
    headline: "SPRING",
    sub: "COLLECTION 2025",
    cta: "SHOP NOW",
    href: "/new",
    ctaSecondary: "EXPLORE WOMEN",
    hrefSecondary: "/women",
    align: "center",
  },
  {
    id: 2,
    image: "https://bradshaws.ca/wp-content/uploads/2023/03/Apparel-Banner.jpg",
    tag: "TRENDING",
    headline: "WOMEN'S",
    sub: "EDIT",
    cta: "SHOP WOMEN",
    href: "/women",
    ctaSecondary: "NEW ARRIVALS",
    hrefSecondary: "/new",
    align: "left",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1800&q=90",
    tag: "JUST DROPPED",
    headline: "MEN'S",
    sub: "COLLECTION",
    cta: "SHOP MEN",
    href: "/men",
    ctaSecondary: "VIEW SALE",
    hrefSecondary: "/sale",
    align: "right",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1800&q=90",
    tag: "UP TO 70% OFF",
    headline: "SALE",
    sub: "ENDS MIDNIGHT",
    cta: "SHOP SALE",
    href: "/sale",
    ctaSecondary: "ALL CATEGORIES",
    hrefSecondary: "/women",
    align: "center",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = SLIDES[current];

  const alignClass =
    slide.align === "left"
      ? "items-start text-left"
      : slide.align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <section
      className="relative w-full overflow-hidden bg-charcoal"
      style={{ height: "calc(100vh - 88px)", minHeight: 560 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/65" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-end h-full px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 ${alignClass}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            <span className="inline-block font-body text-[10px] tracking-[0.35em] text-white/80 bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1.5 mb-5">
              {slide.tag}
            </span>

            <h1
              className="font-display font-light text-white leading-none mb-2"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              {slide.headline}
            </h1>
            <p className="font-body text-white/80 tracking-[0.25em] text-sm sm:text-base mb-8">
              {slide.sub}
            </p>

            <div
              className={`flex flex-col xs:flex-row gap-3 ${
                slide.align === "center"
                  ? "justify-center"
                  : slide.align === "right"
                  ? "justify-end"
                  : ""
              }`}
            >
              <Link
                href={slide.href}
                className="font-body text-[11px] tracking-[0.2em] px-8 py-3.5 bg-white text-charcoal hover:bg-bone transition-colors duration-300 text-center"
              >
                {slide.cta}
              </Link>
              <Link
                href={slide.hrefSecondary}
                className="font-body text-[11px] tracking-[0.2em] px-8 py-3.5 border border-white/70 text-white hover:bg-white/10 transition-colors duration-300 text-center"
              >
                {slide.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <motion.div
            key={`progress-${current}`}
            className="h-full bg-white/60"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>
      )}
    </section>
  );
}