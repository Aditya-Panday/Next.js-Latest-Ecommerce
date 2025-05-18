import React from "react";

const ReuseableSkelton = ({
  width = "80px",
  height = "16px",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-200 rounded animate-pulse ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default ReuseableSkelton;
// spinner skelton
{
  /* <div className="flex justify-center items-center h-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div> */
}
