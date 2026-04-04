import API from "./api";

// helper to get headers
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

// Get all cart items
export const getCart = async () => {
  try {
    const res = await API.get("/cart", {
      headers: getAuthHeader(),
    });
    return res.data?.data || { items: [] };
  } catch (err) {
    console.error("Error fetching cart:", err);
    return { items: [] };
  }
};

// Add item to cart
export const addToCart = async (payload) => {
  console.log(getAuthHeader());
  debugger;
  try {
    const res = await API.post("/cart", payload, {
      headers: getAuthHeader(),
    });
    console.log("ressssss",res);
    debugger;
    return res.data || null;
  } catch (err) {
    console.error("Error adding to cart:", err);
    return null;
  }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const res = await API.put(
      `/cart/${cartItemId}`,
      { quantity },
      {
        headers: getAuthHeader(),
      }
    );
    return res.data || null;
  } catch (err) {
    console.error("Error updating cart item:", err);
    return null;
  }
};

// Remove item from cart
export const removeCartItem = async (cartItemId) => {
  try {
    const res = await API.delete(`/cart/${cartItemId}`, {
      headers: getAuthHeader(),
    });
    return res.data || null;
  } catch (err) {
    console.error("Error removing cart item:", err);
    return null;
  }
};

  // Get wishlist items
  export const getWishlist = async () => {
    try {
      const res = await API.get("/wishlists", {
        headers: getAuthHeader(),
      });

      return res.data?.data || [];
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      return [];
    }
  };

  // Add/remove wishlist item
  export const addWishlist = async (payload) => {
    try {
      const res = await API.post(
        "/wishlists",
        payload,
        {
          headers: getAuthHeader(),
        }
      );

      return res.data || null;
    } catch (err) {
      console.error("Error adding wishlist:", err);
      return null;
    }
  };
  // Remove wishlist item
  export const removeWishlist = async (wishlistId) => {
    try {
      const res = await API.delete(
        `/wishlists/${wishlistId}`,
        {
          headers: getAuthHeader(),
        }
      );

      return res.data || null;
    } catch (err) {
      console.error("Error removing wishlist:", err);
      return null;
    }
  };