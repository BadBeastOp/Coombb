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
export const siteBanner = async () => {
  try {
    const res = await API.get("/site-banner");
    return res.data;

  } catch (error) {
    console.error("Banner Api Error:", error);
    return null; // important
  }
};
export const newArrival = async () => {
  try {
    const res = await API.get("/products/new-arrivals");
    return res.data;
  } catch (error) {
    console.error("New Arrival API Error:", error);
    return null; // important
  }
};
// POST a new subscriber (new)
export const addSubscriber = async (email) => {
  try {
    const res = await API.post("/subscribers", { email });
    return res.data;
  } catch (error) {
    console.error("Subscriber POST API Error:", error.response?.data || error.message);
    return null;
  }
};

export const siteSlider = async () => {
  try {
    const res = await API.get("/sliders");
    return res.data;

  } catch (error) {
    console.error("Banner Api Error:", error);
    return null; // important
  }
};