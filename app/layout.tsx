import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_contexts/cart";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PRS Food",
  description: "Clone do iFood desenvolvido a titulo de estudo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
