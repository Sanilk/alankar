import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">Boutique</h2>
          <p className="text-sm text-gray-400">
            Elegant fashion curated for modern lifestyles. Style that speaks for you.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/shop" className="hover:text-white">Shop</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm">support@boutique.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Boutique. All rights reserved.
      </div>
    </footer>
  );
}