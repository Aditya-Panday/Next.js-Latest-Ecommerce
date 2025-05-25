import HomeLayout from "@/components/HomeLayout/HomeLayout";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <HomeLayout>
      <div className="flex justify-center items-center relative min-h-screen">
        <div className="absolute left-0 top-0 h-full w-20 bg-[#1ca9cc] clip-left"></div>
        <div className="absolute right-0 top-0 h-full w-20 bg-[#1ca9cc] clip-right"></div>

        <div className="text-center max-w-xl px-4">
          <p className="text-[#1ca9cc] text-xs tracking-widest mb-1 font-semibold">
            E R R O R
          </p>
          <h1 className="text-[#1ca9cc] font-extrabold text-[8rem] leading-none -tracking-[0.03em]">
            404
          </h1>
          <h2 className="font-extrabold text-2xl mb-1">Page Not Found</h2>
          <p className="text-xs mb-2">
            Sorry, but the page that you requested{" "}
            <span className="font-semibold">DOESN&apos;T EXIST.</span>
          </p>
          <Link
            href={"/"}
            className="bg-[#1ca9cc] text-white text-xs px-3 py-1 rounded"
          >
            HomePage
          </Link>
          <p className="text-[10px] mt-4 max-w-[400px] mx-auto">
            There may be several reasons why the page can&apos;t be found - the
            link may no longer be working. Currently our engineers are working
            on this page; please take a look at the top menu to get other
            related products.
          </p>
        </div>
      </div>
    </HomeLayout>
  );
};

export default NotFound;
