export type User = {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "user" | "admin";

  wishlist?: string[]; // product IDs
  cart?: string[];     // product IDs

  createdAt: Date;
};