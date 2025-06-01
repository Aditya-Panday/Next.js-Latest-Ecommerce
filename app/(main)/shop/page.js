"use client";

import dynamic from "next/dynamic";
import Loader from "@/components/Loader";

// 🛠️ Dynamically import the component with a loader fallback (no Suspense needed)
const ShopPage = dynamic(() => import("@/components/ShopPage/ShopPage"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader />
    </div>
  ),
});

const Page = () => {
  return <ShopPage />;
};

export default Page;
