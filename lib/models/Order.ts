import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      default: "pending",
    },
    email: String,
  },
  { timestamps: true }
);

export const Order =
  models.Order || mongoose.model("Order", OrderSchema);