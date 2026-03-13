import { getProductsByCategory } from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";
export const metadata = { title: "Men — MAISON" };
export default function MenPage() {
  return (<><ProductGrid products={getProductsByCategory("men")} title="Men" /><Footer /></>);
}
