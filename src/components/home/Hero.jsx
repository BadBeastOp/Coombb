"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Fallback slides (in case API fails)
const FALLBACK_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&q=80",
    tag: "NEW",
    headline: "COLLECTION",
    sub: "LATEST ARRIVAL",
    desc: "Discover premium styles crafted for modern living.",
    cta: "SHOP NOW",
    href: "#",
    ctaSecondary: "VIEW",
    hrefSecondary: "#",
    align: "center",
  },
];

export default function HomeHero({ topSlider = [] }) {
  console.log("topslddddddddddddddddddddddddider", topSlider);
  debugger;
  // ✅ Memoized slides mapping
  const slides = useMemo(() => {
    if (!topSlider?.length) return FALLBACK_SLIDES;

    const activeSlides = topSlider
      .filter((item) => item.is_active)
      .map((item) => ({
        id: item.id,
        image: item.background_image_url, // ✅ correct field
        tag: "NEW",
        headline: item.button_name || "COLLECTION",
        sub: "LATEST ARRIVAL",
        desc: "",
        cta: item.button_name || "SHOP NOW",
        href: item.target_url || "#",
        ctaSecondary: "VIEW",
        hrefSecondary: item.target_url || "#",
        align: "center",
      }));

    return activeSlides.length ? activeSlides : FALLBACK_SLIDES;
  }, [topSlider]);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // ✅ Auto slide
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [paused, next]);

  // ✅ Reset index if slides change
  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  const slide = slides[current];

  if (!slide) return null;

  const contentAlign =
    slide.align === "left"
      ? "items-start text-left"
      : slide.align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  const btnAlign =
    slide.align === "center"
      ? "justify-center"
      : slide.align === "right"
      ? "justify-end"
      : "";

  return (
    <section
      className="relative z-0 isolate w-full overflow-hidden bg-charcoal"
      style={{ height: "calc(100vh - 120px)", minHeight: 520 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-end h-full px-6 sm:px-12 lg:px-20 pb-14 sm:pb-20 ${contentAlign}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`c-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >


            <div className={`flex flex-col xs:flex-row gap-3 ${btnAlign}`}>
              <Link
                href={slide.href}
                className="font-body text-[11px] tracking-[0.22em] px-8 py-3.5 bg-white text-charcoal hover:bg-bone transition-colors text-center font-semibold"
              >
                {slide.cta}
              </Link>

              <Link
                href={slide.hrefSecondary}
                className="font-body text-[11px] tracking-[0.22em] px-8 py-3.5 border border-white/60 text-white hover:bg-white/10 transition-colors text-center"
              >
                {slide.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-6 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/35 hover:bg-white/65"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <motion.div
            key={`p-${current}`}
            className="h-full bg-white/50"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5.5, ease: "linear" }}
          />
        </div>
      )}
    </section>
  );
}