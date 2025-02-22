"use client";
import { useState } from "react";
import Maincategories from "@/components/AdminLayout/Maincategories/Maincategories";
const main = [
  { id: 1, name: "Male", category: "17/08/2002", founded: 1964 },
  { id: 2, name: "Female", category: "17/08/2002", founded: 1976 },
  { id: 3, name: "Others", category: "17/08/2002", founded: 1886 },
  // Add more brands as needed
];
const Page = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5); // State to manage the value

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(e.target.value); // Update the state when the select value changes
  };
  return (
    <>
      <Maincategories
        main={main}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default Page;
