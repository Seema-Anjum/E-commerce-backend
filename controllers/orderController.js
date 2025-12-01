const User = require("../models/User.js");
const sendEmail = require("../utils/sendEmail.js");
const Cart = require("../models/Cart.js");
const Order = require("../models/Order.js");

// --------------------------------------------------
// PLACE ORDER FROM BACKEND CART
// --------------------------------------------------
const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Total price
    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.qty * item.product.price,
      0
    );

    // Order items
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      size: item.size,
      qty: item.qty,
      price: item.product.price
    }));

    // Create order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalPrice
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Send Email
    await sendEmail({
      to: user.email,
      subject: "Order Confirmation",
      text: `Your order (${order._id}) is confirmed. Total: ₹${totalPrice}`,
      html: `
        <h2>Order Confirmed 🎉</h2>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total:</strong> ₹${totalPrice}</p>
        <p>Thanks for shopping with us.</p>
      `
    });

    res.status(201).json({
      success: true,
      message: "Order placed and email sent",
      order
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// --------------------------------------------------
// DIRECT CHECKOUT FROM FRONTEND
// (Simple email only)
// --------------------------------------------------
const checkout = async (req, res) => {
  try {
    const { user, cart } = req.body;

    await sendEmail({
      to: user.email,
      subject: "Order Confirmation",
      text: "Your order has been placed successfully.",
      html: `
        <h2>Order Confirmed 🎉</h2>
        <p>Thanks for your purchase.</p>
        <p>Total Items: ${cart.length}</p>
      `
    });

    res.json({ success: true, message: "Order placed & email sent" });
  } catch (err) {
    console.log("Checkout Error:", err.message);
    res.status(500).json({ success: false, message: "Checkout failed" });
  }
};

module.exports = { createOrder, checkout };