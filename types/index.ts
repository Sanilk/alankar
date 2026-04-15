// Generic MongoDB type
export interface BaseDocument {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

// 🛍️ Product
export interface Product extends BaseDocument {
  name: string;
  price: number;
  description?: string;
  image?: string;
  category?: string;
  stock?: number;
}

// 🛒 Cart Item (frontend)
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 📦 Order Item
export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

// 📦 Order
export interface Order extends BaseDocument {
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
  email?: string;
}

// 🔌 API Response (optional but useful)
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}