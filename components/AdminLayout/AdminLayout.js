"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  MessageCircleMore,
  ChartBar,
  Tags,
  ShoppingCart,
  Quote,
  ListOrdered,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  {
    icon: ShoppingCart,
    label: "Products",
    href: "/dashboard/products",
    subItems: [
      { label: "Add Product", href: "/dashboard/products/addproduct" },
    ],
  },
  {
    icon: Tags,
    label: "Brands",
    href: "/dashboard/brands",
  },
  ,
  {
    icon: ChartBar,
    label: "Subcategories",
    href: "/dashboard/categories",
  },

  { icon: Quote, label: "Testimonial", href: "/dashboard/testimonial" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: ListOrdered, label: "Orders", href: "/dashboard/orders" },
  { icon: ListOrdered, label: "Subscribers", href: "/dashboard/subscribers" },

  {
    icon: MessageCircleMore,
    label: "CustomerSupport",
    href: "/dashboard/customer",
  },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const AdminLayout = ({ isOpen }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <div
      className={`flex flex-col bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4">
        <h1 className={`text-2xl font-bold ${isOpen ? "" : "hidden"}`}>
          Admin Panel
        </h1>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <div>
                <Link href={item.href}>
                  <span
                    className={`flex items-center px-4 py-2 mt-2 text-gray-100 ${
                      pathname === item.href
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    onClick={() => item.subItems && toggleDropdown(item.label)}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {isOpen && <span>{item.label}</span>}
                    {item.subItems && isOpen && (
                      <span className="ml-auto">
                        {openDropdown === item.label ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </span>
                </Link>
                {item.subItems && openDropdown === item.label && (
                  <ul className={`ml-8 mt-2 ${isOpen ? "block" : "hidden"}`}>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <Link href={subItem.href}>
                          <span
                            className={`flex items-center px-4 py-2 mt-1 text-sm text-gray-100 ${
                              pathname === subItem.href
                                ? "bg-gray-700"
                                : "hover:bg-gray-700"
                            }`}
                          >
                            {subItem.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminLayout;
