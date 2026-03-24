import Hero from "components/home/Hero";
import CategoryGrid from "components/home/CategoryGrid";
import NewArrivals from "components/home/NewArrivals";
import FeaturedProducts from "components/home/FeaturedProducts";
import SaleSection from "components/home/SaleSection";
import Editorial from "components/home/Editorial";
import Newsletter from "components/home/Newsletter";
import Footer from "components/layout/Footer";
export const metadata = { title: "COOMBB — Modern Luxury Fashion" };
export default function Home() {
    return (<>
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <FeaturedProducts />
      <SaleSection />
      <Editorial />
      <Newsletter />
      <Footer />
    </>);
}
