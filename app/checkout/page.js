"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronUp,
  CreditCard,
  MapPin,
  Plus,
  ShoppingCart,
  Trash2,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import HomeLayout from "@/components/HomeLayout/HomeLayout";

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

// Sample data for addresses
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

// Simplified checkout steps - only 3 steps now
const checkoutSteps = [
  { id: "cart", label: "Cart", icon: ShoppingCart },
  { id: "checkout", label: "Checkout", icon: Truck },
  { id: "confirmed", label: "Confirmed", icon: Check },
];

export default function CheckoutPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((a) => a.isDefault)?.id || 1
  );
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [showCartItems, setShowCartItems] = useState(true);
  const [currentStep, setCurrentStep] = useState("checkout");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const router = useRouter();
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

  // Add new address
  const handleAddAddress = (newAddress) => {
    const newId = addresses.length + 1;
    setAddresses([
      ...addresses,
      { ...newAddress, id: newId, isDefault: false },
    ]);
  };

  // Handle checkout completion
  const handleCompleteCheckout = () => {
    setCurrentStep("confirmed");
    setOrderPlaced(true);
    router.push("/order-confirmed");
  };

  // Get selected address
  const getSelectedAddress = () => {
    return addresses.find((a) => a.id === selectedAddress);
  };

  return (
    <HomeLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Simplified Checkout Progress Indicator */}
        <div className="mb-10">
          <div className="flex justify-center items-center">
            <div className="relative flex items-center justify-between w-full max-w-3xl">
              {checkoutSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center relative z-10"
                >
                  {/* Step circle */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      step.id === currentStep
                        ? "bg-primary border-primary text-primary-foreground"
                        : checkoutSteps.findIndex((s) => s.id === currentStep) >
                          checkoutSteps.findIndex((s) => s.id === step.id)
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background border-muted text-muted-foreground"
                    }`}
                  >
                    <step.icon className="h-6 w-6" />
                  </div>

                  {/* Step label */}
                  <span
                    className={`mt-2 text-sm font-medium ${
                      step.id === currentStep
                        ? "text-primary"
                        : checkoutSteps.findIndex((s) => s.id === currentStep) >
                          checkoutSteps.findIndex((s) => s.id === step.id)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}

              {/* Connector lines - rendered separately to ensure they appear behind the circles */}
              <div className="absolute top-6 left-0 w-full h-0.5 -z-10">
                {/* First connector (Cart to Checkout) */}
                <div
                  className={`absolute left-0 right-1/2 h-full ${
                    currentStep === "checkout" || currentStep === "confirmed"
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />

                {/* Second connector (Checkout to Confirmed) */}
                <div
                  className={`absolute left-1/2 right-0 h-full ${
                    currentStep === "confirmed" ? "bg-primary" : "bg-muted"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl">Cart Items</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCartItems(!showCartItems)}
                  className="h-8 w-8 p-0"
                  name="view cart"
                >
                  {showCartItems ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CardHeader>
              {showCartItems && (
                <CardContent>
                  <div className="space-y-4">
                    {/* Updated cart items display */}
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-sm line-through text-muted-foreground mr-2">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-green-600">
                              Save ${item.discount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            name="remove"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Address Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAddress.toString()}
                  onValueChange={(value) =>
                    setSelectedAddress(Number.parseInt(value))
                  }
                  className="space-y-4"
                >
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-start space-x-2"
                    >
                      <RadioGroupItem
                        value={address.id.toString()}
                        id={`address-${address.id}`}
                        className="mt-1"
                      />
                      <div className="flex-1 border rounded-lg p-4">
                        <Label
                          htmlFor={`address-${address.id}`}
                          className="font-medium cursor-pointer"
                        >
                          {address.name}{" "}
                          {address.isDefault && (
                            <span className="text-sm text-primary">
                              (Default)
                            </span>
                          )}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.street}, {address.city}, {address.state}{" "}
                          {address.zip}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.phone}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4 w-full" name="add address" >
                      <Plus className="mr-2 h-4 w-4" /> Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Address</DialogTitle>
                      <DialogDescription>
                        Enter your shipping address details below.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const newAddress = {
                          name: formData.get("name"),
                          street: formData.get("street"),
                          city: formData.get("city"),
                          state: formData.get("state"),
                          zip: formData.get("zip"),
                          phone: formData.get("phone"),
                        };
                        handleAddAddress(newAddress);
                        e.target.reset();
                        document
                          .querySelector('[data-state="open"]')
                          ?.dispatchEvent(
                            new KeyboardEvent("keydown", { key: "Escape" })
                          );
                      }}
                    >
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" required />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Textarea id="street" name="street" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" name="city" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="state">State</Label>
                            <Input id="state" name="state" required />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" name="zip" required />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" name="phone" required />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" name="save-address">Save Address</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Payment Method Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedPayment}
                  onValueChange={setSelectedPayment}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label
                      htmlFor="credit-card"
                      className="flex items-center cursor-pointer"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Credit / Debit Card
                    </Label>
                  </div>

                  {selectedPayment === "credit-card" && (
                    <div className="pl-6 space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">
                      PayPal
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your order details</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Updated order summary */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal (Original)</span>
                    <span>${(subtotal + totalDiscount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${totalDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal (After Discount)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCompleteCheckout}
                  name="complete checkout"
                >
                  Complete Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>{" "}
    </HomeLayout>
  );
}
