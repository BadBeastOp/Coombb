"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const BANNERS = [
  {
    id: "minimal",
    tag: "CURATED EDIT",
    title: "MINIMALIST",
    sub: "LIVING",
    desc: "Clean lines, calm tones, and functional beauty — the art of living with less.",
    cta: "SHOP THE LOOK",
    href: "/home-decor",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
  },
  {
    id: "bedroom",
    tag: "BEDROOM EDIT",
    title: "MODERN",
    sub: "BEDROOM",
    desc: "Create your perfect sleep sanctuary with our curated bedroom collection.",
    cta: "SHOP BEDROOM",
    href: "/home-decor",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80",
  },
];

const FULL_BANNER = {
  tag: "LIFESTYLE",
  title: "COZY HOME",
  sub: "VIBES",
  desc: "Every corner tells a story. Make yours beautiful.",
  cta: "EXPLORE COLLECTION",
  href: "/home-decor",
  image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=80",
};

export default function HomeCollectionBanners() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Two side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {BANNERS.map((banner, i) => (
            <motion.div key={banner.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <Link href={banner.href}
                className="group relative flex overflow-hidden bg-bone h-[280px] sm:h-[380px] lg:h-[460px] block">
                <Image src={banner.image} alt={banner.title} fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-[1100ms] group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10 text-white">
                  <span className="font-body text-[10px] tracking-[0.35em] text-white/65 mb-3">{banner.tag}</span>
                  <h3 className="font-display font-light leading-none mb-1"
                    style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}>
                    {banner.title}
                  </h3>
                  <p className="font-body tracking-[0.22em] text-white/75 text-sm mb-3">{banner.sub}</p>
                  <p className="font-body text-sm text-white/55 mb-6 max-w-xs hidden sm:block">{banner.desc}</p>
                  <span className="font-body text-[11px] tracking-[0.22em] bg-white text-charcoal px-7 py-3 w-fit hover:bg-bone transition-colors">
                    {banner.cta}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Full-width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <Link href={FULL_BANNER.href}
            className="group relative flex overflow-hidden bg-bone h-[240px] sm:h-[320px] lg:h-[380px] w-full block">
            <Image src={FULL_BANNER.image} alt={FULL_BANNER.title} fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[1100ms] group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 lg:px-16 text-white max-w-2xl">
              <span className="font-body text-[10px] tracking-[0.35em] text-white/65 mb-4">{FULL_BANNER.tag}</span>
              <h3 className="font-display font-light leading-none mb-2"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
                {FULL_BANNER.title}
              </h3>
              <p className="font-body tracking-[0.25em] text-white/75 text-sm mb-3">{FULL_BANNER.sub}</p>
              <p className="font-body text-sm text-white/55 mb-7 hidden sm:block">{FULL_BANNER.desc}</p>
              <span className="font-body text-[11px] tracking-[0.22em] bg-white text-charcoal px-8 py-3 w-fit hover:bg-bone transition-colors">
                {FULL_BANNER.cta}
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}