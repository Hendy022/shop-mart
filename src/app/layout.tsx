

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/Context/CartContext";
import Footer from "@/components/Footer/Footer";
import NextProvider from "@/components/NextProvider/NextProvider";
import { getUserToken } from "@/utilities/GetToken";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
        <NextProvider>

          <CartContextProvider  >
            <Navbar />
            <main className="container mx-auto sm:pt-18 pt-60">
              {children}
              <Toaster />
            </main>
          </CartContextProvider>

          <Footer />
        </NextProvider>
      </body>
    </html>
  );
}
