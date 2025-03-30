"use client";
import React, { useState } from "react";
import { useGetTestimonialQuery } from "@/lib/features/adminApi/testimonialSlice";
import Loader from "@/components/Loader";
import Testimonial from "@/components/AdminLayout/Testimonial/Testimonial";

const Page = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });

  const { data, isLoading } = useGetTestimonialQuery(filters);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Testimonial data={data} filters={filters} setFilters={setFilters} />
      )}
    </>
  );
};

export default Page;
