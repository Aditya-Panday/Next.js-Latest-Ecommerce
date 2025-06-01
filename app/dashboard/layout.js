"use client";

import { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import AdminLAyout from "@/components/AdminLayout/AdminLayout";

export default function DashboardLayout({
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <AdminLAyout isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-mono">
            Welcome <span className=" text-orange-500">Aditya Panday</span>
          </h1>

          <div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg  hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-50">
              <LogOut />
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );}