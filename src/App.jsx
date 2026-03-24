import React, { useMemo } from "react";
import { CartProvider } from "lib/cart-context";
import { WishlistProvider } from "lib/wishlist-context";
import Navbar from "components/layout/Navbar";
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
import ProductPage from "app/product/[id]/page";
import NotFoundPage from "app/not-found";

function getView(pathname) {
  if (pathname === "/") return { title: "Coombb - Modern Luxury Fashion", view: <HomePage /> };
  if (pathname === "/women") return { title: "Women - Coombb", view: <WomenPage /> };
  if (pathname === "/men") return { title: "Menswear - Coombb", view: <MenPage /> };
  if (pathname === "/accessories") return { title: "Accessories - Coombb", view: <AccessoriesPage /> };
  if (pathname === "/sale") return { title: "Sale - Coombb", view: <SalePage /> };
  if (pathname === "/new") return { title: "Women's New In - Coombb", view: <NewPage /> };
  if (pathname === "/home-decor") return { title: "Home Decor - Coombb", view: <HomeDecorPage /> };
  if (pathname === "/kids") return { title: "Kids - Coombb", view: <KidsPage /> };
  if (pathname === "/account") return { title: "Account - Coombb", view: <AccountPage /> };
  if (pathname === "/cart") return { title: "Cart - Coombb", view: <CartPage /> };
  if (pathname === "/checkout") return { title: "Checkout - Coombb", view: <CheckoutPage /> };
  if (pathname === "/wishlist") return { title: "Wishlist - Coombb", view: <WishlistPage /> };

  if (pathname.startsWith("/product/")) {
    const id = decodeURIComponent(pathname.replace("/product/", "").split("/")[0]);
    return { title: "Product - Coombb", view: <ProductPage params={{ id }} /> };
  }

  return { title: "Not Found - Coombb", view: <NotFoundPage /> };
}

export default function App() {
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const current = useMemo(() => getView(pathname), [pathname]);

  if (typeof document !== "undefined") {
    document.title = current.title;
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <Navbar />
        <CartDrawer />
        <main className="page-content">{current.view}</main>
      </WishlistProvider>
    </CartProvider>
  );
}
