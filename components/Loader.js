import React from "react";

const Loader = () => {
  return (
    <div className="warapper w-full h-full flex justify-center place-items-center">
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
      </div>
    </div>
  );
};

export default Loader;
