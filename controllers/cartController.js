import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// _________ Add item to cart ___________

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, qty } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, size, qty }]
      });
      return res.json(cart);
    }

    const existing = cart.items.find(
      item => item.product.toString() === productId && item.size === size
    );

    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({ product: productId, size, qty });
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

///________ Update cart item quantity _________
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, qty } = req.body;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

// _________ Remove item from cart ___________
export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item.id !== itemId);

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

// _________ Get user's cart ___________
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product", "name price imageUrl, sizes");

    res.json(cart || { user: userId, items: [] });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

