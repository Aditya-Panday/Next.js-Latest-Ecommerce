import { Bell, X } from "lucide-react";
import React from "react";

const MenuSidebar = ({ setIsMenuOpen }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="bg-white w-64 h-full p-4 shadow-lg text-black">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Menu</h3>
          <button className="p-2">
            <X className="h-6 w-6" onClick={() => setIsMenuOpen(false)} />
          </button>
        </div>

        {/* Menu Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Order Tracking</h3>
            <input
              placeholder="Order ID"
              className="w-full p-2 border rounded"
            />
            <button className="w-full bg-gray-100 p-2 rounded">
              Track Order
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Notifications</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Bell className="h-4 w-4" />
              <span>No new notifications</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Support</h3>
            <button className="w-full bg-gray-100 p-2 rounded">
              Contact Us
            </button>
            <button className="w-full bg-gray-100 p-2 rounded">FAQs</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
