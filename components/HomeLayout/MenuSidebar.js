import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
} from "@clerk/nextjs";
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
import { Button } from "../ui/button";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: Store },
  { name: "Orders", href: "/user/orders", icon: FileText },
  { name: "Contact", href: "/contact-page", icon: BotMessageSquare },
  { name: "Profile", href: "/user/profile", icon: User },
];

const MenuSidebar = ({ setIsMenuOpen }) => {
  const pathname = usePathname();
  const { signOut, user } = useClerk();
  console.log("user", user);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50"
      onClick={() => setIsMenuOpen(false)} // Close on outer click
    >
      <div
        className="bg-white w-64 h-full  shadow-lg text-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu Content */}
        <div className="flex h-16 items-center border-b px-2 justify-between">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="default">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSwitchSessionUrl="/" />
            <Button
              variant="default"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </Button>
          </SignedIn>

          <div className="flex items-center gap-4">
            <button className="p-2" onClick={() => setIsMenuOpen(false)}>
              <X size={18} />
            </button>
          </div>
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
