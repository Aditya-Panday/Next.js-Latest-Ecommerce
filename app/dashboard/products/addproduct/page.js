"use client";
import React, { useRef, useState } from "react";
import AddProduct from "@/components/AdminLayout/ProductSections/AddProduct";
import { useAddProductMutation, useGetCreateProductDataQuery } from "@/lib/features/adminApi/productsSlics";
import { sizesEnum } from "@/lib/constants/constantFunc";
import { productSchema } from "@/utils/zodSchemas";
import { toast } from 'react-toastify';

const Page = () => {
  const { data, isLoading } = useGetCreateProductDataQuery({
    type: "createData"
  });
  const clearImagesRef = useRef(null);
  const [addProduct, { isLoadingData }] = useAddProductMutation();
  const [formState, setFormState] = useState({
    product_name: "",
    description: "",
    price: 0,
    discount: 0,
    brand_name: "",
    image_url: [],
    category_name: "",
    sub_category: "",
    sizes: [],
    colors: [],
    status: "1",
    errors: {},
    stock: "1",
  });

  // console.log("fm", formState)
  const sizes = sizesEnum.map((size) => ({ value: size, label: size }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("validation test");
    const validationResult = productSchema.safeParse(formState)
    if (!validationResult.success) {
      const newErrors = {};
      validationResult.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });

      setFormState((prev) => ({ ...prev, errors: newErrors }));
      return;
    }

    // Clear previous errors
    setFormState((prev) => ({ ...prev, errors: {} }));

    try {
      const result = await addProduct(formState).unwrap(); // .unwrap() will throw if error
      // console.log("API success:", result);
      toast.success("Product added successfully.", {
        autoClose: 2000,
      });
      setFormState({
        product_name: "",
        description: "",
        price: 0,
        discount: 0,
        brand_name: "",
        image_url: [],
        category_name: "",
        sub_category: "",
        sizes: [],
        colors: [],
        status: "1",
        errors: {},
        stock: "1",
      });
      if (clearImagesRef.current) {
        clearImagesRef.current();
      }

      // Optionally, reset form here
    } catch (err) {
      console.error("API error:", err);
      const errorMessage = err.message ? err.message : "Failed to create product";
      toast.error(errorMessage, {
        autoClose: 1500,
      });
    }
  };



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


  // Handle color removal
  const handleRemoveColor = (colorToRemove) => {
    setFormState((prev) => ({
      ...prev,
      colors: prev.colors.filter((color) => color !== colorToRemove),
    }));
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
        handleRemoveColor={handleRemoveColor}
        handleSubmit={handleSubmit}
        isLoadingData={isLoadingData}
        clearImages={(clearFn) => (clearImagesRef.current = clearFn)}
      />
    </>
  );
};

export default Page;
