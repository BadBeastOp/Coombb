"use client";

export default function OrderSummary({
  items,
  step,
  onContinue,
  onPlaceOrder,
}) {
  // ✅ ALWAYS SAFE ARRAY
  const safeItems = Array.isArray(items) ? items : [];

  // ✅ CALCULATIONS
  const totalPrice = safeItems.reduce((sum, item) => {
    const itemTotal =
      parseFloat(item?.total) ||
      parseFloat(item?.price || 0) * parseFloat(item?.quantity || 0);

    return sum + (itemTotal || 0);
  }, 0);

  const shipping = 0;
  const total = totalPrice + shipping;

  return (
    <div className="bg-gray-100 p-6 sticky top-6 rounded-xl shadow-sm">
      <h2 className="mb-6 text-xs font-semibold tracking-wide">
        ORDER SUMMARY
      </h2>

      {/* ✅ ITEMS */}
      {safeItems.length > 0 ? (
        safeItems.map((item, index) => (
          <div
            key={item?.id || index}
            className="flex justify-between text-sm mb-4"
          >
            <div>
              <span className="font-medium">
                {item?.product?.name || "Product"} ×{" "}
                {item?.quantity || 0}
              </span>

              <div className="text-xs text-gray-500 mt-1">
                Color: {item?.color?.name || "-"} | Size:{" "}
                {item?.size?.name || "-"}
              </div>
            </div>

            <span className="font-medium">
              €
              {(
                parseFloat(item?.total) ||
                (parseFloat(item?.price || 0) *
                  parseFloat(item?.quantity || 0))
              ).toFixed(2)}
            </span>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No items in cart</p>
      )}

      {/* ✅ TOTALS */}
      <div className="mt-6 border-t pt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>€{totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "FREE" : `€${shipping}`}</span>
        </div>

        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>€{total.toFixed(2)}</span>
        </div>
      </div>

      {/* ✅ BUTTONS */}
      {step === "shipping" && (
        <button
          onClick={onContinue}
          className="w-full mt-6 bg-black text-white py-3 text-xs rounded-lg hover:bg-gray-800 transition"
        >
          CONTINUE TO PAYMENT
        </button>
      )}

      {step === "payment" && (
        <button
          onClick={onPlaceOrder}
          className="w-full mt-6 bg-black text-white py-3 text-xs rounded-lg hover:bg-gray-800 transition"
        >
          PLACE ORDER
        </button>
      )}
    </div>
  );
}