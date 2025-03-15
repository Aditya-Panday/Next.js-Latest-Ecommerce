'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";
import { useDeleteBrandMutation } from "@/lib/features/adminApi/brandSlice";

const Brands = ({ data, filters, setFilters }) => {
  const [brandModal, setBrandModal] = useState(false);

  const [deleteBrand, { isLoading }] = useDeleteBrandMutation(); // Use delete mutation

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this brand?"
    );
    if (confirmDelete) {
      try {
        const res = await deleteBrand(id);
        if (res.data.status === 200) {
          alert("Brand deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting brand:", error);
        alert("Failed to delete brand");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Brands Section</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative mb-4 md:mb-0">
            <input
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full md:w-64"
              placeholder="Search by brand name..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              type="text"
            />
            <Search
              size={18}
              className="fas fa-search absolute left-3 top-3 text-gray-400"
            />
          </div>
          <div className="flex">
            <label htmlFor="status-filter" className="sr-only">
              Select Status
            </label>
            <select
              className="border border-gray-300 rounded-lg py-2 px-4 mx-2"
              value={filters.status ?? ""} // Handle null case
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <Button className="w-full" onClick={() => setBrandModal(true)}>
              Add Brand
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">STATUS</th>
                <th className="py-2 px-4 border-b text-left">DATE</th>
                <th className="py-2 px-4 border-b text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((brand) => (
                <tr key={brand.id}>
                  <td className="py-2 px-4 border-b">#{brand.id}</td>
                  <td className="py-2 px-4 border-b">{brand.name}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        brand.status === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {brand.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(brand.created_date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-100 cursor-pointer hover:bg-red-100 hover:border hover:border-red-500"
                      disabled={isLoading} // Disable button while deleting
                    >
                      <Trash2
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(brand.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="text-gray-500 mb-4 md:mb-0">
            Showing 10 items of 120
          </div>
          <div className="flex items-center space-x-1">
            <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
              &lt;
            </button>
            <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
              1
            </button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-full">
              3
            </button>
            <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
              4
            </button>
            <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          brandModal == true ? "" : "hidden"
        }`}
        id="modal"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-slate-700 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 "
                    id="modal-title"
                  >
                    Add Product
                  </h3>
                  <hr className="my-4" />
                  <div className="mt-2">
                    <input
                      className="border border-gray-300 rounded-lg w-full py-2 px-4 mb-4"
                      placeholder="Product Name"
                      type="text"
                    />

                    <input
                      className="border border-gray-300 rounded-lg w-full py-2 px-4 mb-4"
                      placeholder="Price"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setBrandModal(false)}
              >
                Save
              </button>
              <button
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setBrandModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
