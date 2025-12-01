import express from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateCartItem);
router.delete("/remove", authMiddleware, removeCartItem);
router.get("/", authMiddleware, getCart);

export default router;
