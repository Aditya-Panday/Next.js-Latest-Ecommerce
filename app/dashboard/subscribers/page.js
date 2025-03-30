"use client";
import React, { useState } from "react";
import { useGetSubscriberQuery } from "@/lib/features/adminApi/subscriberSlice";
import Loader from "@/components/Loader";
import SubscribeSec from "@/components/AdminLayout/SubscribeSection/SubscribeSec";

const Page = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });

  const { data, isLoading } = useGetSubscriberQuery(filters);
  console.log(data);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SubscribeSec data={data} filters={filters} setFilters={setFilters} />
      )}
    </>
  );
};

export default Page;
