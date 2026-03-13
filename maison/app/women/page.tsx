import { getProductsByCategory } from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";

export const metadata = { title: "Women — MAISON" };

export default function WomenPage() {
  const products = getProductsByCategory("women");
  return (
    <>
      <ProductGrid products={products} title="Women" />
      <Footer />
    </>
  );
}
