"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Lock, CheckCircle } from "lucide-react";
import Link from "lib/Link";
import BrandLogo from "components/ui/BrandLogo";
import Footer from "components/layout/Footer";

import AddressList from "components/checkout/AddressList";
import AddressForm from "components/checkout/AddressForm";
import OrderSummary from "components/checkout/OrderSummary";
import ConfirmModal from "components/checkout/ConfirmModal";

import { getAddresses } from "services/api/address";
import { getCart } from "services/api/cart";
import { placeOrder } from "services/helper/placeOrder";

export default function CheckoutPage() {
  const [step, setStep] = useState("shipping");

  // ✅ ADDRESS STATE
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // ✅ CART STATE
  const [cart, setCart] = useState(null);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addrRes, cartRes] = await Promise.all([
          getAddresses(),
          getCart(),
        ]);

        // ✅ ADDRESS FIX
        const addressList =
          addrRes?.data?.data || addrRes?.data || addrRes || [];

        if (addressList.length > 0) {
          setAddresses(addressList);

          const defaultAddr =
            addressList.find((a) => a.isDefault) || addressList[0];

          setSelectedAddressId(defaultAddr.id);
          setSelectedAddress(defaultAddr);
        }

        console.log("cartRes", cartRes);
        console.log("cartRes", cartRes[0].items);

        // ✅ CART FIX (IMPORTANT)
        const cartData = cartRes[0].items || {};

        setCart(cartData);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // ✅ CONFIRM PAGE
  if (step === "confirmed") {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center px-6 pt-8">
          <div className="text-center">
            <CheckCircle className="mx-auto mb-4" />
            <h1>Order Confirmed</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-6 pt-8 pb-16">
        {/* HEADER */}
        <div className="flex justify-between mb-10">
          <Link href="/">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <Lock size={12} /> SECURE CHECKOUT
          </div>
        </div>

        {/* STEPS */}
        <div className="flex gap-2 mb-10 text-xs">
          <span className={step === "shipping" ? "text-black" : "text-gray-400"}>
            SHIPPING
          </span>
          <ChevronRight size={12} />
          <span className={step === "payment" ? "text-black" : "text-gray-400"}>
            PAYMENT
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === "shipping" && (
                <motion.div key="shipping">
                  <AddressList
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    setSelectedAddressId={setSelectedAddressId}
                    setSelectedAddress={setSelectedAddress}
                    setShowForm={setShowForm}
                    setEditId={setEditId}
                    setAddresses={setAddresses}
                  />

                  {showForm && (
                    <AddressForm
                      editId={editId}
                      setEditId={setEditId}
                      addresses={addresses}
                      setAddresses={setAddresses}
                      setSelectedAddressId={setSelectedAddressId}
                      setShowForm={setShowForm}
                    />
                  )}
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div key="payment">
                  <h2>Payment Step</h2>
                  <button onClick={() => setStep("confirmed")}>
                    Place Order
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            {cart && cart.length > 0 ? (
              <OrderSummary
                items={cart}
                step={step}
                onContinue={() => {
                  if (!selectedAddressId) return alert("Select address");
                  setShowConfirmModal(true);
                }}
                onPlaceOrder={() => setStep("confirmed")}
              />
            ) : (
              <div className="p-6 text-center border rounded-lg">
                <p className="text-gray-500 text-lg">🛒 Cart is empty</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      { cart && cart.length > 0 && step !== "confirmed" && (
        <ConfirmModal
          show={showConfirmModal}
          setShow={setShowConfirmModal}
          selectedAddress={selectedAddress}
          items={cart}
          onConfirm={async () => {
            const result = await placeOrder({
              cart,
              selectedAddressId,
            });

            if (result.success) {
              alert(result.message);
              setShowConfirmModal(false);
              setStep("confirmed");
            } else {
              alert(result.message);
            }
          }}
        />
      )}

      <Footer />
    </>
  );
}