"use client";
import React, { useState } from "react";
import { useGetMainProductDataQuery } from "@/lib/features/productApi/productMainSlice";
import { useGetFiltersDataQuery } from "@/lib/features/productFilters/productFilterSlice";
import CategoryPage from "@/components/ShopPage/ShopPagesDesign";
import HomeLayout from "@/components/HomeLayout/HomeLayout";

const Shop = () => {
  const { data: productCollection, isLoading: isProdLoading } =
    useGetMainProductDataQuery({
      category: "",
      brand: "",
      page: 1,
      limit: 10,
      sort: "",
    });
  const { data: productFilters, isLoading: isFilterLoading } =
    useGetFiltersDataQuery();
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    subcategory: [],
    priceBy: "",
  });
  console.log("filters", filters);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[type].includes(value);    // Check if the selected value is already present in the corresponding filter array
      return {
        ...prev,// Keep the rest of the filter values unchanged
        [type]: alreadySelected
          ? prev[type].filter((item) => item !== value)        // If the value is already selected, remove it from the array (uncheck)
          : [...prev[type], value],        // If it's not selected, add it to the array (check)
      };
    });
  };  

  return (
    <HomeLayout>
      <CategoryPage
        productCollection={productCollection}
        isProdLoading={isProdLoading}
        productFilters={productFilters?.data}
        isFilterLoading={isFilterLoading}
        filters={filters}
        handleCheckboxChange={handleCheckboxChange}
      />
    </HomeLayout>
  );
};

export default Shop;
