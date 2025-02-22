import "./globals.css";
import StoreProvider from "./StoreProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <StoreProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
