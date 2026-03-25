import API from "./api";

// Get all cart items
export const getCart = async () => {
  try {
    const res = await API.get("/cart");
    return res.data?.data || { items: [] }; // Ensure fallback
  } catch (err) {
    console.error("Error fetching cart:", err);
    return { items: [] };
  }
};

// Add item to cart
export const addToCart = async (payload) => {
  try {
    const res = await API.post("/cart", payload);
    return res.data || null;
  } catch (err) {
    console.error("Error adding to cart:", err);
    return null;
  }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const res = await API.put(`/cart/${cartItemId}`, { quantity });
    return res.data || null;
  } catch (err) {
    console.error("Error updating cart item:", err);
    return null;
  }
};

// Remove item from cart
export const removeCartItem = async (cartItemId) => {
  try {
    const res = await API.delete(`/cart/${cartItemId}`);
    return res.data || null;
  } catch (err) {
    console.error("Error removing cart item:", err);
    return null;
  }
};

// Get wishlist items
export const getWishlist = async () => {
  try {
    const res = await API.get("/wishlists");
    return res.data?.data || { items: [] };
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return { items: [] };
  }
};

// Add/remove wishlist item
export const toggleWishlist = async (productId) => {
  try {
    const res = await API.post("/wishlists", { product_id: productId });
    return res.data || null;
  } catch (err) {
    console.error("Error toggling wishlist:", err);
    return null;
  }
};