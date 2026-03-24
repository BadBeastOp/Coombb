"use client";
import { useState } from "react";
import Link from "lib/Link";
import { motion } from "framer-motion";
import { Instagram, Youtube, ArrowRight } from "lucide-react";
import BrandLogo from "components/ui/BrandLogo";

const footerLinks = {
  COLLECTIONS: [
    { label: "New In", href: "/new" },
    { label: "Women", href: "/women" },
    { label: "Men", href: "/men" },
    { label: "Accessories", href: "/accessories" },
    { label: "Sale", href: "/sale" },
  ],
  HELP: [
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  COMPANY: [
    { label: "About Coombb", href: "/about" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-charcoal text-white">
      <div className="border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-light italic mb-3">Join the Inner Circle</h3>
            <p className="font-body text-[10px] tracking-editorial text-white/60 mb-7">
              EXCLUSIVE ACCESS TO NEW COLLECTIONS, PRIVATE EVENTS & EDITORIAL CONTENT
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 min-w-0 bg-transparent border border-white/30 px-4 py-3 font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                />
                <button type="submit" className="flex-none bg-white text-charcoal px-5 py-3 font-body text-xs tracking-editorial hover:bg-bone transition-colors flex items-center gap-2 whitespace-nowrap">
                  JOIN <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-body text-sm tracking-editorial text-white/80">
                THANK YOU FOR SUBSCRIBING
              </motion.p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16">
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex w-fit items-center rounded-md bg-white/95 p-1.5">
              <BrandLogo />
            </Link>
            <p className="mt-4 font-body text-xs text-white/50 leading-relaxed max-w-xs">
              Modern luxury fashion for the discerning individual. Crafted with intention, worn with purpose.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors"><Instagram size={17} strokeWidth={1.5} /></a>
              <a href="#" aria-label="YouTube" className="text-white/50 hover:text-white transition-colors"><Youtube size={17} strokeWidth={1.5} /></a>
              <a href="#" aria-label="X / Twitter" className="text-white/50 hover:text-white transition-colors">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l16 16M4 20L20 4" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-body text-[10px] tracking-editorial text-white/40 mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="font-body text-sm text-white/65 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[10px] text-white/30">© 2026 COOMBB. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-5 sm:gap-6">
            <Link href="/privacy" className="font-body text-[10px] text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="font-body text-[10px] text-white/30 hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/cookies" className="font-body text-[10px] text-white/30 hover:text-white/60 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
