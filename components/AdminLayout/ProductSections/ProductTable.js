import React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ProductTable = ({ data, formState, setFormState }) => {

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative mb-4 md:mb-0">
            <input
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full md:w-64"
              placeholder="Search by order id"
              type="text"
              value={formState.id}
              onChange={(e) => setFormState({ ...formState, id: e.target.value })}
            />
            <Search
              className="fas fa-search absolute left-3 top-3 text-gray-400"
              size={18}
            />
          </div>
          <div>
            <select
              className="border border-gray-300 rounded-lg py-2 px-4 mx-2"
              value={formState.status ?? ""}
              onChange={(e) => setFormState({ ...formState, status: e.target.value })}
            >
              <option value="">Select Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            <select
              className="border border-gray-300 rounded-lg py-2 px-4 mx-2 "
              value={formState.stock ?? ""}
              onChange={(e) => setFormState({ ...formState, stock: e.target.value })}
            >
              <option value="">Stock Status</option>
              <option value="1">InStock</option>
              <option value="0">Out of stock</option>
            </select>

          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-4 text-left">Product ID</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Final Price</th>
                <th className="py-2 px-4 text-left">Discount</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Stock</th>
                <th className="py-2 px-4 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product, index) => (
                <tr key={index} >
                  <td className="py-2 px-4 border-b text-left">{product.product_id}</td>
                  <td className="py-2 px-4 border-b text-left">{product.product_name}</td>
                  <td className="py-2 px-4 border-b text-left">
                    {product.image_url[0] ? (
                      <Image
                        src={product.image_url[0]}
                        alt="Product"
                        width={48}
                        height={48}
                        priority
                        sizes="48px"   // ✅ Add this
                        className="object-cover rounded"
                      />
                      // <Image
                      //   src={product.image_url[0]}
                      //   alt="Product"
                      //   width={48}
                      //   height={48}
                      //   sizes="48px"
                      //   priority
                      //   placeholder="blur"
                      //   blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAocB9WzRa3cAAAAASUVORK5CYII="
                      //   className="object-cover rounded"
                      // />

                    ) : (
                      <span>No Image</span> // You can also show a default image here if needed
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-left">{product.final_price}</td>
                  <td className="py-2 px-4 border-b text-left">{product.discount}</td>
                  <td className="py-2 px-4 border-b text-left">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded ${product.status === 1
                        ? "bg-green-200 text-green-500"
                        : "bg-red-200 text-red-500"
                        }`}
                    >
                      {product.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded ${product.stocks === 1
                        ? "bg-green-200 text-green-500"
                        : "bg-red-200 text-red-500"
                        }`}
                    >
                      {product.stocks === 1 ? "InStock" : "Out of stock"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-left">
                    <Link href={`/dashboard/products/editproduct/${product.product_id}`} >
                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400" >
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="text-gray-500 mb-4 md:mb-0">
            Showing 10 items of 120
          </div>
          <div className="flex items-center space-x-1">
            <nav
              className="flex items-center -space-x-px"
              aria-label="Pagination"
            >
              <button
                type="button"
                className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                aria-label="Previous"
              >
                <ChevronLeft className="shrink-0 size-3.5" />

                <span className="sr-only">Previous</span>
              </button>
              <button
                type="button"
                className="min-h-9.5 min-w-9.5 flex justify-center items-center bg-gray-200 text-gray-800 border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:border-neutral-700 dark:text-white dark:focus:bg-neutral-500"
                aria-current="page"
              >
                1
              </button>
              <button
                type="button"
                className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              >
                2
              </button>
              <button
                type="button"
                className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              >
                3
              </button>
              <div className="hs-tooltip inline-block border border-gray-200 dark:border-neutral-700">
                <button
                  type="button"
                  className="hs-tooltip-toggle group min-h-9 min-w-9 flex justify-center items-center text-gray-400 hover:text-blue-600 p-2 text-sm focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:bg-white/10"
                >
                  <span className="group-hover:hidden text-xs">•••</span>
                  <svg
                    className="group-hover:block hidden shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 17 5-5-5-5"></path>
                    <path d="m13 17 5-5-5-5"></path>
                  </svg>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded-md shadow-2xs dark:bg-neutral-700"
                    role="tooltip"
                  >
                    Next 4 pages
                  </span>
                </button>
              </div>
              <button
                type="button"
                className="min-h-9.5 min-w-9.5 flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
              >
                8
              </button>
              <button
                type="button"
                className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                aria-label="Next"
              >
                <span className="sr-only">Next</span>
                {/* <ArrowRight className="shrink-0 size-3.5" /> */}
                <ChevronRight className="shrink-0 size-3.5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
