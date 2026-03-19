"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Camera, User, Heart, ShoppingBag,
  Menu, X, ChevronDown, ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { products } from "@/lib/data";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TOP_PROMOS = [
  { id: 1, text: "Spring Deals — Up To 30% Off Everything!", href: "/sale" },
  { id: 2, text: "One Year Express Delivery For €9.99",       href: "/new"  },
  { id: 3, text: "70% Off Or More!",                          href: "/sale" },
];

const PROMO_MESSAGES = [
  "EXTRA 10% OFF EVERYTHING – Use Code: EXTRA10",
  "FREE DELIVERY ON ORDERS OVER €50 — Shop Now",
  "NEXT DAY DELIVERY AVAILABLE — Order Before 10PM",
];

const NAV_ITEMS = [
  {
    label: "New In", href: "/new", sale: false, hot: true,
    columns: [
      { title: "New This Week", links: ["New Dresses","New Tops","New Jeans","New Shoes","New Accessories","Trending Now"] },
      { title: "New In Women",  links: ["Dresses","Co-ords","Tops & T-Shirts","Jeans & Trousers","Skirts","Knitwear"] },
      { title: "New In Men",    links: ["T-Shirts","Shirts","Hoodies","Joggers","Jackets","Accessories"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80", label: "Just Dropped", href: "/new" },
  },
  {
    label: "Womens", href: "/women", sale: false, hot: false,
    columns: [
      { title: "Clothing",     links: ["Dresses","Tops","Jeans","Trousers","Skirts","Jackets & Coats","Knitwear","Co-ords"] },
      { title: "Occasionwear", links: ["Occasion Dresses","Bridesmaid","Wedding Guest","Party Dresses","Going Out Tops"] },
      { title: "Activewear",   links: ["Sports Bras","Leggings","Gym Tops","Sets","Swimwear","Loungewear"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80", label: "New Season Dresses", href: "/women" },
  },
  {
    label: "Dresses", href: "/women", sale: false, hot: false,
    columns: [
      { title: "By Length",   links: ["Mini Dresses","Midi Dresses","Maxi Dresses","Tea Length"] },
      { title: "By Style",    links: ["Bodycon","Wrap","Shirt Dress","Slip Dress","Skater","Smock","Blazer Dress"] },
      { title: "By Occasion", links: ["Party","Wedding Guest","Casual","Going Out","Holiday","Work"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80", label: "The Dress Edit", href: "/women" },
  },
  {
    label: "Shop By Fit", href: "/women", sale: false, hot: false,
    columns: [
      { title: "Petite", links: ["Petite Dresses","Petite Tops","Petite Trousers","Petite Jeans"] },
      { title: "Tall",   links: ["Tall Dresses","Tall Tops","Tall Trousers","Tall Jeans"] },
      { title: "Curve",  links: ["Curve Dresses","Curve Tops","Curve Jeans","Plus Size"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", label: "Find Your Fit", href: "/women" },
  },
  {
    label: "Shoes", href: "/accessories", sale: false, hot: false,
    columns: [
      { title: "Heels",            links: ["Stilettos","Block Heels","Mules","Strappy Heels","Platform Heels"] },
      { title: "Flats & Trainers", links: ["Trainers","Ballet Flats","Sandals","Loafers","Sliders"] },
      { title: "Boots",            links: ["Ankle Boots","Knee High","Chelsea Boots","Western Boots","Over The Knee"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80", label: "Shoe Collection", href: "/accessories" },
  },
  {
    label: "Accessories", href: "/accessories", sale: false, hot: false,
    columns: [
      { title: "Bags",        links: ["Tote Bags","Crossbody","Clutches","Shoulder Bags","Mini Bags"] },
      { title: "Jewellery",   links: ["Necklaces","Earrings","Rings","Bracelets","Layering Sets"] },
      { title: "Accessories", links: ["Sunglasses","Belts","Scarves","Hats","Hair Accessories"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", label: "Accessory Edit", href: "/accessories" },
  },
  {
    label: "Mens", href: "/men", sale: false, hot: false,
    columns: [
      { title: "Clothing",  links: ["T-Shirts","Shirts","Hoodies & Sweatshirts","Joggers","Jeans","Shorts"] },
      { title: "Smart",     links: ["Suits","Blazers","Dress Shirts","Chinos","Smart Trousers"] },
      { title: "Outerwear", links: ["Jackets","Coats","Puffer Jackets","Overshirts","Gilets"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&q=80", label: "Men's New In", href: "/men" },
  },
  {
    label: "Occasion", href: "/women", sale: false, hot: false,
    columns: [
      { title: "Wedding",   links: ["Wedding Guest","Bridesmaid","Mother of the Bride","Formal Gowns"] },
      { title: "Going Out", links: ["Party Dresses","Going Out Tops","Jumpsuits","Playsuits"] },
      { title: "Holiday",   links: ["Beach Dresses","Swimwear","Cover Ups","Holiday Tops","Shorts"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&q=80", label: "Occasion Shop", href: "/women" },
  },
  {
    label: "Trends", href: "/new", sale: false, hot: false,
    columns: [
      { title: "Right Now",   links: ["The Denim Edit","Coastal Grandmother","Quiet Luxury","Y2K Revival","Mob Wife"] },
      { title: "Style Edits", links: ["Minimal","Maximalist","Streetwear","Smart Casual","Festival"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80", label: "Trending Now", href: "/new" },
  },
  {
    label: "Design", href: "/new", sale: false, hot: false,
    columns: [
      { title: "Prints & Patterns", links: ["Floral","Abstract","Stripe","Animal Print","Geometric"] },
      { title: "Colour Edit",       links: ["All White","All Black","Nudes & Neutrals","Bold Brights","Pastels"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80", label: "Design Edit", href: "/new" },
  },
  {
    label: "Home", href: "/home-decor", sale: false, hot: false,
    columns: [
      { title: "Living",  links: ["Cushions","Throws","Candles","Vases","Wall Art"] },
      { title: "Bedroom", links: ["Bedding","Pillowcases","Throws","Lamps","Storage"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", label: "Home Edit", href: "/new" },
  },
  {
    label: "Beauty", href: "/new", sale: false, hot: false,
    columns: [
      { title: "Skincare", links: ["Moisturisers","Serums","SPF","Eye Cream","Face Masks"] },
      { title: "Makeup",   links: ["Foundation","Lip","Eye","Blush","Setting Spray"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80", label: "Beauty Edit", href: "/new" },
  },
  {
    label: "Sale", href: "/sale", sale: true, hot: false,
    columns: [
      { title: "Women's Sale",  links: ["Dresses from €15","Tops from €5","Jeans from €12","Shoes from €10"] },
      { title: "Men's Sale",    links: ["T-Shirts from €5","Hoodies from €12","Jeans from €15","Jackets from €20"] },
      { title: "Up to 70% off", links: ["Under €10","Under €20","Under €30","Clearance"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80", label: "Up to 70% Off", href: "/sale" },
  },
];

type NavItem = typeof NAV_ITEMS[0];

// ─── TOP LIGHT PROMO BAR ──────────────────────────────────────────────────────
function TopPromoBar() {
  return (
    <div className="w-full bg-[#f5f5f5] border-b border-gray-200 hidden sm:block">
      <div className="grid grid-cols-3 divide-x divide-gray-300 w-full">
        {TOP_PROMOS.map((p) => (
          <Link key={p.id} href={p.href}
            className="flex items-center justify-center py-2.5 px-6 hover:bg-gray-100 transition-colors group">
            <span className="font-body text-[11px] text-gray-600 text-center group-hover:text-charcoal transition-colors leading-snug">
              {p.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── SEARCH BAR ───────────────────────────────────────────────────────────────
function HeaderSearch() {
  const [query, setQuery]     = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef              = useRef<HTMLInputElement>(null);
  const wrapRef               = useRef<HTMLDivElement>(null);

  const results = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  const suggestions = ["dresses", "jeans", "blazer", "shoes", "sale"];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full max-w-[600px]">
      <div className={`flex items-center bg-[#f2f2f2] rounded-full px-4 py-2.5 gap-2 transition-all duration-200 ${
        focused ? "bg-white ring-2 ring-charcoal/20 shadow-sm" : "hover:bg-[#e8e8e8]"
      }`}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => e.key === "Escape" && setFocused(false)}
          placeholder="Search products and brands"
          className="flex-1 bg-transparent font-body text-sm text-charcoal placeholder:text-gray-400 focus:outline-none min-w-0"
        />
        <button title="Visual search" aria-label="Visual search"
          className="text-gray-400 hover:text-charcoal transition-colors flex-none"
          onClick={() => inputRef.current?.focus()}>
          <Camera size={16} strokeWidth={1.5} />
        </button>
        <span className="w-px h-4 bg-gray-300 flex-none" />
        <button aria-label="Search"
          className="text-charcoal hover:text-stone transition-colors flex-none"
          onClick={() => inputRef.current?.focus()}>
          <Search size={17} strokeWidth={2} />
        </button>
      </div>

      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.16 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl rounded-xl z-[60] overflow-hidden"
          >
            {query.length === 0 && (
              <div className="p-4">
                <p className="font-body text-[10px] tracking-[0.2em] text-gray-400 mb-3 uppercase">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button key={s} onClick={() => { setQuery(s); inputRef.current?.focus(); }}
                      className="font-body text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-charcoal hover:text-white transition-colors capitalize">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {results.length > 0 && (
              <div className="divide-y divide-gray-50">
                <p className="px-4 pt-3 pb-2 font-body text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                  {results.length} results for &ldquo;{query}&rdquo;
                </p>
                {results.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} onClick={() => setFocused(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
                    <div className="relative w-10 h-14 bg-bone flex-none overflow-hidden rounded">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-medium text-charcoal group-hover:underline truncate">{p.name}</p>
                      <p className="font-body text-sm text-stone mt-0.5">€{p.price}</p>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 flex-none" />
                  </Link>
                ))}
              </div>
            )}
            {query.length > 1 && results.length === 0 && (
              <div className="px-4 py-6 text-center">
                <p className="font-body text-sm text-gray-400">
                  No results for &ldquo;<strong className="text-charcoal">{query}</strong>&rdquo;
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── MEGA MENU ────────────────────────────────────────────────────────────────
function MegaMenu({ item }: { item: NavItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.16 }}
      className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-[55]"
    >
      <div className="w-full max-w-[1400px] mx-auto px-10 py-8 grid grid-cols-4 gap-8">
        <div className="col-span-3 grid grid-cols-3 gap-8">
          {item.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-[11px] font-bold tracking-[0.18em] text-charcoal mb-4 uppercase border-b border-gray-100 pb-2">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href={item.href}
                      className="font-body text-[13px] text-gray-600 hover:text-charcoal transition-colors hover:underline underline-offset-2">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {item.featured && (
          <Link href={item.featured.href}
            className="group block relative overflow-hidden bg-bone rounded-sm"
            style={{ aspectRatio: "3/4" }}>
            <Image src={item.featured.image} alt={item.featured.label} fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-body text-[10px] tracking-[0.18em] text-white bg-charcoal px-3 py-1.5 inline-block">
                {item.featured.label.toUpperCase()}
              </span>
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── BLACK PROMO BAR + COUNTDOWN ─────────────────────────────────────────────
function BlackPromoBar() {
  const [msgIdx, setMsgIdx]     = useState(0);
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 47, s: 33 });

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % PROMO_MESSAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="w-full bg-[#1A1A1A] text-white">
      <div className="w-full max-w-[1400px] mx-auto h-9 px-4 sm:px-6 lg:px-8 relative flex items-center justify-center">
        <div className="overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p key={msgIdx}
              initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.3 }}
              className="font-body text-[11px] sm:text-xs tracking-[0.2em] font-medium whitespace-nowrap text-center">
              {PROMO_MESSAGES[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="hidden md:flex items-center gap-2 flex-none absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2">
          <span className="font-body text-[10px] text-white/50 tracking-widest uppercase">Ends in</span>
          <div className="flex items-center gap-0.5 font-body text-[11px] font-bold tabular-nums">
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(timeLeft.h)}</span>
            <span className="text-white/40 px-0.5">:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(timeLeft.m)}</span>
            <span className="text-white/40 px-0.5">:</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">{pad(timeLeft.s)}</span>
          </div>
        </div>
        <div className="flex md:hidden items-center gap-1 flex-none absolute right-4 top-1/2 -translate-y-1/2">
          <span className="font-body text-[9px] text-white/50">ENDS</span>
          <span className="font-body text-[10px] font-bold tabular-nums text-white/80">
            {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE DRAWER ────────────────────────────────────────────────────────────
function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded]    = useState<string | null>(null);
  const { toggleCart, totalItems } = useCart();
  const { wishlist }               = useWishlist();

  return (
    <React.Fragment>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 bottom-0 z-50 w-[320px] bg-white flex flex-col shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 flex-none">
          <Link href="/" onClick={onClose}
            className="font-body text-xl font-black tracking-[0.15em] text-charcoal">
            MAISON
          </Link>
          <div className="flex items-center">
            <Link href="/account" onClick={onClose} className="p-2 text-charcoal">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" onClick={onClose} className="relative p-2 text-charcoal">
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-charcoal text-white text-[9px] rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button onClick={() => { onClose(); toggleCart(); }} className="relative p-2 text-charcoal">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-charcoal text-white text-[9px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={onClose} className="p-2 text-charcoal">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="border-b border-gray-100">
              <button onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                className="flex items-center justify-between w-full px-5 py-3.5">
                <span className={`font-body text-sm font-semibold ${item.sale ? "text-red-600" : "text-charcoal"}`}>
                  {item.label}
                </span>
                <ChevronDown size={14} strokeWidth={2}
                  className={`text-gray-400 transition-transform duration-200 ${expanded === item.label ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {expanded === item.label && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                    transition={{ duration: 0.2 }} className="overflow-hidden bg-gray-50">
                    <div className="px-5 pb-4 pt-2 space-y-4">
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <p className="font-body text-[10px] tracking-[0.2em] text-gray-400 mb-2 uppercase">{col.title}</p>
                          <div className="flex flex-col gap-1.5">
                            {col.links.map((link) => (
                              <Link key={link} href={item.href} onClick={onClose}
                                className="font-body text-sm text-gray-700 hover:text-charcoal flex items-center gap-1.5">
                                <ChevronRight size={10} className="text-gray-300 flex-none" />
                                {link}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      <Link href={item.href} onClick={onClose}
                        className="inline-block font-body text-[11px] tracking-[0.15em] px-4 py-2 bg-charcoal text-white hover:bg-charcoal/80 transition-colors">
                        SHOP ALL {item.label.toUpperCase()}
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="px-5 py-5 space-y-4 border-t border-gray-100">
            <Link href="/account" onClick={onClose}
              className="flex items-center gap-3 font-body text-sm text-gray-500 hover:text-charcoal transition-colors">
              <User size={16} strokeWidth={1.5} /> My Account
            </Link>
            <Link href="/wishlist" onClick={onClose}
              className="flex items-center gap-3 font-body text-sm text-gray-500 hover:text-charcoal transition-colors">
              <Heart size={16} strokeWidth={1.5} /> Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
            </Link>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

// ─── MAIN NAVBAR ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled]     = useState(false);
  const leaveTimer                  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toggleCart, totalItems }  = useCart();
  const { wishlist }                = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { if (scrolled) setActiveMenu(null); }, [scrolled]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleEnter = useCallback((label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(label);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 130);
  }, []);

  const activeItem = NAV_ITEMS.find((n) => n.label === activeMenu);

  return (
    <React.Fragment>

      {/* ① Light grey top promo bar */}
      <TopPromoBar />

      {/* ② White sticky header */}
      <header className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : "border-b border-gray-100"
      }`}>
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* DESKTOP — Logo left | Search centre | Icons right */}
          <div className="hidden lg:flex items-center gap-6 py-3">

            {/* Logo — top left */}
            <Link href="/"
              className="flex-none font-body text-[2rem] font-black tracking-[0.18em] text-charcoal hover:opacity-70 transition-opacity leading-none">
              MAISON
            </Link>

            {/* Search — fills middle */}
            <div className="flex-1 flex justify-center">
              <HeaderSearch />
            </div>

            {/* Icons — top right */}
            <div className="flex items-center gap-0.5 flex-none">
              <Link href="/account" aria-label="Account"
                className="flex flex-col items-center gap-0.5 px-2.5 py-1 text-charcoal hover:text-stone transition-colors group">
                <User size={20} strokeWidth={1.5} />
                <span className="font-body text-[9px] tracking-widest text-gray-400 group-hover:text-stone uppercase">Account</span>
              </Link>
              <Link href="/wishlist" aria-label="Wishlist"
                className="relative flex flex-col items-center gap-0.5 px-2.5 py-1 text-charcoal hover:text-stone transition-colors group">
                <Heart size={20} strokeWidth={1.5} />
                <span className="font-body text-[9px] tracking-widest text-gray-400 group-hover:text-stone uppercase">Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-1 w-[17px] h-[17px] bg-charcoal text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {wishlist.length > 9 ? "9+" : wishlist.length}
                  </span>
                )}
              </Link>
              <button onClick={toggleCart} aria-label="Bag"
                className="relative flex flex-col items-center gap-0.5 px-2.5 py-1 text-charcoal hover:text-stone transition-colors group">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="font-body text-[9px] tracking-widest text-gray-400 group-hover:text-stone uppercase">Bag</span>
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span key="b" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute top-0 right-1 w-[17px] h-[17px] bg-charcoal text-white text-[9px] rounded-full flex items-center justify-center font-bold pointer-events-none">
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* MOBILE — hamburger | centred logo | wishlist + bag */}
          <div className="flex lg:hidden items-center h-[52px]">
            <button onClick={() => setMobileOpen(true)} aria-label="Menu"
              className="p-2 -ml-1 text-charcoal flex-none">
              <Menu size={22} strokeWidth={2} />
            </button>
            <div className="flex-1 flex justify-center">
              <Link href="/"
                className="font-body text-[1.6rem] font-black tracking-[0.18em] text-charcoal leading-none">
                MAISON
              </Link>
            </div>
            <div className="flex items-center flex-none">
              <Link href="/wishlist" className="relative p-2 text-charcoal" aria-label="Wishlist">
                <Heart size={20} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-charcoal text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {wishlist.length > 9 ? "9+" : wishlist.length}
                  </span>
                )}
              </Link>
              <button onClick={toggleCart} className="relative p-2 text-charcoal" aria-label="Bag">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span key="mb" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute top-0.5 right-0.5 w-4 h-4 bg-charcoal text-white text-[9px] rounded-full flex items-center justify-center font-bold pointer-events-none">
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="lg:hidden pb-3">
            <HeaderSearch />
          </div>
        </div>

        {/* DESKTOP CATEGORY NAV */}
        <nav className="hidden lg:block w-full border-t border-gray-100 relative bg-white"
          onMouseLeave={handleLeave}>
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-x-auto scrollbar-hide">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} onMouseEnter={() => handleEnter(item.label)}
                className="relative flex-none">
                <Link href={item.href}
                  className={`relative block font-body font-medium whitespace-nowrap px-3 xl:px-3.5 py-3 text-[12px] xl:text-[13px] transition-colors ${
                    item.sale
                      ? "text-red-600 font-bold hover:text-red-500"
                      : "text-[#1a1a1a] hover:text-gray-500"
                  }`}>
                  {item.label}
                  {item.hot && (
                    <span className="absolute top-2 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                  )}
                  <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-charcoal transition-transform duration-200 origin-left ${
                    activeMenu === item.label ? "scale-x-100" : "scale-x-0"
                  }`} />
                </Link>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {activeMenu && activeItem && (
              <div
                onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }}
                onMouseLeave={handleLeave}>
                <MegaMenu item={activeItem} />
              </div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* ③ Black promo bar */}
      <BlackPromoBar />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>

    </React.Fragment>
  );
}
