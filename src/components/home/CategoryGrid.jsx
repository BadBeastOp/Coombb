"use client";
import { motion } from "framer-motion";
import Link from "lib/Link";
import Image from "lib/NextImage";
const CATS = [
    {
        id: "women",
        label: "WOMEN",
        sub: "New Season",
        href: "/women",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    },
    {
        id: "men",
        label: "MEN",
        sub: "Latest Drops",
        href: "/men",
        image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80",
    },
    {
        id: "shoes",
        label: "SHOES",
        sub: "Step Up",
        href: "/accessories",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    },
    {
        id: "accessories",
        label: "ACCESSORIES",
        sub: "The Finishing Touch",
        href: "/accessories",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    },
    {
        id: "sale",
        label: "SALE",
        sub: "Up to 70% Off",
        href: "/sale",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    },
];
export default function CategoryGrid() {
    return (<section className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between mb-7 sm:mb-9">
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] text-stone mb-1">BROWSE</p>
            <h2 className="font-display text-3xl sm:text-4xl font-light">Shop by Category</h2>
          </div>
          <Link href="/women" className="hidden sm:flex font-body text-xs tracking-[0.2em] text-stone hover:text-charcoal transition-colors border-b border-stone/40 hover:border-charcoal pb-0.5">
            VIEW ALL →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {/* Wide card — Women spans 2 cols */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="col-span-2 lg:col-span-2 row-span-1 lg:row-span-2">
            <CategoryCard item={CATS[0]} height="h-[240px] sm:h-[300px] lg:h-full lg:min-h-[560px]"/>
          </motion.div>

          {CATS.slice(1).map((cat, i) => (<motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: (i + 1) * 0.07 }}>
              <CategoryCard item={cat} height="h-[160px] sm:h-[200px] lg:h-[272px]"/>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
function CategoryCard({ item, height, }) {
    return (<Link href={item.href} className={`group relative flex overflow-hidden bg-bone w-full ${height} block`}>
      <Image src={item.image} alt={item.label} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"/>

      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 lg:p-6">
        <p className="font-body text-[10px] tracking-[0.3em] text-white/70 mb-1">{item.sub}</p>
        <h3 className="font-body text-base sm:text-lg lg:text-xl tracking-[0.15em] text-white font-medium mb-2.5">
          {item.label}
        </h3>
        <span className="font-body text-[10px] tracking-[0.2em] text-white/80 border border-white/50 px-3 py-1.5 w-fit opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          SHOP NOW
        </span>
      </div>

      {item.id === "sale" && (<div className="absolute top-3 left-3 bg-red-600 text-white font-body text-[9px] tracking-[0.15em] px-2 py-1">
          UP TO 70% OFF
        </div>)}
    </Link>);
}
