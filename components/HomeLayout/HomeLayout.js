"use client";
import { useEffect, useState } from "react";
import { Menu, Bell, Heart, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DynamicProductCard from "../DynamicProductCard/DynamicProductCard";
import Footer from "./Footer";
import SubscribeNewsletter from "./SubscribeNewsletter";

const HomeLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const categories = [
    { name: "Wallets", image: "/cloths.jpg" },
    { name: "Shoes", image: "/cloths.jpg" },
    { name: "Jeans", image: "/cloths.jpg" },
    { name: "Shirts", image: "/cloths.jpg" },
    { name: "Accessories", image: "/cloths.jpg" },
    { name: "Watches", image: "/cloths.jpg" },
  ];
  const products = [
    {
      id: 0,
      name: "Classic T-Shirt",
      price: 299,
      image: "/cloths.jpg",
      discount: 999,
    },
    {
      id: 1,
      name: "Denim Jeans",
      price: 590,
      image: "/cloths.jpg",
      discount: 999,
    },
    {
      id: 2,
      name: "Leather Jacket",
      price: 199,
      image: "/shoes.jpg",
      discount: 999,
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 898,
      image: "/cloths.jpg",
      discount: 999,
    },
  ];
  useEffect(() => {
    if (isCartOpen || isMenuOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [isCartOpen, isMenuOpen]);
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
 
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMenuOpen(true)} className="p-2">
                <Menu className="h-6 w-6 text-black" />
              </button>
              <h1 className="text-2xl text-black  font-bold">
                <Link href="/" className=" text-black">
                  Dotfits
                </Link>
              </h1>
            </div>

            {/* Center Section - Navigation Links (Visible in Desktop) */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium hover:text-red-500 transition-colors text-black"
              >
                Home
              </Link>
              <Link
                href="shop"
                className="text-sm font-medium hover:text-red-500 transition-colors text-black"
              >
                Shop
              </Link>
              <Link
                href="category"
                className="text-sm font-medium hover:text-red-500 transition-colors text-black"
              >
                Categories
              </Link>
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2">
                <Heart className="h-5 w-5 text-black" />
              </button>
              <button className="p-2">
                <ShoppingCart
                  className="h-5 w-5 text-black"
                  onClick={() => setIsCartOpen(true)}
                />
              </button>
              <button className="p-2">
                <User className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Drawer */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="bg-white w-64 h-full p-4 shadow-lg text-black">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Menu</h3>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Order Tracking</h3>
                <input
                  placeholder="Order ID"
                  className="w-full p-2 border rounded"
                />
                <button className="w-full bg-gray-100 p-2 rounded">
                  Track Order
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Notifications</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Bell className="h-4 w-4" />
                  <span>No new notifications</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Support</h3>
                <button className="w-full bg-gray-100 p-2 rounded">
                  Contact Us
                </button>
                <button className="w-full bg-gray-100 p-2 rounded">FAQs</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-end"
          onClick={() => setIsCartOpen(false)}
        >
          <div className="bg-white w-64 h-full p-4 shadow-lg text-black">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">My Cart</h3>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="pt-16">
        <section className="relative h-[70vh] bg-theme-50">
          <div className="container h-full flex items-center">
            <div className="max-w-2xl space-y-6 z-10">
              <h1 className="text-6xl font-bold">Summer Collection 2024</h1>
              <p className="text-xl text-gray-600">
                Discover our latest arrivals and trending styles
              </p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Shop Now
              </button>
            </div>
          </div>
          <div className="absolute inset-0 banner-gradient" />
        </section>
      </main>
      {/* Banner */}
      <div className="container mx-auto px-4 py-8 bg-white ">
        <main className="pt-16">
          <section className="mb-12">
            <div
              className="relative h-[400px] overflow-hidden "
              style={{ borderRadius: "24px" }}
            >
              <Image
                alt="Banner"
                src="/banner2.jpg"
                width={100}
                height={100}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <h1 className="text-4xl font-bold text-white">
                  Welcome to DotFits
                </h1>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Categories */}
      <section className="py-16 bg-white text-black">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="category-scroll flex gap-6 overflow-x-auto pb-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex-none w-32 text-center space-y-4"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden bg-theme-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={1200}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Men's Section */}

      <section className="py-16 text-black" style={{ background: "#fdf8f6" }}>
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Men&apos;s Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <DynamicProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Section */}
      <section className="py-16 bg-white text-black">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Women&apos;s Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <DynamicProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Newsletter */}
      <SubscribeNewsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeLayout;
