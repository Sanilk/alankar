import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

export const metadata = {
  title: "Alankar",
  description: "E-commerce boutique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="transition-colors duration-300">

        <Providers>
          <Navbar />
          <Toaster position="top-right" />

          {children}

          <Footer />
        </Providers>

      </body>
    </html>
  );
}