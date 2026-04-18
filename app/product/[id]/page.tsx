// import products from "@/app/data/products.json";
// import ProductClient from "./ProductClient";

// export default async function ProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-500">
//         Product not found
//       </div>
//     );
//   }

//   return <ProductClient product={product} />;
// }

import { getDb } from "@/lib/db";
import ProductClient from "./ProductClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = await getDb();

  const rawProduct = await db.collection("products").findOne({ id });

  if (!rawProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  const product = {
    ...rawProduct,
    _id: rawProduct._id.toString(), // 👈 CRITICAL FIX
  };

  return <ProductClient product={product} />;
}