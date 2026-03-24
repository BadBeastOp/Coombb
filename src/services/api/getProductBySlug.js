import API from "./api";
export const getProductBySlug = async (slug) => {
  try {

    const res = await API.get(`/site-products/${slug}`);

    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (err) {
    return null;
  }
};