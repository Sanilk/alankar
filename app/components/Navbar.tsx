"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/app/store/cart";
import { useSession, signOut } from "next-auth/react";
import { useWishlist } from "@/app/store/wishlist";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const items = useCart((state) => state.items);
  const { data: session } = useSession();
  const { setItems } = useWishlist();

  useEffect(() => {
    async function loadWishlist() {
      try {
        const res = await fetch("/api/wishlist", {
          credentials: "include",
        });

        if (!res.ok) return;

        const text = await res.text();
        if (!text) return;

        const data = JSON.parse(text);

        setItems(data.items || []);
      } catch (err) {
        console.error("Wishlist load failed:", err);
      }
    }

    if (session) {
      loadWishlist();
    }
  }, [session, setItems]);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Boutique
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium items-center">

          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <Link href="/about" className="hover:text-black">About Us</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
          <Link href="/wishlist">Wishlist</Link>
        </nav>

        {/* CART BUTTON (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">

          {/* USER */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition overflow-hidden"
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : session?.user?.name ? (
                <span className="font-medium">
                  {session.user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={18} />
              )}
            </button>

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md z-50">
                {session ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>

                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Orders
                    </Link>

                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* CART */}
          <Link
            href="/cart"
            className="relative px-4 py-2 bg-black text-white rounded-full text-sm"
          >
            Cart

            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {items.length}
              </span>
            )}
          </Link>

        </div>

        {/* HAMBURGER */}
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

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ${open ? "max-h-96 py-4" : "max-h-0 py-0"
          }`}
      >
        <nav className="flex flex-col items-center gap-6 text-gray-700 font-medium">

          <Link href="/" onClick={handleClose}>Home</Link>
          <Link href="/shop" onClick={handleClose}>Shop</Link>
          <Link href="/about" onClick={handleClose}>About</Link>

          {/* WISHLIST */}
          <Link href="/wishlist" onClick={handleClose}>
            Wishlist
          </Link>

          <Link href="/contact" onClick={handleClose}>Contact</Link>

          {/* AUTH MOBILE */}
          {session ? (
            <>
              <p className="text-sm text-gray-500">
                Hi, {session.user?.name}
              </p>

              <Link href="/profile" onClick={handleClose}>
                Profile
              </Link>

              <button
                onClick={() => {
                  signOut();
                  handleClose();
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={handleClose}>
                Login
              </Link>

              <Link href="/register" onClick={handleClose}>
                Sign Up
              </Link>
            </>
          )}

          {/* CART */}
          <div className="flex items-center gap-4">

            {/* USER */}
            <Link
              href={session ? "/profile" : "/login"}
              className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition overflow-hidden"
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : session?.user?.name ? (
                <span className="font-medium">
                  {session.user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={18} />
              )}
            </Link>

            {/* CART */}
            <Link
              href="/cart"
              className="relative px-4 py-2 bg-black text-white rounded-full text-sm"
            >
              Cart

              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>

          </div>
        </nav>
      </div>
    </header>
  );
}