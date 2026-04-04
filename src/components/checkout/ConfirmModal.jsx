"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmModal({
  show,
  setShow,
  selectedAddress,
  showselectedAddress,
  items = [],
  onConfirm,
}) {
  console.log("showselectedAddress",showselectedAddress);

  // ✅ CALCULATIONS
  const totalPrice = items.reduce((sum, item) => {
    return sum + parseFloat(item.total || (item.price * item.quantity) || 0);
  }, 0);

  const shipping = 0;
  const total = totalPrice + shipping;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full max-w-lg p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-3 text-sm"
            >
              ✕
            </button>

            <h2 className="text-sm mb-4 font-medium">
              CONFIRM YOUR ORDER
            </h2>

            {/* ✅ ADDRESS */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-500 mb-1">
                DELIVERY ADDRESS
              </h3>

              {selectedAddress ? (
                <>
                  <p className="text-sm">{selectedAddress.name}</p>

                  <p className="text-xs">
                    {selectedAddress.email}, {selectedAddress.phone_number}
                  </p>

                  <p className="text-xs">
                    {selectedAddress.apartment_suite}, {selectedAddress.street}
                  </p>

                  <p className="text-xs">{selectedAddress.zipcode}</p>

                  <p className="text-xs">
                    {selectedAddress.state?.name || selectedAddress.state},{" "}
                    {selectedAddress.city?.name || selectedAddress.city},{" "}
                    {selectedAddress.country?.name || selectedAddress.country}
                  </p>
                </>
              ) : (
                <p className="text-xs text-gray-500">
                  No address selected
                </p>
              )}
            </div>

            {/* ✅ PRODUCTS */}
            <div className="mb-4">
              <h3 className="text-xs text-gray-500 mb-2">
                PRODUCTS
              </h3>
              <div className="space-y-3 max-h-40 overflow-auto">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product?.name} × {item.quantity}
                        <br />
                        <span className="text-xs text-gray-500">
                          {item.color?.name || "-"} |{" "}
                          {item.size?.name || "-"}
                        </span>
                      </span>

                      <span>
                        €
                        {parseFloat(
                          item.total ||
                            item.price * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">
                    No items
                  </p>
                )}
              </div>
            </div>

            {/* ✅ TOTALS (LEFT-RIGHT ALIGN FIXED) */}
            <div className="border-t pt-3 text-sm space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : `€${shipping}`}
                </span>
              </div>

              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>

            {/* ✅ ACTIONS */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShow(false)}
                className="flex-1 border py-3 text-xs"
              >
                CANCEL
              </button>

              <button
                onClick={onConfirm}
                className="flex-1 bg-black text-white py-3 text-xs"
              >
                CONFIRM ORDER
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}