import React, { useMemo, useEffect, useState } from "react";
import { CartProvider } from "lib/cart-context";
import { WishlistProvider } from "lib/wishlist-context";

import Navbar from "components/layout/Navbar";
import Footer from "components/layout/Footer";
import CartDrawer from "components/cart/CartDrawer";

import HomePage from "app/page";
import WomenPage from "app/women/page";
import MenPage from "app/men/page";
import AccessoriesPage from "app/accessories/page";
import SalePage from "app/sale/page";
import NewPage from "app/new/page";
import HomeDecorPage from "app/home-decor/page";
import KidsPage from "app/kids/page";
import AccountPage from "app/account/page";
import CartPage from "app/cart/page";
import CheckoutPage from "app/checkout/page";
import WishlistPage from "app/wishlist/page";
import ProductPage from "app/product/[slug]/page";
import CategoryPage from "app/women/page";
import SubCategoryPage from "app/womenCategory/page";
import NotFoundPage from "app/not-found";

function getView(pathname) {
  if (pathname === "/") {
    return {
      title: "Coombb - Modern Luxury Fashion",
      view: <HomePage />,
    };
  }

  if (pathname === "/women") {
    return { title: "Women - Coombb", view: <WomenPage /> };
  }

  if (pathname === "/men") {
    return { title: "Menswear - Coombb", view: <MenPage /> };
  }

  // ✅ Dynamic Category
  if (pathname.startsWith("/category/")) {
    const slug = pathname.split("/")[2];

    return {
      title: `${slug} - Coombb`,
      view: <CategoryPage slug={slug} />,
    };
  }
  // ✅ Dynamic Category
  if (pathname.startsWith("/product-category/")) {
    const slug = pathname.split("/")[2];

    return {
      title: `${slug} - Coombb`,
      view: <SubCategoryPage slug={slug} />,
    };
  }

  if (pathname === "/accessories") {
    return { title: "Accessories - Coombb", view: <AccessoriesPage /> };
  }

  if (pathname === "/sale") {
    return { title: "Sale - Coombb", view: <SalePage /> };
  }

  if (pathname === "/new") {
    return { title: "Women's New In - Coombb", view: <NewPage /> };
  }

  if (pathname === "/home-decor") {
    return { title: "Home Decor - Coombb", view: <HomeDecorPage /> };
  }

  if (pathname === "/kids") {
    return { title: "Kids - Coombb", view: <KidsPage /> };
  }

  if (pathname === "/account") {
    return { title: "Account - Coombb", view: <AccountPage /> };
  }

  if (pathname === "/cart") {
    return { title: "Cart - Coombb", view: <CartPage /> };
  }

  if (pathname === "/checkout") {
    return { title: "Checkout - Coombb", view: <CheckoutPage /> };
  }

  if (pathname === "/wishlist") {
    return { title: "Wishlist - Coombb", view: <WishlistPage /> };
  }

// ✅ Product Page
if (pathname.startsWith("/product/")) {
  const slug = pathname.split("/")[2]; // extract slug

  return {
    title: "Product - Coombb",
    view: <ProductPage params={{ slug }} />, // ✅ FIXED
  };
}

  return {
    title: "Not Found - Coombb",
    view: <NotFoundPage />,
  };
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  // ✅ Listen for browser navigation
  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);

    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const current = useMemo(() => getView(path), [path]);

  // ✅ Update page title
  useEffect(() => {
    document.title = current.title;
  }, [current]);

  return (
    <CartProvider>
      <WishlistProvider>
        <Navbar />
        <CartDrawer />
        <main className="page-content">{current.view}</main>
        <Footer />
      </WishlistProvider>
    </CartProvider>
  );
}