"use client";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ReuseableSkelton from "../DynamicProductCard/ReuseableSkelton";
import ProductCardSkeleton from "../DynamicProductCard/ProductCardSkelton";
import DynamicProductCard from "../DynamicProductCard/DynamicProductCard";

export default function CategoryPage({
  productCollection,
  isProdLoading,
  productFilters,
  isFilterLoading,
  filters,
  setFilters,
  handleCheckboxChange,
  applyFilters,
}) {
  // State for filters
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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
              value={filters.searchTerm || ""} 
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  searchTerm: e.target.value,
                }))
              }
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
              {isFilterLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <ReuseableSkelton
                    key={i}
                    width="170px"
                    height="35px"
                    className="rounded-lg my-4"
                  />
                ))
              ) : (
                <>
                  {/* Brand Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-3">Brands</h3>
                    <div className="space-y-2">
                      {productFilters?.brands?.map((brand) => (
                        <div key={brand} className="flex items-center">
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={filters.brand.includes(brand)}
                            onCheckedChange={() =>
                              handleCheckboxChange("brand", brand)
                            }
                          />
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

                  {/* Gender Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-3">Gender</h3>
                    <div className="space-y-2">
                      {productFilters?.categories?.map((category, index) => (
                        <div key={index} className="flex items-center">
                          <Checkbox
                            id={`category-${category}`}
                            checked={filters.category.includes(category)}
                            onCheckedChange={() =>
                              handleCheckboxChange("category", category)
                            }
                          />{" "}
                          <label
                            htmlFor={`gender-${category}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="text-md font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {productFilters?.subCategories?.map(
                        (subCategory, index) => (
                          <div key={index} className="flex items-center">
                            <Checkbox
                              id={`subcategory-${subCategory}`}
                              checked={filters.subcategory.includes(
                                subCategory
                              )}
                              onCheckedChange={() =>
                                handleCheckboxChange("subcategory", subCategory)
                              }
                            />{" "}
                            <label
                              htmlFor={`category-${subCategory}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {subCategory}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
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
                <h3 className="text-md font-medium mb-3">Brands</h3>
                <div className="space-y-2">
                  {productFilters?.brands?.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brand.includes(brand)}
                        onCheckedChange={() =>
                          handleCheckboxChange("brand", brand)
                        }
                      />
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
              {/* Gender Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Gender</h3>
                <div className="space-y-2">
                  {productFilters?.categories?.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.category.includes(category)}
                        onCheckedChange={() =>
                          handleCheckboxChange("category", category)
                        }
                      />{" "}
                      <label
                        htmlFor={`gender-${category}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {productFilters?.subCategories?.map((subCategory, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox
                        id={`subcategory-${subCategory}`}
                        checked={filters.subcategory.includes(subCategory)}
                        onCheckedChange={() =>
                          handleCheckboxChange("subcategory", subCategory)
                        }
                      />
                      <label
                        htmlFor={`category-${subCategory}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {subCategory}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1">
                  Reset
                </Button>
                <Button className="flex-1 md:hidden" onClick={applyFilters}>
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
              Showing {productCollection?.products?.length} of {"products"}
            </p>
            <div className=" flex gap-3">
              <select
                className="text-sm border rounded-md p-2"
                value={filters.priceBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, priceBy: e.target.value }))
                }
              >
                <option value="">Sort by: Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <Button className="" size="sm" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4 gap-6">
            {isProdLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            ) : productCollection?.products?.length === 0 ? (
              <div className="col-span-full text-center text-amber-800 text-2xl font-semibold mt-10">
                No Products Found
              </div>
            ) : (
              productCollection.products.map((product) => (
                <DynamicProductCard
                  key={product.product_id}
                  product={product}
                />
              ))
            )}
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
