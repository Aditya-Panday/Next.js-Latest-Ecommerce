import DynamicProductCard from "@/components/DynamicProductCard/DynamicProductCard";
import HomeLayout from "@/components/HomeLayout/HomeLayout";
import ProductCategory from "@/components/HomeLayout/ProductCategory";
import SubscribeNewsletter from "@/components/HomeLayout/SubscribeNewsletter";
import Image from "next/image";

export default function Home() {
  const products = [
    {
      id: 0,
      name: "Classic T-Shirt",
      price: 299,
      image: "/cloths.jpg",
      discount: 999,
    },
    {
      id: 1,
      name: "Denim Jeans",
      price: 590,
      image: "/cloths.jpg",
      discount: 999,
    },
    {
      id: 2,
      name: "Leather Jacket",
      price: 199,
      image: "/shoes.jpg",
      discount: 999,
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 898,
      image: "/cloths.jpg",
      discount: 999,
    },
  ];
  return (
    <HomeLayout>
      {/* Main Content */}
      {/* <main >
        <section className="relative h-[70vh] bg-theme-50">
          <div className="container h-full flex items-center">
            <div className="max-w-2xl space-y-6 z-10">
              <h1 className="text-6xl font-bold">Summer Collection 2024</h1>
              <p className="text-xl text-gray-600">
                Discover our latest arrivals and trending styles
              </p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                Shop Now
              </button>
            </div>
          </div>
          <div className="absolute inset-0 banner-gradient" />
        </section>
      </main> */}
      {/* Banner */}
      <div className="container mx-auto px-4 py-8 bg-white ">
        <main className="pt-16">
          <section className="mb-12">
            <div
              className="relative h-[400px] overflow-hidden "
              style={{ borderRadius: "24px" }}
            >
              <Image
                alt="Banner"
                src="/banner2.jpg"
                width={100}
                height={100}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <h1 className="text-4xl font-bold text-white">
                  Welcome to DotFits
                </h1>
              </div>
            </div>
          </section>
        </main>
      </div>
      {/* Categories */}
      <ProductCategory />

      {/* Men's Section */}

      <section className="py-16 text-black" style={{ background: "#fdf8f6" }}>
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Men&apos;s Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <DynamicProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Section */}
      <section className="py-16 bg-white text-black">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Women&apos;s Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <DynamicProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Newsletter */}
      <SubscribeNewsletter />
    </HomeLayout>
  );
}
