import "./globals.css";
// import ThemeToggle from "@/components/ThemeToggle";

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
        {children}
      </body>
    </html>
  );
}