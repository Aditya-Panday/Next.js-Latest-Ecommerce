"use client";
import { useState } from "react";
import { useGetBrandsQuery } from "@/lib/features/adminApi/brandSlice";
import Loader from "@/components/Loader";
import Subcategories from "@/components/AdminLayout/Subcategories/Subcategories";
import { useGetSubcategoryQuery } from "@/lib/features/adminApi/subcategorySlice";

const Page = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    status: null,
  });

  const { data, isLoading } = useGetSubcategoryQuery(filters);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Subcategories data={data} filters={filters} setFilters={setFilters} />
      )}
    </>
  );
};

export default Page;
