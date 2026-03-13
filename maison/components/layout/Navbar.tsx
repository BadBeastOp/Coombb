"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Heart, Search, Menu, X, User, Camera,
  ChevronRight, ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/data";

const NAV_ITEMS = [
  {
    label: "WOMEN", href: "/women", sale: false,
    columns: [
      { title: "Clothing", links: ["Dresses", "Tops", "Jeans", "Trousers", "Skirts", "Jackets & Coats", "Knitwear", "Co-ords"] },
      { title: "Occasionwear", links: ["Occasion Dresses", "Bridesmaid", "Wedding Guest", "Party Dresses", "Going Out Tops"] },
      { title: "Activewear", links: ["Sports Bras", "Leggings", "Gym Tops", "Sets", "Swimwear", "Loungewear"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80", label: "New Season Dresses", href: "/women" },
  },
  {
    label: "MEN", href: "/men", sale: false,
    columns: [
      { title: "Clothing", links: ["T-Shirts", "Shirts", "Hoodies", "Joggers", "Jeans", "Shorts", "Jackets", "Knitwear"] },
      { title: "Smart & Formal", links: ["Suits", "Blazers", "Dress Shirts", "Chinos", "Smart Trousers"] },
      { title: "Activewear", links: ["Gym T-Shirts", "Training Shorts", "Track Pants", "Sports Tops", "Sets"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&q=80", label: "New Men's Arrivals", href: "/men" },
  },
  {
    label: "NEW IN", href: "/new", sale: false,
    columns: [
      { title: "New This Week", links: ["New Dresses", "New Tops", "New Jeans", "New Shoes", "New Accessories"] },
      { title: "Trending Now", links: ["Under €30", "Best Sellers", "Back in Stock", "Editor's Picks", "Celebrity Style"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80", label: "Just Dropped", href: "/new" },
  },
  {
    label: "CLOTHING", href: "/women", sale: false,
    columns: [
      { title: "Dresses", links: ["Midi Dresses", "Maxi Dresses", "Mini Dresses", "Bodycon", "Wrap Dresses", "Shirt Dresses"] },
      { title: "Tops", links: ["Blouses", "T-Shirts", "Crop Tops", "Shirts", "Bodysuits", "Camisoles"] },
      { title: "Bottoms", links: ["Wide Leg", "Skinny", "Straight", "Flared", "Cargo", "Mom Jeans"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80", label: "Shop All Clothing", href: "/women" },
  },
  {
    label: "DRESSES", href: "/women", sale: false,
    columns: [
      { title: "By Length", links: ["Mini Dresses", "Midi Dresses", "Maxi Dresses", "Tea Length"] },
      { title: "By Style", links: ["Bodycon", "Wrap", "Shirt Dress", "Slip Dress", "Skater", "Smock"] },
      { title: "By Occasion", links: ["Party", "Wedding Guest", "Casual", "Going Out", "Holiday", "Work"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80", label: "Dress Edit", href: "/women" },
  },
  {
    label: "SHOES", href: "/accessories", sale: false,
    columns: [
      { title: "Heels", links: ["Stilettos", "Block Heels", "Mules", "Strappy Heels", "Platform"] },
      { title: "Flats", links: ["Trainers", "Ballet Flats", "Sandals", "Loafers", "Sliders"] },
      { title: "Boots", links: ["Ankle Boots", "Knee High", "Chelsea Boots", "Western Boots"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80", label: "Shoe Collection", href: "/accessories" },
  },
  {
    label: "ACCESSORIES", href: "/accessories", sale: false,
    columns: [
      { title: "Bags", links: ["Tote Bags", "Crossbody", "Clutches", "Shoulder Bags", "Backpacks"] },
      { title: "Jewellery", links: ["Necklaces", "Earrings", "Rings", "Bracelets", "Sets"] },
      { title: "Other", links: ["Scarves", "Belts", "Sunglasses", "Hats", "Hair Accessories"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80", label: "Accessory Edit", href: "/accessories" },
  },
  {
    label: "SALE", href: "/sale", sale: true,
    columns: [
      { title: "Women's Sale", links: ["Dresses from €15", "Tops from €5", "Jeans from €12", "Shoes from €10"] },
      { title: "Men's Sale", links: ["T-Shirts from €5", "Hoodies from €12", "Jeans from €15", "Jackets from €20"] },
      { title: "Up to 70% off", links: ["Under €10", "Under €20", "Under €30", "Clearance"] },
    ],
    featured: { image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80", label: "Sale — Up to 70% off", href: "/sale" },
  },
];

const ANNOUNCEMENTS = [
  "EXTRA 10% OFF EVERYTHING — Use Code: EXTRA10",
  "FREE DELIVERY ON ORDERS OVER €50 — Shop Now",
  "NEXT DAY DELIVERY AVAILABLE — Order Before 10PM",
];

type NavItem = typeof NAV_ITEMS[0];

function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-charcoal text-white h-8 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="font-body text-[10px] tracking-widest-2 text-center px-4 whitespace-nowrap"
        >
          {ANNOUNCEMENTS[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function MegaMenu({ item }: { item: NavItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 right-0 bg-white border-t border-bone shadow-xl z-40"
    >
      <div className="max-w-[1400px] mx-auto px-12 py-8 grid grid-cols-4 gap-8">
        <div className="col-span-3 grid grid-cols-3 gap-6">
          {item.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-body text-[10px] tracking-widest-2 text-stone mb-4 border-b border-bone pb-2">
                {col.title.toUpperCase()}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href={item.href} className="font-body text-sm text-charcoal hover:text-stone transition-colors hover-underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {item.featured && (
          <Link href={item.featured.href} className="group block relative overflow-hidden bg-bone" style={{ aspectRatio: "3/4" }}>
            <Image
              src={item.featured.image}
              alt={item.featured.label}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="font-body text-[10px] tracking-editorial text-white bg-charcoal px-3 py-1.5 inline-block">
                {item.featured.label.toUpperCase()}
              </span>
            </div>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  const results = query.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  const suggestions = ["blazer", "silk dress", "cashmere knit", "leather bag", "wide leg trousers"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 right-0 bg-white border-t border-bone shadow-xl z-40"
    >
      <div className="max-w-[860px] mx-auto px-6 py-6">
        <div className="flex items-center gap-3 border border-charcoal/20 px-4 py-3 focus-within:border-charcoal transition-colors">
          <Search size={16} strokeWidth={1.5} className="text-stone flex-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            placeholder="Search for products, brands, styles..."
            className="flex-1 font-body text-sm focus:outline-none placeholder:text-stone/50 bg-transparent"
          />
          <button
            className="flex items-center gap-1.5 border-l border-charcoal/10 pl-3 text-stone hover:text-charcoal transition-colors flex-none"
            title="Visual search"
          >
            <Camera size={16} strokeWidth={1.5} />
            <span className="font-body text-[10px] tracking-editorial hidden md:inline">VISUAL SEARCH</span>
          </button>
          <button onClick={onClose} className="text-stone hover:text-charcoal pl-2 flex-none">
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>

        {query.length === 0 && (
          <div className="mt-4">
            <p className="font-body text-[10px] tracking-widest-2 text-stone mb-3">POPULAR SEARCHES</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setQuery(s)}
                  className="font-body text-xs px-4 py-1.5 border border-bone hover:border-charcoal hover:bg-cream transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-4">
            <p className="font-body text-[10px] tracking-widest-2 text-stone mb-3">
              {results.length} RESULTS FOR &quot;{query.toUpperCase()}&quot;
            </p>
            <div className="divide-y divide-bone">
              {results.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} onClick={onClose}
                  className="flex items-center gap-4 py-3 hover:bg-cream transition-colors group">
                  <div className="relative w-10 h-14 bg-bone flex-none overflow-hidden">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs tracking-editorial group-hover:underline truncate">{p.name}</p>
                    <p className="font-body text-sm mt-0.5 text-stone">€{p.price}</p>
                  </div>
                  <ChevronRight size={14} className="text-stone flex-none" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {query.length > 1 && results.length === 0 && (
          <p className="font-body text-sm text-stone mt-4 text-center py-4">
            No results found for &quot;<strong>{query}</strong>&quot;
          </p>
        )}
      </div>
    </motion.div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { toggleCart, totalItems } = useCart();

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 bottom-0 z-50 w-[320px] sm:w-[360px] bg-white flex flex-col overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-bone flex-none">
          <Link href="/" onClick={onClose} className="font-display text-2xl tracking-widest-2 text-charcoal">
            MAISON
          </Link>
          <div className="flex items-center gap-0.5">
            <Link href="/account" onClick={onClose} className="p-2 text-charcoal hover:text-stone transition-colors">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/wishlist" onClick={onClose} className="p-2 text-charcoal hover:text-stone transition-colors">
              <Heart size={18} strokeWidth={1.5} />
            </Link>
            <button onClick={() => { onClose(); toggleCart(); }} className="relative p-2 text-charcoal hover:text-stone transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-charcoal text-white text-[9px] rounded-full flex items-center justify-center font-body">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={onClose} className="p-2 text-charcoal hover:text-stone transition-colors">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <nav>
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-bone">
                <button
                  onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full px-5 py-4 text-left"
                >
                  <span className={`font-body text-sm tracking-editorial ${item.sale ? "text-red-600" : "text-charcoal"}`}>
                    {item.label}
                  </span>
                  <ChevronDown size={14} strokeWidth={1.5}
                    className={`text-stone transition-transform duration-200 flex-none ${expandedItem === item.label ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {expandedItem === item.label && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden bg-cream"
                    >
                      <div className="px-5 pb-5 pt-2">
                        {item.columns.map((col) => (
                          <div key={col.title} className="mb-4">
                            <p className="font-body text-[9px] tracking-widest-2 text-stone mb-2">
                              {col.title.toUpperCase()}
                            </p>
                            <ul className="space-y-2">
                              {col.links.map((link) => (
                                <li key={link}>
                                  <Link href={item.href} onClick={onClose}
                                    className="font-body text-sm text-charcoal hover:text-stone flex items-center gap-1.5 transition-colors">
                                    <ChevronRight size={10} className="text-stone flex-none" />
                                    {link}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link href={item.href} onClick={onClose}
                          className="inline-block mt-1 font-body text-[10px] tracking-editorial px-4 py-2 bg-charcoal text-white hover:bg-charcoal/80 transition-colors">
                          SHOP ALL {item.label}
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="px-5 py-6 space-y-4 border-t border-bone">
            <Link href="/account" onClick={onClose} className="flex items-center gap-3 font-body text-sm text-stone hover:text-charcoal transition-colors">
              <User size={16} strokeWidth={1.5} /> My Account
            </Link>
            <Link href="/wishlist" onClick={onClose} className="flex items-center gap-3 font-body text-sm text-stone hover:text-charcoal transition-colors">
              <Heart size={16} strokeWidth={1.5} /> Wishlist
            </Link>
            <Link href="/faq" onClick={onClose} className="flex items-center gap-3 font-body text-sm text-stone hover:text-charcoal transition-colors">
              <Search size={16} strokeWidth={1.5} /> Help & FAQs
            </Link>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toggleCart, totalItems }  = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (scrolled) setActiveMenu(null);
  }, [scrolled]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMenuEnter = useCallback((label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveMenu(label);
    setSearchOpen(false);
  }, []);

  const handleMenuLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const activeItem = NAV_ITEMS.find((n) => n.label === activeMenu);

  return (
    <React.Fragment>
      <AnnouncementBar />

      <header className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        {/* Top row: logo + icons */}
        <div className="border-b border-bone/60">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center gap-3">
            {/* Hamburger */}
            <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 -ml-2 text-charcoal" aria-label="Open menu">
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <Link href="/" className="font-display text-2xl sm:text-3xl lg:text-4xl font-light tracking-widest-2 text-charcoal flex-none">
              MAISON
            </Link>

            <div className="flex-1" />

            {/* Right icons */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {/* Inline expanding search */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="hidden sm:flex items-center overflow-hidden border-b border-charcoal mr-1"
                    >
                      <input
                        autoFocus
                        placeholder="Search..."
                        className="flex-1 font-body text-sm px-2 py-1 focus:outline-none bg-transparent min-w-0"
                        onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => { setSearchOpen((v) => !v); setActiveMenu(null); }}
                  className="p-2 text-charcoal hover:text-stone transition-colors"
                  aria-label="Search"
                >
                  {searchOpen ? <X size={19} strokeWidth={1.5} /> : <Search size={19} strokeWidth={1.5} />}
                </button>
              </div>

              <Link href="/account" className="hidden sm:flex p-2 text-charcoal hover:text-stone transition-colors" aria-label="Account">
                <User size={19} strokeWidth={1.5} />
              </Link>
              <Link href="/wishlist" className="hidden sm:flex p-2 text-charcoal hover:text-stone transition-colors" aria-label="Wishlist">
                <Heart size={19} strokeWidth={1.5} />
              </Link>

              <button onClick={toggleCart} className="relative p-2 text-charcoal hover:text-stone transition-colors" aria-label="Shopping bag">
                <ShoppingBag size={19} strokeWidth={1.5} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span key="badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-charcoal text-white text-[9px] font-body font-semibold rounded-full flex items-center justify-center pointer-events-none">
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop category tabs */}
        <nav className="hidden lg:block relative" onMouseLeave={handleMenuLeave}>
          <div className="max-w-[1400px] mx-auto px-6 flex items-center">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} onMouseEnter={() => handleMenuEnter(item.label)} className="relative">
                <Link href={item.href}
                  className={`block font-body text-[11px] tracking-widest-2 px-3.5 py-3.5 transition-colors whitespace-nowrap ${
                    item.sale ? "text-red-600 hover:text-red-400" : "text-charcoal hover:text-stone"
                  }`}
                >
                  {item.label}
                  {activeMenu === item.label && (
                    <motion.span layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-charcoal" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {activeMenu && activeItem && (
              <div
                onMouseEnter={() => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }}
                onMouseLeave={handleMenuLeave}
              >
                <MegaMenu item={activeItem} />
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
          </AnimatePresence>
        </nav>

        {/* Mobile search dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-bone"
            >
              <SearchBar onClose={() => setSearchOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </React.Fragment>
  );
}