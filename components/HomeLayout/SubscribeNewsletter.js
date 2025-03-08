import React from "react";

const SubscribeNewsletter = () => {
  return (
    <section
      className="mb-12  p-8 rounded-lg text-black"
      style={{ background: "#f3f4f6" }}
    >
      <h2 className="mb-4 text-2xl font-bold text-center">
        Subscribe to Our Newsletter
      </h2>
      <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-500 
               focus:outline-none   focus:border-gray-500"
          style={{ borderRadius: "5px" }}
        />
        <button
          type="submit"
          className="h-10 px-4 py-2 bg-slate-950 text-white font-medium rounded-md transition-all 
               hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 hover:scale-110 hover:rotate-2"
          style={{ borderRadius: "5px" }}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default SubscribeNewsletter;
