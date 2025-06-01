// app/layout.js or app/layout.tsx

import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});
export const metadata = {
  title: "Dotfit Store",
  description: "Your fitness e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">
        <ClerkProvider>
          <StoreProvider>{children}</StoreProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
