import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCategory = () => {
  const categories = [
    {
      name: "Wallets",
      image:
        "https://bbstgmedia.s3.amazonaws.com/TEST%2F2025%2F4%2F51CtQ4Vo1EL._SX300_SY300_.jpg",
      link: "Wallets",
    },
    {
      name: "Shoes",
      image:
        "https://images.bewakoof.com/t640/men-s-white-silver-nasa-color-block-high-top-sneakers-630676-1717834801-1.jpg",
      link: "Shoes",
    },
    {
      name: "Paints",
      image:
        "https://bbstgmedia.s3.amazonaws.com/TEST%2F2025%2F4%2Fmen-s-grey-baggy-oversized-japanese-cargo-carpenter-pants-628746-1743760795-1.webp",
      link: "Paints",
    },
    {
      name: "T-Shirts",
      image:
        "https://bbstgmedia.s3.amazonaws.com/TEST%2F2025%2F4%2Fwomen-s-black-swag-rani-graphic-printed-oversized-acid-wash-t-shirt-663621-1740056635-1.webp",
      link: "T-shirt",
    },
    {
      name: "Sliders",
      image:
        "https://bbstgmedia.s3.amazonaws.com/TEST%2F2025%2F4%2Fwomen-s-pink-printed-sliders1111-591678-1683285796-1.webp",
      link: "Sliders",
    },
    {
      name: "Watches",
      image:
        "https://bbstgmedia.s3.amazonaws.com/TEST%2F2025%2F4%2F71FLt2oP55L._AC_CR0%2C0%2C0%2C0_SX480_SY360_.jpg",
      link: "Watches",
    },
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
              <Link href={`/shop?subcategory=${category.link}`}>
                <div>
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategory;
