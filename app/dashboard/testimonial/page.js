"use client";
import React, { useState } from "react";
import Testimonial from "@/components/AdminLayout/Testimonial/Testimonial";
const testimonial = [
  {
    id: 1,
    name: "Aditya",
    message: "Fantastic service!",
    star: 5,
    pic: "https://example.com/john.jpg",
    createdDate: "17/08/2002",
  },
  {
    id: 2,
    name: "Avinash",
    message: "Fantastic service!",
    star: 5,
    pic: "https://example.com/john.jpg",
    createdDate: "17/08/2002",
  },
  {
    id: 3,
    name: "Aman",
    message: "Fantastic service!",
    star: 5,
    pic: "https://example.com/john.jpg",
    createdDate: "17/08/2002",
  },
  {
    id: 4,
    name: "Ashish",
    message: "Fantastic service!",
    star: 5,
    pic: "https://example.com/john.jpg",
    createdDate: "17/08/2002",
  },
  // Add more brands as needed
];
const Page = () => {
  const [itemsPerPage, setItemsPerPage] = useState(5); // State to manage the value

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(e.target.value); // Update the state when the select value changes
  };

  return (
    <>
      <Testimonial
        testimonial={testimonial}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};

export default Page;
