"use client";

import React, { useState } from "react";
import ProductTable from "@/components/AdminLayout/ProductSections/ProductTable";
import { useGetCreateProductDataQuery } from "@/lib/features/adminApi/productsSlics";
import Loader from "@/components/Loader";

const Product = () => {
  const [formState, setFormState] = useState({
    id: "",
    status: "",
    stock: "",
    page: "1",
    limit: "10",
  });
  const { data, isLoading } = useGetCreateProductDataQuery({
    type: "getProducts",
    id: formState.id,
    status: formState.status,
    stock: formState.stock,
    page: formState.page,
    limit: formState.limit,
  });


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductTable
          data={data}
          formState={formState}
          setFormState={setFormState}
        />
      )}
    </>
  );
};

export default Product;
