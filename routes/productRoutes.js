const express = require("express");
const { getProducts, getProductById } = require("../controllers/productController");

const router = express.Router();

// GET /api/products - list with search, filters, pagination
router.get("/", getProducts);

// GET /api/products/:id - get single product by ID
router.get("/:id", getProductById);

module.exports = router;
