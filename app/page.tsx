import Hero from "@/components/home/Hero";
import PromoStrip from "@/components/home/PromoStrip";
import CategoryGrid from "@/components/home/CategoryGrid";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CollectionBanners from "@/components/home/CollectionBanners";
import SaleSection from "@/components/home/SaleSection";
import Editorial from "@/components/home/Editorial";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "MAISON — Modern Luxury Fashion" };

export default function Home() {
  return (
    <>
      <PromoStrip />
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <CollectionBanners />
      <FeaturedProducts />
      <SaleSection />
      <Editorial />
      <Newsletter />
      <Footer />
    </>
  );
}