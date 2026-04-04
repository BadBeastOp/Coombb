"use client";

import React, { useEffect, useState } from "react";
import Hero from "components/home/Hero";
import CategoryGrid from "components/home/CategoryGrid";
import NewArrivals from "components/home/NewArrivals";
import FeaturedProducts from "components/home/FeaturedProducts";
import SaleSection from "components/home/SaleSection";
import Editorial from "components/home/Editorial";
import Newsletter from "components/home/Newsletter";
import { siteBanner, newArrival, siteSlider } from "services/api/menu";

export default function Home() {
  const [bannerRes, setBannerRes] = useState(null);
  const [arrivalRes, setArrivalRes] = useState(null);
  const [sliderRes, setSliderRes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [banner, arrival, slider] = await Promise.all([
          siteBanner(),
          newArrival(),
          siteSlider(),
        ]);

        console.log("API DATA:", banner, arrival, slider);

        setBannerRes(banner);
        setArrivalRes(arrival);
        setSliderRes(slider); // ✅ FIXED
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* ✅ FIXED PROP NAME */}
      <Hero topSlider={sliderRes?.data} />

      <CategoryGrid topCategory={bannerRes?.top_banner?.data} />
      <NewArrivals data={arrivalRes?.data} />
      <FeaturedProducts
        featuredProducts={bannerRes?.featured_products?.data}
      />
      <SaleSection topProducts={bannerRes?.top_products?.data} />

      <Editorial />
      <Newsletter />
    </>
  );
}