"use client";
import React, { useState } from "react";
import AddProduct from "@/components/AdminLayout/ProductSections/AddProduct";
import { useGetCreateProductDataQuery } from "@/lib/features/adminApi/productsSlics";
import { sizesEnum } from "@/lib/constants/constantFunc";

const Page = () => {
  const { data, isLoading } = useGetCreateProductDataQuery("createData");

  const [formState, setFormState] = useState({
    product_name: "",
    description: "",
    price: "",
    discount: "",
    brand_name: "",
    image_url: [],
    category_name: "",
    sub_category: "",
    sizes: [],
    colors: [],
    status: 1,
  });

  const sizes = sizesEnum.map((size) => ({ value: size, label: size }));

  // Handle size selection
  const handleSizeSelect = (value) => {
    setFormState((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(value)
        ? prev.sizes.filter((size) => size !== value)
        : [...prev.sizes, value],
    }));
  };

  // Handle color addition
  const handleAddColor = () => {
    if (colorInput.trim() && !formState.colors.includes(colorInput.trim())) {
      setFormState((prev) => ({
        ...prev,
        colors: [...prev.colors, colorInput.trim()],
      }));
    }
    setColorInput("");
  };

  // Handle color removal
  const handleRemoveColor = (colorToRemove) => {
    setFormState((prev) => ({
      ...prev,
      colors: prev.colors.filter((color) => color !== colorToRemove),
    }));
  };

  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
  };
  return (
    <>
      <AddProduct
        createData={data}
        isCreateDataLoading={isLoading}
        formState={formState}
        setFormState={setFormState}
        sizes={sizes}
        handleSizeSelect={handleSizeSelect}
        handleAddColor={handleAddColor}
        handleRemoveColor={handleRemoveColor}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Page;
