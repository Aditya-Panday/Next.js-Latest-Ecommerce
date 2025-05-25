// app/layout.js or app/layout.tsx

import "./globals.css";
import StoreProvider from "./StoreProvider";
import {
  ClerkProvider,
} from "@clerk/nextjs";

export const metadata = {
  title: "Dotfit Store",
  description: "Your fitness e-commerce platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClerkProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
