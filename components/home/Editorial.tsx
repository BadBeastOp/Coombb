"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const PERKS = [
  { icon: "🚚", title: "FREE DELIVERY", desc: "On all orders over €50" },
  { icon: "↩️", title: "FREE RETURNS", desc: "30-day hassle-free returns" },
  { icon: "🔒", title: "SECURE PAYMENT", desc: "100% encrypted checkout" },
  { icon: "💬", title: "24/7 SUPPORT", desc: "Chat, email or phone" },
];

const TILES = [
  {
    img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    tag: "MEN",
    title: "Modern Tailoring",
    href: "/men",
  },
  {
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    tag: "ACCESSORIES",
    title: "The Finishing Touch",
    href: "/accessories",
  },
  {
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
    tag: "SHOES",
    title: "Step Into Season",
    href: "/accessories",
  },
];

export default function Editorial() {
  return (
    <>
      {/* Perks bar */}
      <section className="bg-[#F7F7F7] border-y border-bone/60 py-7 sm:py-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {PERKS.map((perk) => (
              <div key={perk.title} className="flex items-start gap-3 sm:gap-4">
                <span className="text-xl sm:text-2xl flex-none">{perk.icon}</span>
                <div>
                  <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] font-medium text-charcoal">
                    {perk.title}
                  </p>
                  <p className="font-body text-xs text-stone mt-0.5">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width editorial banner */}
      <section className="relative overflow-hidden h-[50vh] sm:h-[60vh] lg:h-[70vh] min-h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=80"
          alt="Editorial"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14 lg:px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <p className="font-body text-[10px] tracking-[0.35em] text-white/70 mb-4">
              EDITORIAL
            </p>
            <h2
              className="font-display font-light text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
            >
              The Art of<br />
              <em>Dressing Well</em>
            </h2>
            <p className="font-body text-sm text-white/70 mb-8 leading-relaxed hidden sm:block">
              Discover pieces that elevate your everyday. Refined essentials meet modern design.
            </p>
            <div className="flex flex-col xs:flex-row gap-3">
              <Link
                href="/women"
                className="font-body text-[11px] tracking-[0.2em] px-7 py-3.5 bg-white text-charcoal hover:bg-bone transition-colors text-center"
              >
                EXPLORE WOMEN
              </Link>
              <Link
                href="/men"
                className="font-body text-[11px] tracking-[0.2em] px-7 py-3.5 border border-white/60 text-white hover:bg-white/10 transition-colors text-center"
              >
                EXPLORE MEN
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three editorial tiles */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {TILES.map((tile, i) => (
              <motion.div
                key={tile.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={tile.href}
                  className="group relative flex overflow-hidden bg-bone h-[260px] sm:h-[340px] lg:h-[420px] block"
                >
                  <Image
                    src={tile.img}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                    <p className="font-body text-[10px] tracking-[0.3em] text-white/60 mb-1">
                      {tile.tag}
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl font-light italic mb-3">
                      {tile.title}
                    </h3>
                    <span className="font-body text-[10px] tracking-[0.2em] text-white/70 group-hover:text-white transition-colors border-b border-white/30 pb-0.5">
                      SHOP NOW →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="py-14 sm:py-20 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center px-6"
        >
          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-light italic text-stone leading-relaxed">
            &ldquo;Elegance is not about being noticed,
            <br className="hidden sm:block" />
            it&apos;s about being remembered.&rdquo;
          </blockquote>
          <p className="font-body text-[10px] tracking-[0.3em] text-stone/50 mt-5">
            — MAISON PHILOSOPHY
          </p>
        </motion.div>
      </section>
    </>
  );
}