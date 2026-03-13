import { getProductsByCategory } from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";
export const metadata = { title: "New In — MAISON" };
export default function NewPage() {
  return (<><ProductGrid products={getProductsByCategory("new")} title="New In" /><Footer /></>);
}
