import ChartTree from "@/components/ChartTree/ChartTree";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-lg  bg-white p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-sm text-gray-500">Number of registered users</p>
          </div>
          <div>
            <p className="text-4xl font-bold">1,234</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg  bg-white p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Active Users</h2>
            <p className="text-sm text-gray-500">
              Users active in the last 30 days
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold">789</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg  bg-white p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="text-sm text-gray-500">Total revenue this month</p>
          </div>
          <div>
            <p className="text-4xl font-bold">₹12,345</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-lg  bg-white p-4">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Growth</h2>
            <p className="text-sm text-gray-500">
              User growth compared to last month
            </p>
          </div>
          <div>
            <p className="text-4xl font-bold">+15%</p>
          </div>
        </div>
      </div>

      {/* Data Analysis Section */}
      <div className="rounded-lg bg-white p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Data Analysis</h2>
          <p className="text-sm text-gray-500">
            Paginated table of sample data
          </p>
        </div>
        <div>
          {/* Add your table or data analysis component logic here */}
          <p className="text-gray-500">Data analysis content goes here.</p>
        </div>
      </div>
      <div>
        <ChartTree />
      </div>
    </div>
  );
};

export default Page;
