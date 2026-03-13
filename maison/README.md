# MAISON — Luxury Fashion E-commerce

A full-featured, production-ready luxury fashion e-commerce website built with Next.js 14, Tailwind CSS, and Framer Motion. Inspired by Zara, COS, and other high-fashion brands.

## ✦ Features

- **Full e-commerce flow** — Browse → Product Detail → Cart → Checkout → Confirmation
- **Animated UI** — Page transitions, hover effects, staggered reveals via Framer Motion
- **Cart system** — Persistent cart with quantity controls, color/size selection
- **Wishlist** — Save favourite pieces across the session
- **Search** — Live search modal with product suggestions
- **Filters & Sorting** — Size, color, price range, newest/price sort
- **Responsive** — Mobile-first, fully responsive layout
- **Image zoom** — Hover-to-zoom on product detail pages
- **Newsletter** — Animated signup in footer

## ✦ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React** icons
- **Google Fonts** — Cormorant Garamond (display) + Jost (body)

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✦ Project Structure

```
maison/
├── app/
│   ├── layout.tsx          # Root layout with fonts & providers
│   ├── page.tsx            # Homepage
│   ├── globals.css
│   ├── women/page.tsx
│   ├── men/page.tsx
│   ├── kids/page.tsx
│   ├── accessories/page.tsx
│   ├── new/page.tsx
│   ├── sale/page.tsx
│   ├── product/[id]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── wishlist/page.tsx
│   └── account/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav with mobile drawer
│   │   └── Footer.tsx      # Footer with newsletter
│   ├── home/
│   │   ├── Hero.tsx        # Full-screen hero section
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedProducts.tsx  # Horizontal scroll
│   │   └── Editorial.tsx   # Magazine-style layouts
│   ├── product/
│   │   ├── ProductCard.tsx # Card with hover image swap
│   │   ├── ProductDetail.tsx # Full detail with zoom
│   │   ├── ProductGrid.tsx # Listing with filters
│   │   └── ProductFilters.tsx
│   ├── cart/
│   │   └── CartDrawer.tsx  # Slide-in cart panel
│   └── ui/
│       └── SearchModal.tsx # Live search overlay
├── lib/
│   ├── data.ts             # 12 sample products + helpers
│   ├── cart-context.tsx    # Cart state management
│   └── wishlist-context.tsx
└── public/
```

## ✦ Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, category grid, featured products, editorial |
| `/women` `/men` `/accessories` | Category listing with filters |
| `/new` | New arrivals |
| `/sale` | Sale items |
| `/product/[id]` | Product detail with gallery, zoom, size/color selection |
| `/cart` | Cart summary page |
| `/checkout` | Multi-step checkout (shipping → payment → confirmation) |
| `/wishlist` | Saved items |
| `/account` | Login / Register |

## ✦ Customization

**Add products** — Edit `lib/data.ts` to add/modify products.

**Change colors** — Edit `tailwind.config.ts` and `globals.css` CSS variables.

**Replace images** — Swap Unsplash URLs in `lib/data.ts` with your own CDN images.

**Add payment** — Integrate Stripe by replacing the mock form in `app/checkout/page.tsx`.
