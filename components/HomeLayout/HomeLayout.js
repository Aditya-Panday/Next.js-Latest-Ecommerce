"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";
import MenuSidebar from "./MenuSidebar";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "@/lib/features/cartData/cartSlice";
import { selectMounted, setMounted } from "@/lib/features/mounted/mountedSlice";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname(); 
  const [state, setState] = useState({
    isMenuOpen: false,
    isCartOpen: false,
  });
  const cartItems = useSelector(selectCartItems);
  const hasMounted = useSelector(selectMounted);

  useEffect(() => {
    dispatch(setMounted(true));
  }, [dispatch]);

  useEffect(() => {
    if (state.isCartOpen || state.isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [state.isCartOpen, state.isMenuOpen]);

  // Function to update state
  const toggleState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  // Function to check if a route is active
  const isActive = (route) => pathname === route;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleState("isMenuOpen", true)}
                className="p-2"
              >
                <Menu className="h-6 w-6 text-black" />
              </button>
              <h1 className="text-2xl text-black font-bold">
                <Image
                  src="/Dotfits-logo.png"
                  alt="logo"
                  width={180}
                  height={100}
                  priority
                  style={{ width: "auto", height: "auto" }} // ensures correct aspect ratio
                />
              </h1>
            </div>

            {/* Center Section - Navigation Links (Visible in Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  isActive("/") ? "text-red-500" : "text-black"
                }`}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className={`text-sm font-medium transition-colors hover:text-red-500 ${
                  isActive("/shop") ? "text-red-500" : "text-black"
                }`}
              >
                Shop
              </Link>
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2">
                <Heart className="h-5 w-5 text-black hover:text-red-500" />
              </button>
              <button
                className="p-2 relative"
                onClick={() => toggleState("isCartOpen", true)}
              >
                <ShoppingCart className="h-5 w-5 text-black hover:text-red-500" />
                {hasMounted && cartItems.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center "
                    style={{ minWidth: 20, minHeight: 20 }}
                  >
                    {cartItems?.length}
                  </span>
                )}
              </button>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="p-2">
                    <User className="h-5 w-5 text-black hover:text-red-500" />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSwitchSessionUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      {state.isMenuOpen && (
        <MenuSidebar
          setIsMenuOpen={(value) => toggleState("isMenuOpen", value)}
        />
      )}
      {state.isCartOpen && (
        <CartSidebar
          setIsCartOpen={(value) => toggleState("isCartOpen", value)}
        />
      )}

      <main className="pt-16">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
