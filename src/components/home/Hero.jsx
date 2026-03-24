"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
const SLIDES = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1800&q=90",
        tag: "NEW SEASON",
        headline: "WOMEN",
        sub: "ELEVATED ESSENTIALS",
        desc: "Refined silhouettes and timeless pieces for every moment.",
        cta: "SHOP WOMEN",
        href: "/women",
        ctaSecondary: "SHOP NEW IN",
        hrefSecondary: "/new",
        align: "center",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1800&q=90",
        tag: "LUXURY OUTERWEAR",
        headline: "ICONIC",
        sub: "COATS",
        desc: "Statement outerwear crafted for modern city dressing.",
        cta: "SHOP OUTERWEAR",
        href: "/women",
        ctaSecondary: "VIEW EDIT",
        hrefSecondary: "/women",
        align: "left",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1800&q=90",
        tag: "ACCESSORY EDIT",
        headline: "BOLD",
        sub: "ACCESSORIES",
        desc: "The finishing touches that define your look.",
        cta: "SHOP ACCESSORIES",
        href: "/accessories",
        ctaSecondary: "SHOP SALE",
        hrefSecondary: "/sale",
        align: "right",
    },
];
export default function HomeHero() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
    const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);
    useEffect(() => {
        if (paused)
            return;
        const t = setInterval(next, 5500);
        return () => clearInterval(t);
    }, [paused, next]);
    const slide = SLIDES[current];
    const contentAlign = slide.align === "left" ? "items-start text-left" : slide.align === "right" ? "items-end text-right" : "items-center text-center";
    const btnAlign = slide.align === "center" ? "justify-center" : slide.align === "right" ? "justify-end" : "";
    return (<section className="relative z-0 isolate w-full overflow-hidden bg-charcoal" style={{ height: "calc(100vh - 120px)", minHeight: 520 }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait">
        <motion.div key={slide.id} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }} className="absolute inset-0">
          <Image src={slide.image} alt={slide.headline} fill priority sizes="100vw" className="object-cover object-center"/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75"/>
        </motion.div>
      </AnimatePresence>

      <div className={`relative z-10 flex flex-col justify-end h-full px-6 sm:px-12 lg:px-20 pb-14 sm:pb-20 ${contentAlign}`}>
        <AnimatePresence mode="wait">
          <motion.div key={`c-${slide.id}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="inline-block font-body text-[10px] tracking-[0.35em] text-white/70 border border-white/30 px-3 py-1.5 mb-5">
              {slide.tag}
            </span>
            <h1 className="font-display font-light text-white leading-none mb-1" style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}>
              {slide.headline}
            </h1>
            <p className="font-body text-white/70 tracking-[0.25em] text-sm sm:text-base mb-3">{slide.sub}</p>
            <p className="font-body text-white/50 text-sm mb-7 hidden sm:block max-w-sm">{slide.desc}</p>
            <div className={`flex flex-col xs:flex-row gap-3 ${btnAlign}`}>
              <Link href={slide.href} className="font-body text-[11px] tracking-[0.22em] px-8 py-3.5 bg-white text-charcoal hover:bg-bone transition-colors text-center font-semibold">
                {slide.cta}
              </Link>
              <Link href={slide.hrefSecondary} className="font-body text-[11px] tracking-[0.22em] px-8 py-3.5 border border-white/60 text-white hover:bg-white/10 transition-colors text-center">
                {slide.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button onClick={prev} className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
        <ChevronLeft size={20} strokeWidth={1.5}/>
      </button>
      <button onClick={next} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors">
        <ChevronRight size={20} strokeWidth={1.5}/>
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/35 hover:bg-white/65"}`}/>))}
      </div>

      {!paused && (<div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <motion.div key={`p-${current}`} className="h-full bg-white/50" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5.5, ease: "linear" }}/>
        </div>)}
    </section>);
}
