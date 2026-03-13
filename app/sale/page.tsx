import { getProductsByCategory } from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";
export const metadata = { title: "Sale — MAISON" };
export default function SalePage() {
  return (<><ProductGrid products={getProductsByCategory("sale")} title="Sale" /><Footer /></>);
}
