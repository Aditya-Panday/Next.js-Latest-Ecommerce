"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Package, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const initialAddresses = [
  {
    id: 1,
    name: "John Doe",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "123-456-7890",
    isDefault: true,
  },
  {
    id: 2,
    name: "John Doe",
    street: "456 Park Ave",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    phone: "123-456-7890",
    isDefault: false,
  },
];

const OrderConfirmed = () => {
  // Updated cart items data
  const cartItems = [
    {
      id: 1,
      name: "Premium T-Shirt",
      originalPrice: 39.99,
      price: 29.99, // discounted price
      discount: 10.0,
      quantity: 2,
      image: "/cloths.jpg",
    },
    {
      id: 2,
      name: "Designer Jeans",
      originalPrice: 79.99,
      price: 59.99, // discounted price
      discount: 20.0,
      quantity: 1,
      image: "/cloths.jpg",
    },
  ];
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((a) => a.isDefault)?.id || 1
  );
  // Generate order number
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Updated calculation section
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + item.discount * item.quantity,
    0
  );
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Get selected address
  const getSelectedAddress = () => {
    return addresses.find((a) => a.id === selectedAddress);
  };
  return (
      <div className="max-w-4xl mx-auto my-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
          <p className="text-muted-foreground text-lg">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        {/* Order Animation/GIF */}
        <div className="flex justify-center mb-8">
          <div className="relative w-64 h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="h-32 w-32 text-primary animate-bounce" />
            </div>
            <div
              className="absolute inset-0 border-4 border-dashed border-primary rounded-full animate-spin"
              style={{ animationDuration: "1s" }}
            ></div>
          </div>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>
              Order #{orderNumber} • Placed on {orderDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Items */}
            <div>
              <h3 className="font-medium mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-green-600">
                        Saved ${(item.discount * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Shipping Address */}
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              {getSelectedAddress() && (
                <div className="text-sm">
                  <p className="font-medium">{getSelectedAddress().name}</p>
                  <p>{getSelectedAddress().street}</p>
                  <p>
                    {getSelectedAddress().city}, {getSelectedAddress().state}{" "}
                    {getSelectedAddress().zip}
                  </p>
                  <p>{getSelectedAddress().phone}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Payment Summary */}
            <div>
              <h3 className="font-medium mb-2">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-${totalDiscount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Continue Shopping Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="px-8 bg-black text-white"
            onClick={() => {
              // Here you would typically redirect to the products page
              // For now, we'll just reset the checkout flow
              setOrderPlaced(false);
              setCurrentStep("checkout");
            }}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Continue Shopping
          </Button>
        </div>
      </div>
  );
};

export default OrderConfirmed;
