"use client";
import { useState } from "react";
import Brands from "@/components/AdminLayout/Brands/Brands";

// Mock data for brands
const brands = [
  { id: 1, name: "Nike", category: "17/08/2002", founded: 1964 },
  { id: 2, name: "Armani", category: "17/08/2002", founded: 1976 },
  { id: 3, name: "Roadster", category: "17/08/2002", founded: 1886 },
  { id: 4, name: "Louis Vuitton", category: "17/08/2002", founded: 1994 },
  { id: 5, name: "Zara", category: "17/08/2002", founded: 1937 },
  // Add more brands as needed
];
const Page = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5); // State to manage the value

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(e.target.value); // Update the state when the select value changes
  };
  return (
    <>
      <Brands
        brands={brands}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default Page;
