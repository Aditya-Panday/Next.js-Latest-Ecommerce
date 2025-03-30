import Image from "next/image";
import React from "react";

const ProductCategory = ({}) => {
  const categories = [
    { name: "Wallets", image: "/cloths.jpg" },
    { name: "Shoes", image: "/cloths.jpg" },
    { name: "Jeans", image: "/cloths.jpg" },
    { name: "Shirts", image: "/cloths.jpg" },
    { name: "Accessories", image: "/cloths.jpg" },
    { name: "Watches", image: "/cloths.jpg" },
  ];
  return (
    <section className="py-16 bg-white text-black">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="category-scroll flex gap-6 overflow-x-auto pb-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex-none w-32 text-center space-y-4"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden bg-theme-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={1200}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategory;
