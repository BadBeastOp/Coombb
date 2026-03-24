import { getProductById, getRelatedProducts } from "lib/data";
import ProductDetailPage from "components/product-detail/ProductDetailPage";
import Footer from "components/layout/Footer";

export default function ProductPage({ params }) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-8">
        <div className="text-center">
          <p className="font-body text-xs tracking-widest-2 text-stone mb-4">404</p>
          <h1 className="font-display text-5xl font-light italic mb-4">Product Not Found</h1>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product, 8);

  return (
    <>
      <ProductDetailPage product={product} related={related} />
      <Footer />
    </>
  );
}
