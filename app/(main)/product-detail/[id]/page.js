import ProductDetailPage from "@/components/ProductDetailPage/ProductDetailPage";
import React from "react";

const ProductPage = async ({ params }) => {
  const { id } = await params;

  return (

    <ProductDetailPage id={id} />
  );
};

export default ProductPage;
