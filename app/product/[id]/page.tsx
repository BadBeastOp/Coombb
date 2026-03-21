import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/lib/data";
import ProductDetailPage from "@/components/product-detail/ProductDetailPage";
import Footer from "@/components/layout/Footer";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) return { title: "Not Found — MAISON" };
  return { title: `${product.name} — MAISON` };
}

export default function ProductPage({ params }: Props) {
  const product = getProductById(params.id);
  if (!product) notFound();
  const related = getRelatedProducts(product!, 8);
  return (
    <>
      <ProductDetailPage product={product!} related={related} />
      <Footer />
    </>
  );
}