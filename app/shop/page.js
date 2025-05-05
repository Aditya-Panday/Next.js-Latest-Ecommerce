'use client'
import HomeLayout from "@/components/HomeLayout/HomeLayout";
import CategoryPage from "@/components/ShopPage/ShopPagesDesign";
import { useGetMainProductDataQuery } from "@/lib/features/productApi/productMainSlice";
import React from "react";

const Shop = () => {
  const {
    data: productCollection,
    isLoading: isProdLoading,
  } = useGetMainProductDataQuery({
    category: "",
    brand: "",
    page: 1,
    limit: 10,
    sort: "",
  });


  return (
    <HomeLayout>
      <CategoryPage productCollection={productCollection} isProdLoading={isProdLoading} />
    </HomeLayout>
  );
};

export default Shop;
