"use client";

import { useState } from "react";
// import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, SlidersHorizontal, X } from "lucide-react";
import DynamicProductCard from "../DynamicProductCard/DynamicProductCard";
import ProductCardSkeleton from "../DynamicProductCard/ProductCardSkelton";

export default function CategoryPage({ productCollection, isProdLoading }) {
  // State for filters
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const productsData = [
    {
      id: 0,
      name: "Classic T-Shirt",
      price: 299,
      image: "/cloths.jpg",
      discount: 999,
      gender: "Womens",
      brand: "ComfortPlus",
    },
    {
      id: 1,
      name: "Denim Jeans",
      price: 590,
      image: "/cloths.jpg",
      discount: 999,
      gender: "Mens",
      brand: "ComfortPlus",
    },
    {
      id: 2,
      name: "Leather Jacket",
      price: 199,
      image: "/shoes.jpg",
      discount: 999,
      gender: "Unisex",
      brand: "TechVision",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 898,
      image: "/cloths.jpg",
      discount: 999,
      gender: "Unisex",
      brand: "SoundMaster",
    },
  ];
  // Available brands and ratings for filters
  const brands = Array.from(
    new Set(productsData.map((product) => product.brand))
  );
  const ratings = [5, 4, 3, 2, 1];
  const genders = ["Mens", "Womens", "Kids"];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with search and mobile filter toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Shop All Products</h1>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <SlidersHorizontal size={18} />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar filters - desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-4 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" className="text-sm">
                  Reset All
                </Button>
              </div>


              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox id={`brand`} />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {ratings.map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox id={`rating`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="ml-2 text-sm font-medium leading-none flex items-center"
                      >
                        {Array(rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        {Array(5 - rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} size={16} className="text-gray-300" />
                          ))}
                        <span className="ml-1">& Up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Gender</h3>
                <div className="space-y-2">
                  {genders.map((gender) => (
                    <div key={gender} className="flex items-center">
                      <Checkbox id={`gender-`} />
                      <label
                        htmlFor={`gender-${gender}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile filters sidebar */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-80 bg-background p-4 overflow-y-auto">
              <div className="flex justify-between items-center ">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>
              <hr className="mb-6 font-semibold" />

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox id={`mobile-brand`} />
                      <label
                        htmlFor={`mobile-brand-${brand}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {ratings.map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox id={`mobile-rating`} />
                      <label
                        htmlFor={`mobile-rating-${rating}`}
                        className="ml-2 text-sm font-medium leading-none flex items-center"
                      >
                        {Array(rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        {Array(5 - rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} size={16} className="text-gray-300" />
                          ))}
                        <span className="ml-1">& Up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Gender</h3>
                <div className="space-y-2">
                  {genders.map((gender) => (
                    <div key={gender} className="flex items-center">
                      <Checkbox id={`mobile-gender`} />
                      <label
                        htmlFor={`mobile-gender`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1">
                  Reset
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {/* Results summary */}
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing 10
              {"products"}
            </p>
            <div className="hidden md:block">
              <select className="text-sm border rounded-md p-2">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {/* Product grid */}
          {/* {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8)
                .fill(0)
                .map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters or search query
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : ( */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4 gap-6">
            {isProdLoading
              ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : productCollection?.products?.map((product) => (
                <DynamicProductCard key={product.product_id} product={product} />
              ))}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
