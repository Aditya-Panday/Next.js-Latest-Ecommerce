import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCartItem,
  removeFromCart,
  selectCartItems,
} from "@/lib/features/cartData/cartSlice";

const CartSidebar = ({ setIsCartOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // Calculate total price and savings if needed
  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.final_price || item.price) * (item.quantity || 1),
    0
  );
  const totalOld = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );
  const savings = totalOld - total;

  const handleQuantity = (item, action) => {
    if (action === "increase") {
      dispatch(addToCart({ ...item, quantity: 1 }));
    } else if (action === "decrease") {
      dispatch(decreaseCartItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="bg-white w-[25rem] h-full p-2 shadow-lg text-black flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold">
            My Cart{cartItems.length > 0 && ` (${cartItems.length})`}
          </h3>
          <button onClick={() => setIsCartOpen(false)} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        <hr className="border-t-[1px] border-gray-800 m-0" />

        {/* If cart is empty */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center h-full">
            <p className="text-gray-700 mb-2 text-sm">
              Your cart is currently empty.
            </p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                router.push("/shop");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors duration-200"
            >
              Return to shop
            </button>
          </div>
        ) : (
          // Cart items
          <>
            <div className="flex-1 overflow-y-auto py-2 space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.product_id + (item.size || "") + (item.color || "")}
                  className="flex items-center bg-[#F8F8F8] rounded-md p-2 relative"
                >
                  <Image
                    src={item.image_url}
                    alt={item.product_name}
                    width={100}
                    height={100}
                    className="h-14 w-14 rounded object-fill border"
                  />
                  <div className="flex flex-col flex-1 ml-2 justify-between">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-[15px] leading-tight">
                        {item.product_name}
                      </span>
                      <button
                        className="ml-2 bg-[#FFF6F6] hover:bg-[#FFE6E6] rounded p-1"
                        title="Remove from cart"
                        onClick={() => handleRemove(item)}
                      >
                        <X className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                    <span className="text-[15px] text-black font-bold mt-1">
                      ₹{item.final_price || item.price}
                      {item.discount ? (
                        <span className="text-xs ml-2 font-normal text-gray-400 line-through">
                          ₹{item.price}
                        </span>
                      ) : null}
                      {item.discount ? (
                        <span className="text-[11px] text-[#1eae60] ml-1">
                          {item.discount}% Off
                        </span>
                      ) : null}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      {item.size && (
                        <span className="text-xs px-2 py-0.5 border rounded bg-white text-gray-700">
                          {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="text-xs px-2 py-0.5 border rounded bg-white text-gray-700">
                          {item.color}
                        </span>
                      )}
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          className="bg-white border rounded px-2 py-1 text-black text-lg"
                          onClick={() => handleQuantity(item, "decrease")}
                        >
                          -
                        </button>
                        <span className="text-sm px-2">{item.quantity}</span>
                        <button
                          className="bg-white border rounded px-2 py-1 text-black text-lg"
                          onClick={() => handleQuantity(item, "increase")}
                          disabled={item.quantity >= 6}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Cart summary and checkout */}
            <div className="p-2 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-lg">₹{total}</span>
                {savings > 0 && (
                  <span className="text-green-600 text-xs">
                    You Saved ₹{savings}
                  </span>
                )}
              </div>
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-2 rounded-full transition-colors duration-200"
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/checkout");
                }}
              >
                Checkout
              </button>
              <div className="text-xs text-gray-500 text-center mt-2">
                Estimated delivery within 5-7 days
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
