const mongoose = require("mongoose");
const Product = require("./models/Product.js");
const connectDB = require("./config/db.js");

require("dotenv").config();


const products = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton tee with a relaxed fit.",
    price: 499,
    category: "T-Shirts",
    imageUrl: "/images/white-tshirt.jpg",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  {
    name: "Black Oversized Hoodie",
    description: "Warm fleece hoodie with oversized style.",
    price: 1499,
    category: "Hoodies",
    imageUrl: "/images/black-hoodie.jpg",
    sizes: ["M", "L", "XL"],
    stock: 40,
  },
  {
    name: "Blue Slim Fit Jeans",
    description: "Premium denim jeans with stretch comfort.",
    price: 1999,
    category: "Jeans",
    imageUrl: "/images/blue-jeans.jpg",
    sizes: ["30", "32", "34", "36"],
    stock: 35,
  },
  {
    name: "Red Crop Top",
    description: "Trendy crop top for casual outings.",
    price: 699,
    category: "Tops",
    imageUrl: "/images/red-crop-top.jpg",
    sizes: ["XS", "S", "M"],
    stock: 25,
  },
  {
    name: "Olive Bomber Jacket",
    description: "Stylish bomber jacket for all seasons.",
    price: 2499,
    category: "Jackets",
    imageUrl: "/images/bomber-jacket.jpg",
    sizes: ["M", "L"],
    stock: 20,
  },
  {
    name: "Men’s Running Shorts",
    description: "Lightweight breathable running shorts.",
    price: 899,
    category: "Shorts",
    imageUrl: "/images/running-shorts.jpg",
    sizes: ["M", "L", "XL"],
    stock: 45,
  },
  {
    name: "Women’s Floral Dress",
    description: "Elegant floral summer dress.",
    price: 1799,
    category: "Dresses",
    imageUrl: "/images/floral-dress.jpg",
    sizes: ["S", "M", "L"],
    stock: 30,
  },
  {
    name: "Grey Sweatpants",
    description: "Ultra-soft fleece sweatpants.",
    price: 1299,
    category: "Pants",
    imageUrl: "/images/sweatpants.jpg",
    sizes: ["M", "L", "XL"],
    stock: 38,
  },
  {
    name: "Navy Polo Shirt",
    description: "Classic polo with premium fabric.",
    price: 999,
    category: "T-Shirts",
    imageUrl: "/images/navy-polo.jpg",
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    name: "Black Yoga Leggings",
    description: "High-stretch leggings for comfort.",
    price: 1199,
    category: "Activewear",
    imageUrl: "/images/yoga-leggings.jpg",
    sizes: ["S", "M", "L"],
    stock: 50,
  },
  {
    name: "Checked Casual Shirt",
    description: "Stylish casual shirt with checks.",
    price: 1399,
    category: "Shirts",
    imageUrl: "/images/checked-shirt.jpg",
    sizes: ["M", "L", "XL"],
    stock: 32,
  },
  {
    name: "Black Formal Trousers",
    description: "Slim-fit office trousers.",
    price: 1699,
    category: "Formal",
    imageUrl: "/images/formal-trousers.jpg",
    sizes: ["30", "32", "34", "36"],
    stock: 28,
  },
  {
    name: "Beige Trench Coat",
    description: "Classic long trench coat.",
    price: 2999,
    category: "Coats",
    imageUrl: "/images/trench-coat.jpg",
    sizes: ["M", "L"],
    stock: 18,
  },
  {
    name: "White Sneakers",
    description: "Minimalist unisex sneakers.",
    price: 2199,
    category: "Footwear",
    imageUrl: "/images/sneakers.jpg",
    sizes: ["7", "8", "9", "10"],
    stock: 35,
  },
  {
    name: "Denim Jacket",
    description: "Classic washed denim jacket.",
    price: 1999,
    category: "Jackets",
    imageUrl: "/images/denim-jacket.jpg",
    sizes: ["M", "L", "XL"],
    stock: 22,
  },
  {
    name: "Black Maxi Skirt",
    description: "Flowy full-length skirt.",
    price: 1299,
    category: "Skirts",
    imageUrl: "/images/maxi-skirt.jpg",
    sizes: ["S", "M", "L"],
    stock: 27,
  },
  {
    name: "Winter Wool Sweater",
    description: "Warm wool blend sweater.",
    price: 1599,
    category: "Sweaters",
    imageUrl: "/images/wool-sweater.jpg",
    sizes: ["M", "L", "XL"],
    stock: 26,
  },
  {
    name: "Casual Flip-flops",
    description: "Soft, durable beach flip-flops.",
    price: 399,
    category: "Footwear",
    imageUrl: "/images/flipflops.jpg",
    sizes: ["6", "7", "8", "9", "10"],
    stock: 50,
  },
  {
    name: "Women’s Denim Shorts",
    description: "Comfort-fit denim shorts.",
    price: 999,
    category: "Shorts",
    imageUrl: "/images/denim-shorts.jpg",
    sizes: ["S", "M", "L"],
    stock: 34,
  },
  {
    name: "Full Sleeve Henley",
    description: "Soft cotton henley for everyday wear.",
    price: 899,
    category: "T-Shirts",
    imageUrl: "/images/henley.jpg",
    sizes: ["M", "L", "XL"],
    stock: 29,
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("🌱 Product Seeding Successful!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();
