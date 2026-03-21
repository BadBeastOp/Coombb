"use client";
import Link from "next/link";
import { Product } from "@/lib/data";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductRelated from "./ProductRelated";

type Props = { product: Product; related: Product[] };

export default function ProductDetailPage({ product, related }: Props) {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <nav className="flex items-center gap-1.5 font-body text-[11px] text-gray-400">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-charcoal transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-charcoal line-clamp-1">{product.name}</span>
        </nav>
      </div>

      {/* Main content — gallery left, info right */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-14">
          {/* Left — image gallery */}
          <ProductGallery product={product} />

          {/* Right — product info */}
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && <ProductRelated products={related} />}
    </div>
  );
}