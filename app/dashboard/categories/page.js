"use client";
import React, { useState } from "react";
import Subcategories from "@/components/AdminLayout/Subcategories/Subcategories";

const page = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5); // State to manage the value
  const brands = [
    { id: 1, name: "Trouser", category: "17/08/2002" },
    { id: 2, name: "Jeans", category: "17/08/2002" },
    { id: 3, name: "Shirt", category: "17/08/2002" },
    { id: 4, name: "Pants", category: "17/08/2002" },
    { id: 5, name: "Jacket", category: "17/08/2002" },
  ];
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(e.target.value); // Update the state when the select value changes
  };
  return (
    <>
      <Subcategories
        brands={brands}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default page;
