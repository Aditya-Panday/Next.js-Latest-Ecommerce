import "./globals.css";
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Dotfit Store</title>
      </head>
      <body className={`antialiased`}>
        <StoreProvider>
            {children}
        </StoreProvider>
      </body>
    </html>
  );
}
