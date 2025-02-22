"use client";
import React from "react";

import { Plus, Trash, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "@/lib/features/counter/counter";

const Brands = ({ brands, itemsPerPage, handleItemsPerPageChange }) => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Counter: {count}</h1>
      <div className="flex">
        <button
          className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2 px-4 py-2 rounded-md my-3 mx-2"
          onClick={() => dispatch(increment())}
        >
          <span>Increment</span>
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2 px-4 py-2 rounded-md my-3"
          onClick={() => dispatch(decrement())}
        >
          <span>Decrement</span>
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2 px-4 py-2 rounded-md  my-3 mx-2"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          <span>Increment by 5</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-10 text-gray-800 ml-8">
        Brand Management
      </h1>
      <div className="container mx-auto ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="itemsPerPage"
              className="text-sm font-medium text-gray-700"
            >
              Items per page:
            </label>
            <div className="relative w-[100px]">
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange} // Added onChange handler
                className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white flex items-center space-x-2 px-4 py-2 rounded-md">
            <Plus className="h-4 w-4" />
            <span>Add Brand</span>
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-slate-950 text-slate-200">
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Created Date
                </th>
                <th className="py-3 px-4 text-right text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-sm font-medium">{brand.id}</td>
                  <td className="py-3 px-4 text-sm">{brand.name}</td>
                  <td className="py-3 px-4 text-sm">{brand.category}</td>
                  <td className="py-3 px-4 text-sm text-right">
                    <button className="bg-red-500 hover:bg-red-600 text-white  space-x-2 px-4 py-2 rounded-md mx-2">
                      <Trash className="h-4 w-4" />
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white  space-x-2 px-4 py-2 rounded-md mx-2">
                      <Pencil className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>

            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Brands;
