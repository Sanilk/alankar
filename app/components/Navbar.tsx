"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/store/cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const items = useCart((state) => state.items);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Boutique
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
          <Link href="/wishlist">Wishlist</Link>
        </nav>

        {/* Cart Button */}
        <div className="hidden md:block">
          <Link href="/cart" className="relative px-4 py-2 bg-black text-white rounded-full text-sm">
            Cart

            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {items.length}
              </span>
            )}
          </Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
        >
          <span
            className={`h-0.5 w-6 bg-black transition ${open ? "rotate-45 translate-y-1.5" : ""
              }`}
          />
          <span
            className={`h-0.5 w-6 bg-black my-1 transition ${open ? "opacity-0" : ""
              }`}
          />
          <span
            className={`h-0.5 w-6 bg-black transition ${open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ${open ? "max-h-96 py-4" : "max-h-0 py-0"
          }`}
      >
        <nav className="flex flex-col items-center gap-6 text-gray-700 font-medium">
          <Link href="/" onClick={handleClose}>Home</Link>
          <Link href="/shop" onClick={handleClose}>Shop</Link>
          <Link href="/about" onClick={handleClose}>About</Link>
          <Link href="/contact" onClick={handleClose}>Contact</Link>

          <Link
            href="/cart"
            onClick={handleClose}
            className="px-6 py-2 bg-black text-white rounded-full"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}