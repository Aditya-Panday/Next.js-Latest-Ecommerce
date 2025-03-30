import { X } from "lucide-react";
import React from "react";

const CartSidebar = ({ setIsCartOpen }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-64 h-full p-4 shadow-lg text-black">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">My Cart</h3>
          <button onClick={() => setIsCartOpen(false)} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
