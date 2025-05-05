import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

const DynamicProductCard = ({ product }) => {
  console.log("product", product)
  return (
    <div className="relative m-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        href={`/product-detail/${product.product_id}`}
        className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-xl"
      >
        <Image
          className="object-cover w-full h-full"
          src={product.image_url[0]}
          alt="product image"
          width={500}
          height={500}
        />
        {product?.discount > 0 && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {product.discount}% OFF
          </span>
        )}

      </Link>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl tracking-tight text-slate-900">
          {product.product_name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900 ">
              ₹{product.final_price}
            </span>
            {product?.discount > 0 && (
              <span className="text-sm text-slate-900 line-through ml-2  ">
                ₹{product.price}
              </span>
            )}

          </p>
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < 3 ? "text-yellow-300" : "text-gray-300"
                    }`} // First 3 stars yellow, others gray
                  fill={i < 3 ? "currentColor" : "none"}
                />
              ))}
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <Heart />
          <Link
            href={`/product-detail/${product.product_id}`}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <ShoppingCart className="mr-2 h-6 w-6" />
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DynamicProductCard;
