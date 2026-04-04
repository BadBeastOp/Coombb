import { createOrder } from "services/api/order";

// ✅ PAYU REDIRECT FUNCTION
const redirectToPayU = ({ action, fields }) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;

  Object.keys(fields).forEach((key) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = fields[key];
    form.appendChild(input);
  });

  // ✅ SUCCESS URL
  const surl = document.createElement("input");
  surl.type = "hidden";
  surl.name = "surl";
  surl.value = `${window.location.origin}/payment/success`;

  // ❌ FAILURE URL
  const furl = document.createElement("input");
  furl.type = "hidden";
  furl.name = "furl";
  furl.value = `${window.location.origin}/payment/failure`;

  form.appendChild(surl);
  form.appendChild(furl);

  document.body.appendChild(form);
  form.submit();
};

// ✅ MAIN FUNCTION
export const placeOrder = async ({ cart, selectedAddressId }) => {
  try {
    const userId = localStorage.getItem("authUserId");
    const authToken = localStorage.getItem("authToken");

    // ✅ VALIDATION
    if (!selectedAddressId) {
      return { success: false, message: "Please select address ❌" };
    }

    if (!cart || cart.length === 0) {
      return { success: false, message: "Cart is empty ❌" };
    }

    // ✅ ITEMS
    const items = cart.map((item) => ({
      product_id: item.product?.id,
      quantity: item.quantity,
      price: Number(item.price),
      color_id: item.color?.id || null,
      size_id: item.size?.id || null,
    }));

    // ✅ TOTAL
    const total_amount = cart.reduce(
      (sum, item) =>
        sum + Number(item.total || item.price * item.quantity),
      0
    );

    // ✅ PAYLOAD
    let payload = {
      payment_type: "payu",
      items,
      total_amount,
    };

    if (userId && authToken) {
      payload = {
        ...payload,
        user_id: userId,
        session_id: userId,
        user_address_id: selectedAddressId,
      };
    }

    // ✅ API CALL
    const data = await createOrder(payload, authToken);

    // ✅ REDIRECT TO PAYU
    if (data?.payment?.action && data?.payment?.fields) {
      redirectToPayU(data.payment);

      return {
        success: true,
        redirecting: true,
        message: "Redirecting to payment...",
      };
    }

    return {
      success: true,
      data,
      message: "Order placed successfully ✅",
    };

  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong ❌",
    };
  }
};