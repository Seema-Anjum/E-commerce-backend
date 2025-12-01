require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require("./routes/productRoutes");
const authRoutes = require('./routes/authRoutes');
const path = require("path");
const orderRoutes = require("./routes/orderRoutes.js");


const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});



// Routes 
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/orders", orderRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
