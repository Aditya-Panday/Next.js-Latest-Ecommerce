import React from "react";
import { FileText, Package, Truck, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const orders = [
  {
    id: "ORD-12345",
    date: "March 15, 2023",
    total: 349.97,
    status: "Delivered",
    items: [
      { name: "Premium Wireless Headphones", quantity: 1, price: 199.99 },
      { name: "Smart Fitness Watch", quantity: 1, price: 149.99 },
    ],
    address: "123 Main St, Anytown, CA 12345",
  },
  {
    id: "ORD-12346",
    date: "April 2, 2023",
    total: 29.99,
    status: "Processing",
    items: [{ name: "Organic Cotton T-Shirt", quantity: 1, price: 29.99 }],
    address: "123 Main St, Anytown, CA 12345",
  },
  {
    id: "ORD-12347",
    date: "April 10, 2023",
    total: 249.99,
    status: "Shipped",
    items: [{ name: "Ergonomic Office Chair", quantity: 1, price: 249.99 }],
    address: "123 Main St, Anytown, CA 12345",
  },
];


const UserOrders = () => {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Your Orders</h1>
        <p className="text-muted-foreground">
          View and track your order history
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="processing" className="mt-4">
          <div className="grid gap-6">
            {orders
              .filter((order) => order.status === "Processing")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="shipped" className="mt-4">
          <div className="grid gap-6">
            {orders
              .filter((order) => order.status === "Shipped")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="delivered" className="mt-4">
          <div className="grid gap-6">
            {orders
              .filter((order) => order.status === "Shipped")
              .map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserOrders;

function OrderCard({ order }) {
  const statusIcon = {
    Processing: <Package className="h-4 w-4 text-yellow-500" />,
    Shipped: <Truck className="h-4 w-4 text-blue-500" />,
    Delivered: <CheckCircle className="h-4 w-4 text-green-500" />,
  }[order.status];

  const statusColor = {
    Processing: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    Shipped: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    Delivered: "bg-green-100 text-green-800 hover:bg-green-100",
  }[order.status];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <CardDescription>Placed on {order.date}</CardDescription>
          </div>
          <Badge className={statusColor} variant="outline">
            <span className="flex items-center gap-1">
              {statusIcon}
              {order.status}
            </span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">
                  {" "}
                  × {item.quantity}
                </span>
              </div>
              <div>${item.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${order.total.toFixed(2)}</span>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <FileText className="mt-0.5 h-4 w-4" />
            <div>
              <div className="font-medium">Shipping Address</div>
              <div>{order.address}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            Track Order
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/user/orders/${order.id}`}>View Details</Link>
          </Button>
          {order.status === "Delivered" && (
            <Button variant="outline" size="sm">
              Leave Review
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
