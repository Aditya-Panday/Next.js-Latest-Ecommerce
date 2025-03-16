import React from "react";
import Image from "next/image";
import { Star, Trash2 } from "lucide-react";
import { useDeleteTestimonialMutation } from "@/lib/features/adminApi/testimonialSlice";

const Testimonial = ({ data }) => {
  const [deleteTestimonial, { isLoading }] = useDeleteTestimonialMutation();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );
    if (confirmDelete) {
      try {
        const res = await deleteTestimonial(id);
        if (res.data?.status === 200) {
          alert("Testimonial deleted successfully");
        }
      } catch (error) {
        console.error("Error deleting Testimonial:", error);
        alert("Failed to delete Testimonial");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Tesimonials</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">Customer</th>
                <th className="py-2 px-4 border-b text-left">Message</th>
                <th className="py-2 px-4 border-b text-left">Rating</th>
                <th className="py-2 px-4 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((testimonial) => (
                <tr key={testimonial.id}>
                  <td className="py-2 px-4 border-b">#{testimonial.id}</td>
                  <td className="py-2 px-4 border-b flex items-center">
                    <Image
                      alt={`Profile picture of ${testimonial.name}`}
                      className="rounded-full w-10 h-10 mr-2"
                      height={40}
                      src={testimonial.pic}
                      width={40}
                    />
                    {testimonial.name}
                  </td>
                  <td
                    className="py-2 px-4 border-b max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
                    title={(testimonial.message)}
                  >
                    {testimonial.message}
                  </td>
                  <td className="py-2 px-4 border-b flex">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={` ${
                          index < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill={
                          index < testimonial.rating ? "currentColor" : "none"
                        }
                        stroke="currentColor"
                      />
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-sm transition-all duration-100 cursor-pointer hover:bg-red-100 hover:border hover:border-red-500"
                      disabled={isLoading}
                      onClick={() => handleDelete(testimonial.id)}
                      aria-label="Delete Testimonial"
                    >
                      <Trash2 className="text-red-500 hover:text-red-700" />
                    </button>
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
    </div>
  );
};

export default Testimonial;
