import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

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
        <Navbar />
        <Toaster position="top-right" />
        {children}
      <Footer />
      </body>
    </html>
  );
}