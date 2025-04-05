import {
  Home,
  ShoppingBag,
  FileText,
  User,
  X,
  Store,
  BotMessageSquare,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: Store },
  { name: "Orders", href: "/user/orders", icon: FileText },
  { name: "Contact", href: "/contact-page", icon: BotMessageSquare },
  { name: "Profile", href: "/user/profile", icon: User },
];

const MenuSidebar = ({ setIsMenuOpen }) => {
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 bg-black/70 z-50">
      <div className="bg-white w-64 h-full  shadow-lg text-black">
        {/* Menu Content */}
        <div className="flex h-16 items-center border-b px-6 justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingBag className="h-6 w-6" />
            <span>Dotfit Store</span>
          </Link>
          <button className="p-2">
            <X size={18} onClick={() => setIsMenuOpen(false)} />
          </button>
        </div>
        <nav className="space-y-1 px-2 py-5">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default MenuSidebar;
