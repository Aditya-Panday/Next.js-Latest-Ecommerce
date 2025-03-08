"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Minus, Plus, ShoppingCart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock product data
const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  price: 299.99,
  brand: "SoundMaster",
  rating: 4.5,
  image: "/shoes.webp",
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

// Mock related products
const relatedProducts = [
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 129.99,
    image: "/shoes.webp",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "/shoes.webp",
  },
  {
    id: 4,
    name: "Noise-Cancelling Headphones",
    price: 249.99,
    image: "/shoes.webp",
  },
  {
    id: 5,
    name: "Gaming Headset",
    price: 159.99,
    image: "/shoes.webp",
  },
];

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    comment: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    console.log(
      `Added ${quantity} ${product.name}(s) to cart, size: ${selectedSize}`
    );
    // Implement actual add to cart logic here
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log("New review:", newReview);
    // Here you would typically send this data to your backend
    // and then update the product.reviews array with the new review
    setIsModalOpen(false);
    setNewReview({ author: "", rating: 5, comment: "" }); // Reset form
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <ChevronRight className="mx-2 h-5 w-5 text-gray-400" />
        <Link href="/category" className="text-gray-500 hover:text-gray-700">
          Electronics
        </Link>
        <ChevronRight className="mx-2 h-5 w-5 text-gray-400" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                      ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decrementQuantity}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={incrementQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={addToCart} className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>Add Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Your Review</DialogTitle>
                <DialogDescription>
                  Share your thoughts about the {product.name}.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newReview.author}
                    onChange={(e) =>
                      setNewReview({ ...newReview, author: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <select
                    id="rating"
                    value={newReview.rating}
                    onChange={(e) =>
                      setNewReview({
                        ...newReview,
                        rating: Number.parseInt(e.target.value),
                      })
                    }
                    className="w-full border rounded-md p-2"
                    required
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="comment">Review</Label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-6">
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{review.author}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs for Description, Specifications, and Reviews */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <p className="text-gray-600">{product.description}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <table className="w-full text-left">
            <tbody>
              {product.specifications.map((spec, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 font-medium">{spec.name}</td>
                  <td className="py-2 text-gray-600">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          {/*This content is now in the new review section above*/}
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="group">
              <div className="relative aspect-square mb-2 overflow-hidden rounded-lg">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-sm mb-1">
                {relatedProduct.name}
              </h3>
              <p className="text-gray-600">
                ${relatedProduct.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
