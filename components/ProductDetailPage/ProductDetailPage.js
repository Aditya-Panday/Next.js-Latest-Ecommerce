"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Minus, Plus, ShoppingCart, ChevronRight } from "lucide-react";
import { useGetMainProductDataQuery } from "@/lib/features/productApi/productMainSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCartItems } from "@/lib/features/cartData/cartSlice";
import { Button } from "@/components/ui/button";
import TabSection from "./TabSection";
import ReuseableSkelton from "../DynamicProductCard/ReuseableSkelton";
import AddReviewModal from "../AllModals/AddReviewModal";
import ProductSkeltonPage from "./ProductSkeltonPage";

// Mock product data
const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 299.99,
  brand: "SoundMaster",
  rating: 4.5,
  image: "/cloths.jpg",
  category: "Electronics",
  gender: "Unisex",
  description:
    "Experience crystal-clear audio with our Premium Wireless Headphones. Featuring advanced noise-cancellation technology, these headphones deliver an immersive listening experience whether you're commuting, working, or relaxing at home.",
  specifications: [
    { name: "Bluetooth Version", value: "5.0" },
    { name: "Battery Life", value: "Up to 30 hours" },
    { name: "Charging Time", value: "2 hours" },
    { name: "Driver Size", value: "40mm" },
    { name: "Frequency Response", value: "20Hz - 20kHz" },
    { name: "Impedance", value: "32 Ohm" },
    { name: "Weight", value: "250g" },
  ],
  reviews: [
    {
      id: 1,
      author: "John D.",
      rating: 5,
      comment:
        "These headphones are amazing! The sound quality is top-notch and the battery life is impressive.",
    },
    {
      id: 2,
      author: "Sarah M.",
      rating: 4,
      comment:
        "Great headphones overall. The noise cancellation works well, but they're a bit heavy for long listening sessions.",
    },
    {
      id: 3,
      author: "Mike R.",
      rating: 5,
      comment:
        "Absolutely love these! The sound is crisp and clear, and they're very comfortable to wear.",
    },
    {
      id: 4,
      author: "Emily L.",
      rating: 4,
      comment:
        "Good quality headphones. The app could use some improvements, but the sound is great.",
    },
  ],
};

export default function ProductDetailPage({ id }) {
  const {
    data: ProductDetail,
    isLoading: isProdLoading,
    error,
  } = useGetMainProductDataQuery({
    productId: id,
  });
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const productData = ProductDetail?.products[0];
  const RelatedProducts = ProductDetail?.relatedProducts || [];
  const productReviews = ProductDetail?.productReview || [];
  const router = useRouter();
  const [extraStates, setExtraStates] = useState({
    isModalOpen: false,
    loading: false,
    added: false,
  });

  const [cartData, setCartData] = useState({
    brand_name: "",
    category_name: "",
    description: "",
    discount: "",
    final_price: "",
    image_url: "",
    price: "",
    product_id: "",
    product_name: "",
    size: null,
    sub_category: "",
    color: null,
    quantity: 1,
  });
  useEffect(() => {
    // 🚨 Redirect to 404 if API says product not found
    if (!isProdLoading && error?.status === 404) {
      router.push("/404");
    }
  }, [isProdLoading, router, error]);

  const incrementQuantity = () => {
    setCartData((prev) => ({
      ...prev,
      quantity: prev.quantity < 6 ? prev.quantity + 1 : 6,
    }));
  };

  const decrementQuantity = () => {
    setCartData((prev) => ({
      ...prev,
      quantity: prev.quantity > 1 ? prev.quantity - 1 : 1,
    }));
  };
  const cartHandler = () => {
    if (!cartData.size) {
      alert("Please select a size");
      return;
    }
    try {
      setExtraStates((prev) => ({
        ...prev,
        loading: true,
      }));
      dispatch(addToCart(cartData));
      setExtraStates((prev) => ({
        ...prev,
        added: true,
      }));
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(
        "There was a problem adding the item to your cart. Please try again."
      );
    } finally {
      setExtraStates((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    if (productData?.sizes?.length > 0) {
      const newCartData = {
        product_id: productData.product_id || "",
        brand_name: productData.brand_name || "",
        category_name: productData.category_name || "",
        description: productData.description || "",
        discount: productData.discount || 0,
        final_price: productData.final_price || "",
        image_url: productData.image_url?.[0] || "",
        price: productData.price || "",
        product_name: productData.product_name || "",
        size: productData.sizes?.[0] || null,
        sub_category: productData.sub_category || "",
        color: productData.colors?.[0] || null,
        quantity: 1,
      };
      setCartData(newCartData);
    }
  }, [productData]);

  // 🟡 Check if current selection is in cart
  useEffect(() => {
    if (cartData.product_id && cartData.size && cartData.color) {
      const isAlreadyInCart = cartItems.some(
        (item) =>
          item.product_id === cartData.product_id &&
          item.size === cartData.size &&
          item.color === cartData.color
      );
      setExtraStates((prev) => ({
        ...prev,
        added: isAlreadyInCart,
      }));
    }
  }, [cartData.product_id, cartData.size, cartData.color, cartItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      {isProdLoading || error ? (
        <ProductSkeltonPage />
      ) : (
        <>
          {/* Breadcrumb */}
          <nav className="flex mb-8 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Home
            </Link>
            <ChevronRight className="mx-2 h-5 w-5 text-gray-400" />
            <Link
              href="/category"
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {productData?.sub_category}
            </Link>
            <ChevronRight className="mx-2 h-5 w-5 text-gray-400" />
            <span className="text-gray-900">{productData?.product_name}</span>
          </nav>

          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Product Image */}
            <div className="relative aspect-square">
              {productData?.image_url?.[0] && (
                <Image
                  src={productData.image_url[0]}
                  alt={productData.product_name || "Product Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  priority
                  className="object-cover rounded-lg"
                />
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2 capitalize">
                  {productData?.product_name}
                </h1>

                <p className="text-xl font-semibold mb-4">
                  ₹ {productData?.final_price.toFixed(2)}
                  {productData?.discount > 0 && (
                    <>
                      <span className="text-sm text-slate-900 line-through ml-2">
                        ₹{productData?.price}
                      </span>
                      <span className="m-2 rounded-full bg-black px-2 text-center text-xs font-medium text-white">
                        {productData.discount}% OFF
                      </span>
                    </>
                  )}
                </p>

                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product?.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">(4)</span>
                </div>

                <p className="text-gray-600 mb-6">{productData?.description}</p>

                {/* Sizes */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {productData?.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setCartData((prev) => ({
                            ...prev,
                            size: size,
                          }))
                        }
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          cartData.size === size
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Select Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {productData?.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          setCartData((prev) => ({
                            ...prev,
                            color: color,
                          }))
                        }
                        className={`p-2 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          cartData.color === color
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={cartData.quantity === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4">{cartData.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={cartData.quantity === 6}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {extraStates.added ? (
                  <Link href="/checkout" passHref legacyBehavior>
                    <Button
                      className="flex-1 bg-emerald-500 hover:bg-emerald-700 text-white"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Go to Cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={cartHandler}
                    className="flex-1 bg-slate-900 hover:bg-gray-700 text-white"
                    disabled={extraStates.loading}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Tabs for Description and Specifications*/}
      {isProdLoading ? (
        <div className="flex items-center space-x-4">
          <ReuseableSkelton width="100px" height="32px" className="rounded" />
          <ReuseableSkelton width="100px" height="32px" className="rounded" />
        </div>
      ) : (
        productData && <TabSection productData={productData} />
      )}

      {/* Product Reviews Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isProdLoading || error ? (
              <ReuseableSkelton
                width="150px"
                height="45px"
                className="rounded-lg my-4"
              />
            ) : (
              "Customer Reviews"
            )}
          </h2>
          {(!isProdLoading || error) && (
            <>
              <AddReviewModal
                isModalOpen={extraStates.isModalOpen}
                setIsModalOpen={(open) =>
                  setExtraStates((prev) => ({ ...prev, isModalOpen: open }))
                }
                productId={productData?.product_id}
                productName={productData?.product_name}
              />
            </>
          )}
        </div>
        <div className="space-y-6">
          {isProdLoading || error ? (
            // Show skeletons while loading
            [...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ReuseableSkelton width="80px" height="16px" />
                  <ReuseableSkelton width="120px" height="16px" />
                </div>
                <ReuseableSkelton width="100%" height="40px" />
              </div>
            ))
          ) : productReviews.length > 0 ? (
            // Show actual reviews after loading
            productReviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.stars
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">{review.name}</span>
                </div>
                <p className="text-gray-600">{review.description}</p>
              </div>
            ))
          ) : (
            // Fallback if no reviews
            <p>No review found</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      {isProdLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ReuseableSkelton
              key={idx}
              width="100%"
              height="350px"
              className="rounded-lg"
            />
          ))}
        </div>
      ) : (
        <div>
          {RelatedProducts.length > 0 && (
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {RelatedProducts.map((relatedProduct, index) => (
              <div key={relatedProduct.id || index} className="group">
                <Link href={`/product-detail/${relatedProduct.product_id}`}>
                  <div className="relative aspect-square mb-2 overflow-hidden rounded-lg">
                    <Image
                      src={relatedProduct?.image_url?.[0] || "/placeholder.svg"}
                      alt={relatedProduct?.name || "Related product image"}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <h3 className="font-medium text-sm mb-1">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600">₹{relatedProduct.final_price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
