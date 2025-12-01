const Product = require("../models/Product");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      size,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // 🔍 Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // 🏷 Category filter
    if (category && category !== "All") {
      query.category = category;
    }

    // 📏 Size filter
    if (size) {
      const sizes = size.split(",");
      query.sizes = { $in: sizes };
    }

    // 💰 Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 📃 Pagination
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
      products,
    });
  } catch (err) {
    console.error("getProducts error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("getProductById error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { getProducts, getProductById };
