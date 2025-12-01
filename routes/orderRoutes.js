const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { checkout, createOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.post("/checkout", checkout);

module.exports = router;