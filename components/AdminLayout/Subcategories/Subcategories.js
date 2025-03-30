import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";
import AddBrand from "../AdminModals/AddBrand";
import { useDeleteSubcategoryMutation } from "@/lib/features/adminApi/subcategorySlice";
import AddSubcategory from "../AdminModals/AddSubcategory";

const Subcategories = ({ data, filters, setFilters }) => {
  const [subModal, setSubModal] = useState(false);
  const [deleteSub, { isLoading }] = useDeleteSubcategoryMutation();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subcategory?"
    );
    if (confirmDelete) {
      try {
        const res = await deleteSub(id);
        if (res.data.status === 200) {
          alert("Subcategory deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting subcategory:", error);
        alert("Failed to delete subcategory");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Subcategories Section</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="relative mb-4 md:mb-0">
            <input
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full md:w-64"
              placeholder="Search by name..."
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
              value={filters.status ?? ""}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>

            <Button className="w-full" onClick={() => setSubModal(true)}>
              Add Subcategory
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
              {data?.data?.map((sub) => (
                <tr key={sub.id}>
                  <td className="py-2 px-4 border-b">#{sub.id}</td>
                  <td className="py-2 px-4 border-b">{sub.name}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        sub.status === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {sub.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-100 cursor-pointer hover:bg-red-100 hover:border hover:border-red-500"
                      disabled={isLoading}
                    >
                      <Trash2
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(sub.id)}
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
      <AddSubcategory setSubModal={setSubModal} subModal={subModal} />
    </div>
  );
};

export default Subcategories;
