import { getProductsByCategory } from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";
export const metadata = { title: "Accessories — MAISON" };
export default function AccessoriesPage() {
  return (<><ProductGrid products={getProductsByCategory("accessories")} title="Accessories" /><Footer /></>);
}
