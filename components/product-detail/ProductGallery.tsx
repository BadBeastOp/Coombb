"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/data";

type Props = { product: Product };

export default function ProductGallery({ product }: Props) {
  const [selected, setSelected]   = useState(0);
  const [zoomed, setZoomed]       = useState(false);
  const [zoomPos, setZoomPos]     = useState({ x: 50, y: 50 });
  const [lightbox, setLightbox]   = useState(false);
  const imgRef                    = useRef<HTMLDivElement>(null);

  const images = product.images;

  const prev = () => setSelected((s) => (s - 1 + images.length) % images.length);
  const next = () => setSelected((s) => (s + 1) % images.length);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row gap-3">
        {/* Thumbnails — vertical strip on desktop */}
        <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto scrollbar-hide sm:max-h-[700px] flex-none">
          {images.map((img, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`relative flex-none w-14 h-20 sm:w-16 sm:h-[88px] overflow-hidden border-2 transition-all duration-150 ${
                selected === i ? "border-charcoal" : "border-transparent hover:border-gray-300"
              }`}>
              <Image src={img} alt={`${product.name} ${i + 1}`} fill sizes="64px"
                className="object-cover object-top" />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="flex-1 relative">
          <div
            ref={imgRef}
            className="relative overflow-hidden bg-[#f5f5f5] cursor-zoom-in select-none"
            style={{ aspectRatio: "3/4" }}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[selected]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-200"
                  style={zoomed ? {
                    transform: "scale(2)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  } : {}}
                />
              </motion.div>
            </AnimatePresence>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.isNew && (
                <span className="font-body text-[10px] tracking-[0.12em] bg-charcoal text-white px-2.5 py-1 font-medium">
                  NEW IN
                </span>
              )}
              {product.isSale && (
                <span className="font-body text-[10px] tracking-[0.12em] bg-red-600 text-white px-2.5 py-1 font-medium">
                  SALE
                </span>
              )}
            </div>

            {/* Zoom hint */}
            {!zoomed && (
              <div className="absolute bottom-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full pointer-events-none">
                <ZoomIn size={16} strokeWidth={1.5} className="text-charcoal" />
              </div>
            )}

            {/* Prev / Next arrows */}
            {images.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  aria-label="Previous image">
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  aria-label="Next image">
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
              </>
            )}

            {/* Dot indicators — mobile */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 sm:hidden z-10 pointer-events-none">
              {images.map((_, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${
                  selected === i ? "bg-charcoal w-4" : "bg-charcoal/30"
                }`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Close">
              <X size={28} strokeWidth={1.5} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Previous">
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-lg max-h-[90vh]"
              style={{ aspectRatio: "3/4" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[selected]} alt={product.name} fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain" />
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Next">
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button key={i} onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selected === i ? "bg-white" : "bg-white/35"
                  }`} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}