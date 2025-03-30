import React from "react";

const SubscribeSec = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Subscribers</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">ID</th>
                <th className="py-2 px-4 border-b text-left">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((subscribers) => (
                <tr key={subscribers.id}>
                  <td className="py-2 px-4 border-b">#{subscribers.id}</td>
                  <td className="py-2 px-4 border-b">{subscribers.email}</td>

                  <td className="py-2 px-4 border-b">
                    {new Date(subscribers.subscribe_date).toLocaleDateString()}
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

export default SubscribeSec;
