import API from "./api";

export const getMenu = async () => {
  try {
    const res = await API.get("/menu");
    return res.data;
  } catch (error) {
    console.error("Menu API Error:", error);
    return null; // important
  }
};