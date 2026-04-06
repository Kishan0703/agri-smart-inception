import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import ShopOrder from "../models/ShopOrder.js";

const router = express.Router();

router.post("/orders", protect, async (req, res) => {
  try {
    const {
      shopId,
      shopName,
      items,
      totalAmount,
      customerName,
      phone,
      deliveryAddress,
      deliveryDate,
      paymentMethod,
      notes,
    } = req.body;

    if (
      !shopId ||
      !shopName ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !totalAmount ||
      !customerName ||
      !phone ||
      !deliveryAddress ||
      !deliveryDate ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "Missing required order fields" });
    }

    if (process.env.SKIP_DB === "true") {
      return res.status(201).json({
        message: "Order received",
        orderId: `DEV-${Date.now()}`,
      });
    }

    const order = await ShopOrder.create({
      userId: req.farmer._id,
      shopId,
      shopName,
      items,
      totalAmount,
      customerName,
      phone,
      deliveryAddress,
      deliveryDate,
      paymentMethod,
      notes: notes || "",
      status: "pending",
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
    });
  } catch (error) {
    console.error("Create shop order error:", error);
    return res.status(500).json({ message: "Failed to place order" });
  }
});

router.get("/orders", protect, async (req, res) => {
  try {
    if (process.env.SKIP_DB === "true") {
      return res.json([]);
    }

    const orders = await ShopOrder.find({ userId: req.farmer._id })
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    console.error("Get shop orders error:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;
