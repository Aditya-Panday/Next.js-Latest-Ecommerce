"use client";
import { useState } from "react";
import Brands from "@/components/AdminLayout/Brands/Brands";
import { useGetBrandsQuery } from "@/lib/features/adminApi/brandSlice";
import Loader from "@/components/Loader";

const Page = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
    search: "",
    status: null,
  });

  const { data, isLoading } = useGetBrandsQuery(filters);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Brands data={data} filters={filters} setFilters={setFilters} />
      )}
    </>
  );
};

export default Page;
