export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory: string;
  colors: { name: string; hex: string; image?: string }[];
  sizes: string[];
  images: string[];
  description: string;
  details: string[];
  isNew?: boolean;
  isSale?: boolean;
  tags: string[];
};

export const products: Product[] = [
  {
    id: "p001",
    name: "STRUCTURED WOOL BLAZER",
    price: 249,
    category: "women",
    subcategory: "jackets",
    colors: [
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "Camel", hex: "#C19A6B" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80",
    ],
    description: "A masterfully tailored wool blazer that defines modern elegance. Cut from premium Italian wool with a structured silhouette that transitions effortlessly from day to evening.",
    details: ["100% Merino Wool", "Fully lined", "Notched lapels", "Two-button closure", "Dry clean only"],
    isNew: true,
    tags: ["blazer", "jacket", "formal", "work"],
  },
  {
    id: "p002",
    name: "SILK SLIP DRESS",
    price: 189,
    category: "women",
    subcategory: "dresses",
    colors: [
      { name: "Ecru", hex: "#F2EAD3" },
      { name: "Noir", hex: "#1A1A1A" },
      { name: "Blush", hex: "#E8B4A0" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    ],
    description: "A fluid silk slip dress with a bias cut that moves beautifully with the body. The epitome of understated luxury.",
    details: ["100% Silk", "Adjustable straps", "Side slit", "Hand wash cold"],
    isNew: true,
    tags: ["dress", "silk", "evening", "minimalist"],
  },
  {
    id: "p003",
    name: "TAILORED TROUSERS",
    price: 149,
    category: "women",
    subcategory: "trousers",
    colors: [
      { name: "Cream", hex: "#F5F0E8" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Taupe", hex: "#8E7E6A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4e7b?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    description: "Impeccably cut wide-leg trousers in a premium wool blend. A wardrobe essential that defines modern power dressing.",
    details: ["70% Wool, 30% Polyester", "High waist", "Wide leg", "Side zip", "Dry clean only"],
    tags: ["trousers", "formal", "wide-leg"],
  },
  {
    id: "p004",
    name: "CASHMERE TURTLENECK",
    price: 219,
    originalPrice: 299,
    category: "women",
    subcategory: "knitwear",
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Ivory", hex: "#F5F0E8" },
      { name: "Charcoal", hex: "#444444" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    ],
    description: "Pure cashmere turtleneck in a relaxed, oversized silhouette. Extraordinarily soft against the skin with exceptional warmth.",
    details: ["100% Cashmere", "Relaxed fit", "Ribbed cuffs and hem", "Dry clean only"],
    isSale: true,
    tags: ["knitwear", "cashmere", "winter"],
  },
  {
    id: "p005",
    name: "OVERSIZED LINEN SHIRT",
    price: 89,
    category: "men",
    subcategory: "shirts",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Sand", hex: "#C8B89A" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1563630423918-b58bef06b519?w=800&q=80",
    ],
    description: "A beautifully relaxed linen shirt with an oversized silhouette. Perfect for warm days, styled open over a tee or alone.",
    details: ["100% Linen", "Oversized fit", "Button-down front", "Machine wash cold"],
    isNew: true,
    tags: ["shirt", "linen", "summer", "casual"],
  },
  {
    id: "p006",
    name: "SLIM WOOL TROUSERS",
    price: 169,
    category: "men",
    subcategory: "trousers",
    colors: [
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Camel", hex: "#C19A6B" },
    ],
    sizes: ["28", "30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1490551370062-751bff5f3045?w=800&q=80",
    ],
    description: "Slim-cut trousers in a premium wool blend with a precise, modern silhouette.",
    details: ["60% Wool, 40% Polyester", "Slim fit", "Flat front", "Dry clean only"],
    tags: ["trousers", "formal", "wool"],
  },
  {
    id: "p007",
    name: "MERINO CREWNECK",
    price: 129,
    originalPrice: 179,
    category: "men",
    subcategory: "knitwear",
    colors: [
      { name: "Oatmeal", hex: "#E8DCC8" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Forest", hex: "#2D4A3E" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    description: "A refined merino wool crewneck with a classic silhouette. The perfect layering piece.",
    details: ["100% Merino Wool", "Regular fit", "Ribbed collar, cuffs and hem", "Machine wash cold"],
    isSale: true,
    tags: ["knitwear", "merino", "winter"],
  },
  {
    id: "p008",
    name: "LEATHER TOTE BAG",
    price: 345,
    category: "accessories",
    subcategory: "bags",
    colors: [
      { name: "Tan", hex: "#C19A6B" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cognac", hex: "#9B4E1A" },
    ],
    sizes: ["ONE SIZE"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    ],
    description: "A generous structured tote in full-grain vegetable-tanned leather. Ages beautifully with use.",
    details: ["Full-grain leather", "Cotton lining", "Interior zip pocket", "Magnetic closure"],
    isNew: true,
    tags: ["bag", "leather", "tote", "accessories"],
  },
  {
    id: "p009",
    name: "SILK SCARF",
    price: 95,
    category: "accessories",
    subcategory: "scarves",
    colors: [
      { name: "Ivory/Gold", hex: "#F5F0E8" },
      { name: "Black/White", hex: "#1A1A1A" },
    ],
    sizes: ["ONE SIZE"],
    images: [
      "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800&q=80",
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
    ],
    description: "A hand-rolled silk twill scarf with an exclusive print. Wear as a neck scarf, headband, or bag accessory.",
    details: ["100% Silk twill", "Hand-rolled edges", "90x90cm", "Dry clean only"],
    tags: ["scarf", "silk", "accessories"],
  },
  {
    id: "p010",
    name: "MINIMALIST CHELSEA BOOTS",
    price: 289,
    originalPrice: 389,
    category: "accessories",
    subcategory: "shoes",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Tan", hex: "#C19A6B" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800&q=80",
    ],
    description: "Sleek chelsea boots in smooth calfskin leather with a subtle stacked heel. A perennial wardrobe staple.",
    details: ["Calfskin leather upper", "Leather lining", "Stacked heel 4cm", "Rubber sole"],
    isSale: true,
    tags: ["shoes", "boots", "leather", "accessories"],
  },
  {
    id: "p011",
    name: "COTTON POPLIN MIDI DRESS",
    price: 125,
    category: "women",
    subcategory: "dresses",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Stripe", hex: "#E8E0D0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    ],
    description: "A beautifully relaxed midi dress in crisp cotton poplin. Effortless, elegant, and eternally wearable.",
    details: ["100% Cotton", "Midi length", "V-neck", "Machine wash cold"],
    isNew: true,
    tags: ["dress", "cotton", "midi", "summer"],
  },
  {
    id: "p012",
    name: "TAILORED OVERCOAT",
    price: 449,
    category: "men",
    subcategory: "coats",
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Charcoal", hex: "#2D2D2D" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    ],
    description: "A defining piece. This tailored overcoat in premium wool cashmere blend is cut with exceptional precision for a silhouette that commands attention.",
    details: ["80% Wool, 20% Cashmere", "Fully lined", "Single-breasted", "Dry clean only"],
    isNew: true,
    tags: ["coat", "wool", "winter", "formal"],
  },
];

export const categories = [
  { id: "women", label: "WOMEN", href: "/women" },
  { id: "men", label: "MEN", href: "/men" },
  { id: "kids", label: "KIDS", href: "/kids" },
  { id: "accessories", label: "ACCESSORIES", href: "/accessories" },
  { id: "new", label: "NEW IN", href: "/new" },
  { id: "sale", label: "SALE", href: "/sale" },
];

export function getProductsByCategory(category: string): Product[] {
  if (category === "new") return products.filter((p) => p.isNew);
  if (category === "sale") return products.filter((p) => p.isSale);
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.tags.some((t) => product.tags.includes(t))))
    .slice(0, limit);
}
