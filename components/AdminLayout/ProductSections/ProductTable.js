import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Image from "next/image";

const ProductTable = () => {
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
            />
            <Search
              className="fas fa-search absolute left-3 top-3 text-gray-400"
              size={18}
            />
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <select className="border border-gray-300 rounded-lg py-2 px-4 mx-2">
              <option>Delivered</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ORDER ID</th>
                <th className="py-2 px-4 border-b">CUSTOMER</th>
                <th className="py-2 px-4 border-b">QTY</th>
                <th className="py-2 px-4 border-b">TOTAL</th>
                <th className="py-2 px-4 border-b">STATUS</th>
                <th className="py-2 px-4 border-b">DATE</th>
                <th className="py-2 px-4 border-b">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">#479063DR</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <Image
                    alt="Profile picture of William Watson"
                    className="rounded-full w-10 h-10 mr-2"
                    height="40"
                    src="https://storage.googleapis.com/a1aa/image/pYF3oQf8tnUqw5tz1rKeo52Ma_9LPfyVY4iGwJZBwZw.jpg"
                    width="40"
                  />
                  William Watson
                </td>
                <td className="py-2 px-4 border-b">2</td>
                <td className="py-2 px-4 border-b">$171.00</td>
                <td className="py-2 px-4 border-b">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Delivered
                  </span>
                </td>
                <td className="py-2 px-4 border-b">16 Jan, 2023</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">#19893507</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <Image
                    alt="Profile picture of Shahnewaz Sakil"
                    className="rounded-full w-10 h-10 mr-2"
                    height="40"
                    src="https://storage.googleapis.com/a1aa/image/Qt908vh3u9lf3uuIZT0RcfL3UTmrdMjCiJOu_DFlW1E.jpg"
                    width="40"
                  />
                  Shahnewaz Sakil
                </td>
                <td className="py-2 px-4 border-b">5</td>
                <td className="py-2 px-4 border-b">$1044.00</td>
                <td className="py-2 px-4 border-b">
                  <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Denied
                  </span>
                </td>
                <td className="py-2 px-4 border-b">18 Feb, 2023</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">#26BC663E</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <Image
                    alt="Profile picture of Bootstrap Turner"
                    className="rounded-full w-10 h-10 mr-2"
                    height="40"
                    src="https://storage.googleapis.com/a1aa/image/gbchNiOmyi_etIZvZeHkzNCLfaTqV7yfqAfqk1h52OE.jpg"
                    width="40"
                  />
                  Bootstrap Turner
                </td>
                <td className="py-2 px-4 border-b">7</td>
                <td className="py-2 px-4 border-b">$542.00</td>
                <td className="py-2 px-4 border-b">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Refunded
                  </span>
                </td>
                <td className="py-2 px-4 border-b">25 Jan, 2023</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">#373F9567</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <Image
                    alt="Profile picture of Robert Downy"
                    className="rounded-full w-10 h-10 mr-2"
                    height="40"
                    src="https://storage.googleapis.com/a1aa/image/7OR4HSVA38ud8sJGaOP-Swi-4ZQVre9OL27gHgnbTbU.jpg"
                    width="40"
                  />
                  Robert Downy
                </td>
                <td className="py-2 px-4 border-b">15</td>
                <td className="py-2 px-4 border-b">$1450.00</td>
                <td className="py-2 px-4 border-b">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Pending
                  </span>
                </td>
                <td className="py-2 px-4 border-b">10 Feb, 2023</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">#AD6ACDB9</td>
                <td className="py-2 px-4 border-b flex items-center">
                  <Image
                    alt="Profile picture of Dr. Stephene"
                    className="rounded-full w-10 h-10 mr-2"
                    height="40"
                    src="https://storage.googleapis.com/a1aa/image/Q1Xo0ErLuQj7L9dwyoe_0kpbHYCB7dk3unv17YzKH7o.jpg"
                    width="40"
                  />
                  Dr. Stephene
                </td>
                <td className="py-2 px-4 border-b">1</td>
                <td className="py-2 px-4 border-b">$540.00</td>
                <td className="py-2 px-4 border-b">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    Delivered
                  </span>
                </td>
                <td className="py-2 px-4 border-b">24 Jan, 2023</td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    View Details
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
