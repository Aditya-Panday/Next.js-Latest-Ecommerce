import React from "react";
import ReuseableSkelton from "../DynamicProductCard/ReuseableSkelton";

const ProductSkeltonPage = () => {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm gap-4">
        <ReuseableSkelton width={"80px"} height={"20px"} />
        <ReuseableSkelton width={"80px"} height={"20px"} />
        <ReuseableSkelton width={"80px"} height={"20px"} />
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square">
          <ReuseableSkelton width="100%" height="100%" />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <ReuseableSkelton
                width={"200px"}
                height={"45px"}
                className="my-2"
              />
            </h1>

            <ReuseableSkelton
              width={"160px"}
              height={"25px"}
              className="my-2"
            />
            <ReuseableSkelton
              width={"140px"}
              height={"25px"}
              className="my-2"
            />
            <ReuseableSkelton
              width={"140px"}
              height={"25px"}
              className="my-2"
            />

            {/* Sizes Section */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, idx) => (
                  <ReuseableSkelton
                    key={`size-${idx}`}
                    width="40px"
                    height="40px"
                    className="rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Colors Section */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, idx) => (
                  <ReuseableSkelton
                    key={`color-${idx}`}
                    width="40px"
                    height="40px"
                    className="rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md px-2 py-2 gap-2">
              <ReuseableSkelton
                width="32px"
                height="32px"
                className="rounded"
              />
              <ReuseableSkelton
                width="32px"
                height="20px"
                className="rounded"
              />
              <ReuseableSkelton
                width="32px"
                height="32px"
                className="rounded"
              />
            </div>
            <ReuseableSkelton
              width="100%"
              height="40px"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSkeltonPage;
