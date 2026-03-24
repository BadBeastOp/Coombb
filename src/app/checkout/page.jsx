"use client";
import { useState } from "react";
import Image from "lib/NextImage";
import Link from "lib/Link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Lock, CheckCircle } from "lucide-react";
import { useCart } from "lib/cart-context";
import Footer from "components/layout/Footer";
import BrandLogo from "components/ui/BrandLogo";
export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState("shipping");
    const shipping = totalPrice >= 150 ? 0 : 9.95;
    const total = totalPrice + shipping;
    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", phone: "",
        address: "", city: "", postalCode: "", country: "France",
        cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
    });
    const update = (field, val) => setForm((f) => ({ ...f, [field]: val }));
    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep("payment");
    };
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setStep("confirmed");
        clearCart();
    };
    if (step === "confirmed") {
        return (<>
        <div className="min-h-screen flex items-center justify-center px-6 pt-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
            <CheckCircle size={56} strokeWidth={1} className="mx-auto mb-6 text-charcoal"/>
            <h1 className="font-display text-4xl lg:text-5xl font-light italic mb-4">
              Order Confirmed
            </h1>
            <p className="font-body text-sm text-stone mb-2">
              Thank you for your order. A confirmation email has been sent to{" "}
              <span className="text-charcoal">{form.email}</span>.
            </p>
            <p className="font-body text-xs text-stone mb-10">
              Order #MAI{Math.floor(Math.random() * 90000 + 10000)}
            </p>
            <Link href="/" className="font-body text-xs tracking-editorial px-10 py-4 bg-charcoal text-white hover:bg-charcoal/80 transition-colors">
              CONTINUE SHOPPING
            </Link>
          </motion.div>
        </div>
        <Footer />
      </>);
    }
    return (<>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-8 pb-16 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="inline-flex items-center">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2 font-body text-xs text-stone">
            <Lock size={12} strokeWidth={1.5}/> SECURE CHECKOUT
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10 font-body text-xs">
          <span className={step === "shipping" ? "text-charcoal tracking-editorial" : "text-stone"}>
            SHIPPING
          </span>
          <ChevronRight size={12} className="text-stone"/>
          <span className={step === "payment" ? "text-charcoal tracking-editorial" : "text-stone"}>
            PAYMENT
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === "shipping" && (<motion.form key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handleShippingSubmit} className="space-y-4">
                  <h2 className="font-body text-xs tracking-editorial mb-6">SHIPPING ADDRESS</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-stone block mb-1.5">First Name</label>
                      <input required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                    </div>
                    <div>
                      <label className="font-body text-xs text-stone block mb-1.5">Last Name</label>
                      <input required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs text-stone block mb-1.5">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                  </div>
                  <div>
                    <label className="font-body text-xs text-stone block mb-1.5">Address</label>
                    <input required value={form.address} onChange={(e) => update("address", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-stone block mb-1.5">City</label>
                      <input required value={form.city} onChange={(e) => update("city", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                    </div>
                    <div>
                      <label className="font-body text-xs text-stone block mb-1.5">Postal Code</label>
                      <input required value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-xs text-stone block mb-1.5">Country</label>
                    <select value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal bg-white transition-colors">
                      <option>France</option><option>Germany</option><option>Italy</option>
                      <option>Spain</option><option>United Kingdom</option><option>United States</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full font-body text-xs tracking-editorial py-4 bg-charcoal text-white hover:bg-charcoal/90 transition-colors mt-4">
                    CONTINUE TO PAYMENT
                  </button>
                </motion.form>)}

              {step === "payment" && (<motion.form key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-body text-xs tracking-editorial">PAYMENT</h2>
                    <button type="button" onClick={() => setStep("shipping")} className="font-body text-xs text-stone hover-underline">
                      ← BACK
                    </button>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-cream border border-bone mb-2">
                    <Lock size={12} strokeWidth={1.5} className="text-stone"/>
                    <span className="font-body text-xs text-stone">Your payment information is encrypted and secure</span>
                  </div>
                  <div>
                    <label className="font-body text-xs text-stone block mb-1.5">Card Number</label>
                    <input required placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value.replace(/\D/g, "").slice(0, 16))} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                  </div>
                  <div>
                    <label className="font-body text-xs text-stone block mb-1.5">Cardholder Name</label>
                    <input required value={form.cardName} onChange={(e) => update("cardName", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-xs text-stone block mb-1.5">Expiry (MM/YY)</label>
                      <input required placeholder="MM/YY" value={form.cardExpiry} onChange={(e) => update("cardExpiry", e.target.value)} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                    </div>
                    <div>
                      <label className="font-body text-xs text-stone block mb-1.5">CVV</label>
                      <input required placeholder="123" value={form.cardCvv} onChange={(e) => update("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))} className="w-full border border-bone px-4 py-3 font-body text-sm focus:outline-none focus:border-charcoal transition-colors"/>
                    </div>
                  </div>
                  <button type="submit" className="w-full font-body text-xs tracking-editorial py-4 bg-charcoal text-white hover:bg-charcoal/90 transition-colors mt-4">
                    PLACE ORDER · €{total.toFixed(2)}
                  </button>
                </motion.form>)}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-5">
            <div className="bg-cream p-8">
              <h2 className="font-body text-xs tracking-editorial mb-6">ORDER SUMMARY</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (<div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-3">
                    <div className="relative w-14 h-20 bg-bone flex-none overflow-hidden">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover"/>
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-white text-[9px] font-body rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-xs tracking-editorial leading-tight">{item.product.name}</p>
                      <p className="font-body text-xs text-stone mt-0.5">{item.selectedColor} · {item.selectedSize}</p>
                    </div>
                    <span className="font-body text-sm">€{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>))}
              </div>
              <div className="border-t border-bone pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-stone">Subtotal</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-stone">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `€${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-bone mt-2">
                  <span className="font-body text-xs tracking-editorial">TOTAL</span>
                  <span className="font-display text-2xl font-light">€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>);
}
