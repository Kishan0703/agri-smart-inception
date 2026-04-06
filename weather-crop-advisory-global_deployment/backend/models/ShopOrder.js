import mongoose from "mongoose";

const shopOrderItemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const shopOrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    shopId: { type: Number, required: true },
    shopName: { type: String, required: true },
    items: { type: [shopOrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "UPI", "Bank Transfer"],
      required: true,
    },
    notes: { type: String, default: "" },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "confirmed", "delivered", "cancelled"],
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "shoporders",
    versionKey: false,
  }
);

export default mongoose.model("ShopOrder", shopOrderSchema);
