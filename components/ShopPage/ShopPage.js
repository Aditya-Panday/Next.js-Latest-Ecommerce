"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetMainProductDataQuery } from "@/lib/features/productApi/productMainSlice";
import { useGetFiltersDataQuery } from "@/lib/features/productFilters/productFilterSlice";
import CategoryPage from "./ShopPagesDesign";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    subcategory: [],
    priceBy: "",
    search: "",
    searchTerm: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    category: [],
    brand: [],
    subcategory: [],
    priceBy: "",
  });
  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    const getInitialFilters = () => {
      const category = searchParams.get("category")?.split(",") || [];
      const brand = searchParams.get("brand")?.split(",") || [];
      const subcategory = searchParams.get("subcategory")?.split(",") || [];
      const priceBy = searchParams.get("priceBy") || "";
      return { category, brand, subcategory, priceBy, search: "" };
    };

    const initial = getInitialFilters();
    setFilters(initial);
    setAppliedFilters(initial); // <-- Apply filters only on initial render
  }, [searchParams]);

  // 🔁 Debounce search input

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: filters.searchTerm }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [filters.searchTerm]);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const alreadySelected = prev[type].includes(value); // Check if the selected value is already present in the corresponding filter array
      return {
        ...prev, // Keep the rest of the filter values unchanged
        [type]: alreadySelected
          ? prev[type].filter((item) => item !== value) // If the value is already selected, remove it from the array (uncheck)
          : [...prev[type], value], // If it's not selected, add it to the array (check)
      };
    });
  };

  const applyFilters = () => {
    const query = new URLSearchParams();

    if (filters.category.length)
      query.set("category", filters.category.join(","));
    if (filters.brand.length) query.set("brand", filters.brand.join(","));
    if (filters.subcategory.length)
      query.set("subcategory", filters.subcategory.join(","));
    if (filters.priceBy) query.set("priceBy", filters.priceBy);

    router.push(`?${query.toString()}`);
    // Trigger API re-fetch
    setAppliedFilters({ ...filters });
    setRefetchKey((prev) => prev + 1);
  };

  // Fetch products based on filters
  // ✅ Use filters for actual API call
  const { data: productCollection, isLoading: isProdLoading } =
    useGetMainProductDataQuery(
      {
        category: appliedFilters.category.join(","),
        sub: appliedFilters.subcategory.join(","),
        brand: appliedFilters.brand.join(","),
        price: appliedFilters.priceBy,
        search: filters.search,
        page: 1,
        limit: 10,
      },
      {
        skip: !appliedFilters, // optional safety
        refetchOnMountOrArgChange: true, // force refetch if needed
        // 👇 this ensures re-fetch even if args don't change
        pollingInterval: 0, // avoid polling
        forceRefetch: true, // aggressive but ensures call
      }
    );
  // Fetch filters data..
  const { data: productFilters, isLoading: isFilterLoading } =
    useGetFiltersDataQuery();
  return (
    <CategoryPage
      productCollection={productCollection}
      isProdLoading={isProdLoading}
      productFilters={productFilters?.data}
      isFilterLoading={isFilterLoading}
      filters={filters}
      setFilters={setFilters}
      handleCheckboxChange={handleCheckboxChange}
      applyFilters={applyFilters}
    />
  );
};

export default ShopPage;
