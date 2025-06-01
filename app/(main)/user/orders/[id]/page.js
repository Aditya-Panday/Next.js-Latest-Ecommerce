import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  FileText,
  Package,
  Truck,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const getOrderById = (id) => {
  return {
    id: id,
    date: "March 15, 2023",
    placedTime: "10:30 AM",
    total: 349.97,
    subtotal: 329.98,
    shipping: 9.99,
    tax: 10.0,
    status: "Delivered",
    paymentMethod: "Credit Card (Visa ending in 4242)",
    items: [
      {
        id: "PROD-001",
        name: "Premium Wireless Headphones",
        quantity: 1,
        price: 199.99,
        image: "/2.png",
      },
      {
        id: "PROD-003",
        name: "Smart Fitness Watch",
        quantity: 1,
        price: 149.99,
        image: "/2.png",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "United States",
      phone: "(123) 456-7890",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      country: "United States",
      phone: "(123) 456-7890",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "March 15, 2023",
        time: "10:30 AM",
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Payment Confirmed",
        date: "March 15, 2023",
        time: "10:35 AM",
        description: "Payment has been successfully processed.",
      },
      {
        status: "Processing",
        date: "March 16, 2023",
        time: "9:00 AM",
        description: "Your order is being prepared for shipping.",
      },
      {
        status: "Shipped",
        date: "March 17, 2023",
        time: "2:15 PM",
        description: "Your order has been shipped via Express Shipping.",
      },
      {
        status: "Delivered",
        date: "March 19, 2023",
        time: "11:45 AM",
        description: "Your order has been delivered.",
      },
    ],
    trackingNumber: "TRK123456789",
    carrier: "Express Shipping",
  };
};

const Page = async ({ params }) => {
  const statusIcon = {
    "Order Placed": <Clock className="h-5 w-5 text-gray-500" />,
    "Payment Confirmed": <CreditCard className="h-5 w-5 text-purple-500" />,
    Processing: <Package className="h-5 w-5 text-yellow-500" />,
    Shipped: <Truck className="h-5 w-5 text-blue-500" />,
    Delivered: <CheckCircle className="h-5 w-5 text-green-500" />,
  };

  const order = await getOrderById(params?.id);

  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="mb-6">
        <Link
          href="/user/orders"
          className="mb-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Order {order.id}
            </h1>
            <p className="text-muted-foreground">
              Placed on {order.date} at {order.placedTime}
            </p>
          </div>
          <Badge
            className={
              order.status === "Delivered"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : order.status === "Shipped"
                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            }
            variant="outline"
          >
            <span className="flex items-center gap-1">
              {order.status === "Delivered" ? (
                <CheckCircle className="h-4 w-4" />
              ) : order.status === "Shipped" ? (
                <Truck className="h-4 w-4" />
              ) : (
                <Package className="h-4 w-4" />
              )}
              {order.status}
            </span>
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Order Items */}
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>Items included in your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                    <div className="mt-2 flex">
                      <Button variant="outline" size="sm">
                        View Product
                      </Button>
                      {order.status === "Delivered" && (
                        <Button variant="ghost" size="sm" className="ml-2">
                          Write Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Payment Method</h4>
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span>{order.paymentMethod}</span>
                </div>
              </div>

              {order.status === "Shipped" && (
                <div>
                  <h4 className="mb-2 font-medium">Tracking Information</h4>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <span>{order.carrier}</span>
                    </div>
                    <div className="mt-1 text-sm">
                      Tracking #:{" "}
                      <span className="font-medium">
                        {order.trackingNumber}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      Track Package
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Billing */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p>{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-1">{order.shippingAddress.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2">
              <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p>{order.billingAddress.name}</p>
                <p>{order.billingAddress.street}</p>
                <p>
                  {order.billingAddress.city}, {order.billingAddress.state}{" "}
                  {order.billingAddress.zip}
                </p>
                <p>{order.billingAddress.country}</p>
                <p className="mt-1">{order.billingAddress.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Order Timeline</CardTitle>
            <CardDescription>Track the progress of your order</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-muted">
              {order.timeline.map((event, index) => (
                <li key={index} className="mb-6 ml-6">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-card ring-8 ring-background">
                    {statusIcon[event.status]}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{event.status}</h3>
                    <div className="text-sm text-muted-foreground">
                      {event.date} at {event.time}
                    </div>
                  </div>
                  <p className="text-sm">{event.description}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="col-span-full flex flex-wrap gap-4 mt-6">
          <Button variant="outline">Download Invoice</Button>
          <Button variant="outline">Contact Support</Button>
          {order.status === "Delivered" && <Button>Return Items</Button>}
        </div>
      </div>
    </div>
  );
};

export default Page;
